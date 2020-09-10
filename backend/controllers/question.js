const Question = require("../models/question");

exports.addQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.json({ message: "Question added successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.searchQuestion = async (req, res) => {
  try {
    const questions = await Question.find();
    var queries = {};
    if (req.query.search) {
      req.query.search.split(",").forEach((qr) => (queries[qr] = 1));
    } else {
      return res.json(questions);
    }

    const response = [];

    questions.forEach((ques) => {
      const { question, tags } = ques;
      const matchingKeywords = [];
      var weight = 0;
      tags.forEach((tag) => {
        if (tag in queries) {
          queries[tag] = undefined;
          weight += 1000;
          matchingKeywords.push(tag);
        }
      });
      for (const query in queries) {
        if (!queries[query]) continue;
        if (question.indexOf(query) > 0) {
          matchingKeywords.push(query);
          weight += 1;
        }
      }

      if (weight > 0)
        response.push({ Question: ques, weight, matchingKeywords });
    });

    return res.json(response);
  } catch (err) {
    return res.status(400).json(err);
  }
};
