const express = require("express");

const { addQuestion, searchQuestion } = require("../controllers/question");

const router = express.Router();

router.post("/question/new", addQuestion);

router.post("/search", searchQuestion);

module.exports = router;
