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

router.post("/:question_id", async function (req, res) {
  const { userID, content, question_id } = req.body;

  const sql = `INSERT INTO answers (body,parent_question_id,author_id) VALUE (?,?,?) `;

  try {
    await db.query(sql, [content, question_id, userID]);
    res.status(201).send("Thêm answer thành công");
  } catch (error) {
    console.log(error);
    res.status(500).send("Database insertion error");
  }
});

router.post(
  "/:question_id/answers/:answer_id/comments",
  async function (req, res) {
    const latestComment = req.body.comment.latestComment;
    const userID = req.body.comment.userID;
    const { question_id, answer_id } = req.params;
    console.log(latestComment);
    const sql = `INSERT INTO comments (question_id,answer_id,author_id,body) VALUE (?,?,?,?) `;
    try {
      await db.query(sql, [question_id, answer_id, userID, latestComment]);
      res.status(201).send("Thêm cmt thành công");
    } catch (error) {
      console.log(error);
      res.status(500).send("Database insertion error");
    }
  }
);

router.get("/:question_id/answers", async function (req, res) {
  const { question_id } = req.params;
  console.log(question_id);
  const sql = `
  SELECT
  answers.answer_id,
  answers.body AS answer_body,
  answer_author.username AS answer_author_username,
  GROUP_CONCAT(comment_author.username) AS comment_author_usernames,
  GROUP_CONCAT(comments.body) AS comment_bodies
FROM
  answers
LEFT JOIN
  comments
ON
  answers.answer_id = comments.answer_id
LEFT JOIN
  users AS answer_author
ON
  answers.author_id = answer_author.user_id
LEFT JOIN
  users AS comment_author
ON
  comments.author_id = comment_author.user_id
WHERE
  answers.parent_question_id = ?
GROUP BY
  answers.answer_id
ORDER BY
  answers.answer_id;

  `;
  let data;
  try {
    const result = await db.query(sql, [question_id]);
    console.log(result);

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Database insertion error");
  }
});

module.exports = router;
