require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const questionRoutes = require("./routes/question.js");

mongoose
  .connect(process.env.DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("DATABASE CONNECTED"))
  .catch((err) => {
    throw new Error(err);
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(questionRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
