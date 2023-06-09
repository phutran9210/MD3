var express = require("express");
var router = express.Router();
var db = require("./mySQL");
const util = require("util");
const bcrypt = require("bcrypt");
var dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const saltRounds = 10;
dotenv.config();

db.query = util.promisify(db.query);

router.get("/", (req, res, next) => {
  const sql = `
  SELECT u.*, 
  CASE
    WHEN EXISTS (SELECT * FROM user_role ur_admin WHERE ur_admin.user_id = u.user_id AND ur_admin.role_id = 1) THEN 'admin'
    WHEN EXISTS (SELECT * FROM user_role ur_mod WHERE ur_mod.user_id = u.user_id AND ur_mod.role_id = 3) THEN 'mod'
    WHEN EXISTS (SELECT * FROM user_role ur_role3 WHERE ur_role3.user_id = u.user_id AND ur_role3.role_id = 2) THEN 'user'
    ELSE 'unknown'
  END AS role_name
FROM users u;

  `;
  db.query(sql, function (err, rows, fields) {
    if (err) {
      res.status(500).json({
        "status code": 500,
        "status messenger": err.message,
      });
    } else {
      res.json(rows);
    }
  });
});

router.post("/register", async function (req, res, next) {
  const { email, password, name, phone, gender, userName, address } = req.body;
  console.log(req.body);
  let user;

  try {
    const result = await db.query(
      "SELECT * FROM stackoverflow.users WHERE username = ? OR email = ?",
      [userName, email]
    );

    // console.log("result là : ", result);

    if (result.length > 0) {
      const existingUser = result[0];
      // console.log(existingUser.username);
      // console.log(userName);
      if (existingUser.username === userName) {
        return res.status(409).send("Username is already taken");
      } else if (existingUser.email === email) {
        return res.status(409).send("Email is already taken");
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Database query error");
  }

  let hash;
  try {
    hash = await bcrypt.hash(password, saltRounds);
    // console.log(hash);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Password hashing error");
  }

  const createTime = new Date();

  const newUserID = uuidv4();
  try {
    await db.query(
      "INSERT INTO Users (user_id, username, email, user_password, phone, gender, address, name_user, create_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        newUserID,
        userName,
        email,
        hash,
        phone,
        gender,
        address,
        name,
        createTime,
      ]
    );
    await db.query("INSERT INTO user_role (user_id, role_id) VALUES (?, ?)", [
      newUserID,
      2,
    ]);
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Database insertion error");
  }
});

router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  let user;

  try {
    const result = await db.query(
      "SELECT * FROM stackoverflow.users WHERE username = ?",
      [username, password]
    );
    // console.log(result);
    [user] = result;
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Something went wrong. Please try again later.");
  }

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  // console.log(password);
  // console.log(user);
  // console.log(user.password);
  try {
    const match = await bcrypt.compare(password, user.user_password);
    if (match) {
      const accessToken = jwt.sign(
        { username: username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      return res
        .status(200)
        .json({ message: "Login successful", userID: user.user_id });
    }
    return res.status(401).send("Invalid email or password");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Something went wrong. Please try again later.");
  }
});

router.post("/ban", (req, res) => {
  const { userId, banType, banDays } = req.body;

  let bannedValue = 0;
  let banUltilValue = null;

  if (banType === "temporary") {
    bannedValue = 1;
    banUltilValue = `DATE_ADD(NOW(), INTERVAL ${banDays} DAY)`;
  } else if (banType === "permanent") {
    bannedValue = 2;
    banUltilValue = "NULL";
  }

  const sql = `
    UPDATE users
    SET banned = ?, ban_ultil = ${banUltilValue}
    WHERE user_id = ?
  `;

  db.query(sql, [bannedValue, userId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Ban successful" });
    }
  });
});

router.post("/unban", (req, res) => {
  const { selectedUserId } = req.body;

  const sql = `
  UPDATE users
  SET banned = 0, ban_ultil = NULL
  WHERE user_id = ?
    AND (banned = 1 OR banned = 2)
`;

  db.query(sql, [selectedUserId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Unban successful" });
    }
  });
});

router.post("/updaterole", async function (req, res) {
  const { userId, selectedRole } = req.body;
  console.log(selectedRole);
  console.log(userId);
  try {
    switch (selectedRole) {
      case "user":
        const updateUserQuery = `DELETE FROM user_role
      WHERE user_id = ? AND role_id NOT IN (2);
      `;
        await db.query(updateUserQuery, [userId]);
        res.status(200).json({ message: "Role updated successfully" });
        break;
      case "mod":
        const updateModQuery = `DELETE FROM user_role
          WHERE user_id = ? AND role_id = 1;
          `;
        await db.query(updateModQuery, [userId]);
        res.status(200).json({ message: "Role updated successfully" });
        break;
      case "admin":
        const insertQuery = `INSERT IGNORE INTO user_role (user_id, role_id)
        VALUES (?, 1);
      `;
        await db.query(insertQuery, [userId]);
        res.status(200).json({ message: "Role updated successfully" });
        break;
      default:
        break;
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi trong quá trình cập nhật vai trò:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

router.post("/:id", async function (req, res) {
  const { id } = req.params;
  const { email, user_password, name_user, phone, gender, username, address } =
    req.body;
  console.log("pass ???", req.body);
  if (user_password) {
    try {
      const hashedPassword = await bcrypt.hash(user_password, saltRounds);
      console.log("????", hashedPassword);
      const sql = `UPDATE stackoverflow.users
      SET email = ?, user_password = ?, name_user = ?, phone = ?, gender = ?, username = ?, address = ?
      WHERE user_id = ?`;

      db.query(
        sql,
        [
          email,
          hashedPassword,
          name_user,
          phone,
          gender,
          username,
          address,
          id,
        ],
        function (error, results) {
          if (error) {
            console.error(
              "Đã xảy ra lỗi trong quá trình cập nhật dữ liệu:",
              error
            );
            res.status(500).json({ error: "Lỗi server" });
          } else {
            console.log("Dữ liệu người dùng đã được cập nhật thành công.");
            res.status(200).json({ message: "Update successful" });
          }
        }
      );
    } catch (error) {
      console.error("Đã xảy ra lỗi trong quá trình cập nhật mật khẩu:", error);
    }
  } else {
    try {
      const sql = `UPDATE stackoverflow.users
      SET email = ?, name_user = ?, phone = ?, gender = ?, username = ?, address = ?
      WHERE user_id = ?`;
      console.log("no pss");
      db.query(
        sql,
        [email, name_user, phone, gender, username, address, id],
        function (error, results) {
          if (error) {
            console.error(
              "Đã xảy ra lỗi trong quá trình cập nhật dữ liệu:",
              error
            );
            res.status(500).json({ error: "Lỗi server" });
          } else {
            console.log("Dữ liệu người dùng đã được cập nhật thành công.");
            res.status(200).json({ message: "Update successful" });
          }
        }
      );
    } catch (error) {
      console.error("Đã xảy ra lỗi trong quá trình cập nhật mật khẩu:", error);
    }
  }
});

router.get("/:question_id", async function (req, res) {
  console.log(req.params);
});

router.post("/refresh-token", (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeft = user.exp - currentTime;

    if (timeLeft < 600) {
      const newToken = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res.cookie("token", newToken);
      res.json({ newToken });
    } else {
      res.json({ newToken: null });
    }
  });
});
module.exports = router;
