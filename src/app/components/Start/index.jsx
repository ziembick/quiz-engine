"use client";

import React, { useEffect, useState } from "react";
import Quiz from "../Quiz";
import Quizzes from "../Quizzes";

export default function Start() {
  const [start, setStart] = useState(false);

  const handleStartQuiz = () => {
    setStart(true);
  };

  return (
    <div>
      {!start ? (
        <div>
          <h1>Welcome to quiz</h1>
          <button onClick={handleStartQuiz}>Start quiz</button>
        </div>
      ) : (
        <Quizzes />
        // <Quiz />
      )}
    </div>
  );
}
