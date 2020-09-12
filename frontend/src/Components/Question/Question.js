import React, { useState } from "react";
import { Link } from "react-router-dom";

import { API } from "../../backend";

const Question = () => {
  const [state, setState] = useState({
    question: "",
    topic: "",
    tags: "",
    error: false,
    loading: false,
    success: "",
  });

  const removeDuplicateValues = (tags) => {
    const set = new Set();
    let arr = tags.split(/[ ,]+/);
    arr.map((el) => set.add(el));
    arr = [];
    set.forEach((el) => arr.push(el));
    return arr;
  };

  const load = (data) => {
    fetch(`${API}/question/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.err) {
            console.log("res.arr", res.err);
            setState({ ...state, error: res.err, success: "", loading: false });
          } else {
            setState({
              ...state,
              question: "",
              topic: "",
              tags: "",
              error: false,
              success: "Question added successfully",
              loading: false,
            });
          }
        });
      })
      .catch((err) => {
        setState({ ...state, loading: false, error: err });
        console.log("Inside catch", err);
      });
  };

  const submit = (e) => {
    e.preventDefault();
    let { question, topic, tags } = state;
    question = question.trim();
    topic = topic.trim();
    tags = tags.trim();
    if (!question || !topic || !tags)
      setState({ ...state, error: "All fields are required" });
    else {
      tags = removeDuplicateValues(tags);
      load({ question, topic, tags });
    }
  };

  return (
    <div>
      <Link to="/">
        <button style={{ margin: "16px" }}>Search Question</button>
      </Link>
      {state.loading ? <p>loading...</p> : ""}
      {state.error ? (
        <p style={{ color: "red" }}>{JSON.stringify(state.error)}</p>
      ) : (
        ""
      )}
      {state.success ? <p style={{ color: "green" }}>{state.success}</p> : ""}
      <h1>Add Question</h1>
      <form>
        Question :{" "}
        <textarea
          style={{ margin: "16px" }}
          rows="5"
          cols="50"
          placeholder="Question"
          value={state.question}
          onChange={(e) =>
            setState({ ...state, question: e.target.value, error: false })
          }
        />
        <br />
        Topic:
        <input
          type="text"
          style={{ margin: "16px" }}
          placeholder="topic"
          value={state.topic}
          onChange={(e) =>
            setState({ ...state, topic: e.target.value, error: false })
          }
        />
        <br />
        Tags:
        <input
          type="text"
          style={{ margin: "16px" }}
          placeholder="Space separated tags"
          value={state.tags}
          onChange={(e) =>
            setState({ ...state, tags: e.target.value, error: false })
          }
        />
        <br />
        <button onClick={(e) => submit(e)}>Submit</button>
      </form>
    </div>
  );
};

export default Question;
