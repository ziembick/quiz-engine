"use client";

import React, { useEffect, useState } from "react";
import Quiz from "../Quiz";
import Quizzes from "../Quizzes";
import styles from './start.module.css'

export default function Start() {
  const [start, setStart] = useState(false);

  const handleStartQuiz = () => {
    setStart(true);
  };

  return (
    <div className={styles.container}>
      {!start ? (
        <div className={styles.welcome}>
          <h1>Welcome to quiz!</h1>
          <button onClick={handleStartQuiz} className={styles.btn}>Start quiz</button>
        </div>
      ) : (
        <Quizzes />
      )}
    </div>
  );
}
