var express = require("express");
var router = express.Router();
var db = require("./mySQL");
const util = require("util");
const bcrypt = require("bcrypt");
var dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const noCache = require("../middleware/noCache");
const saltRounds = 10;
dotenv.config();

db.query = util.promisify(db.query);

router.get("/", async function (req, res) {
  const sql = `
  SELECT questions.question_id, questions.title,questions.author_id, questions.view_count, GROUP_CONCAT(tags.name_tag) AS tag_name
  FROM questions
  LEFT JOIN question_tag ON questions.question_id = question_tag.question_id
  LEFT JOIN tags ON question_tag.tag_id = tags.tag_id
  GROUP BY questions.question_id, questions.title


  `;
  db.query(sql, function (err, rows, fields) {
    if (err) {
      res.status(500).json({
        "status code": 500,
        "status messenger": err.message,
      });
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

router.get("/:question_id", noCache, async function (req, res) {
  const questionID = req.params.question_id;
  let post;
  const sql = `
  SELECT questions.*, GROUP_CONCAT(tags.name_tag) AS tag_name
      FROM questions
      LEFT JOIN question_tag ON questions.question_id = question_tag.question_id
      LEFT JOIN tags ON question_tag.tag_id = tags.tag_id
      WHERE questions.question_id = ?
      GROUP BY questions.question_id, questions.title
  `;
  try {
    const result = await db.query(sql, [questionID]);

    if (result.length === 0) {
      return res.status(404).send("Question not found");
    } else {
      [post] = result;
      return res.status(200).json(post);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Something went wrong. Please try again later.");
  }
});

router.post("/", async function (req, res) {
  const { tags, content, title, userID } = req.body;
  const questionID = uuidv4();

  try {
    await db.query(
      "INSERT INTO questions (question_id, title, body, author_id) VALUES (?,?,?,?)",
      [questionID, title, content, userID]
    );
    for (const tagId of tags) {
      await db.query(
        "INSERT INTO question_tag (question_id,tag_id) VALUES (?,?)",
        [questionID, tagId]
      );
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
module.exports = router;
