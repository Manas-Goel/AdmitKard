import React from "react";

import styles from "./ShowQuestion.module.css";

const ShowQuestion = ({ info }) => {
  const { Question, matchingKeywords } = info;
  return (
    <div className={styles.Question}>
      <p className={styles.Main}>{Question.question}</p>

      {matchingKeywords ? (
        <p>
          Matching Keywords:
          {matchingKeywords.map((tag) => {
            return (
              <span key={tag} className={styles.match}>
                {tag}
              </span>
            );
          })}
        </p>
      ) : (
        <p>
          Tags:
          {Question.tags.map((tag) => {
            return (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            );
          })}
        </p>
      )}
    </div>
  );
};

export default ShowQuestion;
