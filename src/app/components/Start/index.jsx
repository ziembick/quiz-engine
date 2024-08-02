"use client";

import React, { useState } from "react";
import Quizzes from "../Quizzes";
import styles from './start.module.css';

export default function Start() {
  const [start, setStart] = useState(false);

  const handleStartQuiz = () => {
    setStart(true);
  };

  return (
    <div className={styles.container}>
      {!start ? (
        <div className={styles.welcome}>
          <h1 className={styles.quizTitle}>Welcome to the Quiz!</h1>
          <div className={styles.btnContainer}>
            <button onClick={handleStartQuiz} className={styles.btn}>
              Start Quiz
            </button>
          </div>
        </div>
      ) : (
        <Quizzes />
      )}
    </div>
  );
}
