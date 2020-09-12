import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { API } from "../../backend";
import ShowQuestion from "./ShowQuestion";

const Search = () => {
  const [state, setState] = useState({
    search: "",
    questions: null,
    loading: true,
    error: false,
  });

  const removeDuplicateValues = (value) => {
    const set = new Set();
    let arr = value.split(/[ ,]+/);
    arr.map((el) => set.add(el));
    arr = [];
    set.forEach((el) => arr.push(el));
    return arr.join(",");
  };

  const preload = (value) => {
    let queries = "";
    if (value) {
      queries = removeDuplicateValues(value);
    }

    const url = value ? `${API}/search?search=${queries}` : `${API}/search`;

    fetch(`${url}`, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.err) {
            console.log("res.arr", res.err);
            setState({ ...state, error: res.err, loading: false });
          } else {
            res.sort((a, b) => b.weight - a.weight);
            setState({
              ...state,
              questions: res,
              error: false,
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

  const load = (e) => {
    e.preventDefault();
    setState({ ...state, error: false, loading: true });
    preload(state.search);
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div>
      {state.loading ? <p>loading...</p> : ""}
      {state.error ? (
        <p style={{ color: "red" }}>{JSON.stringify(state.error)}</p>
      ) : (
        ""
      )}
      <Link to="/add">
        <button style={{ margin: "16px" }}>Add a new Question</button>
      </Link>
      <form>
        <input
          type="text"
          placeholder="Search"
          value={state.search}
          onChange={(event) =>
            setState({ ...state, search: event.target.value })
          }
        />
        <button onClick={(e) => load(e)}>Search</button>
      </form>
      <h1>Search page</h1>
      {state.questions
        ? state.questions.length > 0
          ? state.questions.map((question) => (
              <ShowQuestion key={question.Question._id} info={question} />
            ))
          : "No Questions Found"
        : ""}
    </div>
  );
};

export default Search;
