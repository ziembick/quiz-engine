"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Question from "../Questions";
import styles from './quiz.module.css'

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleAnswer = (answer) => {
    const currentQuestion = questions.find((q) => q.id === currentQuestionId);
    // Process the answer and update the state as needed
    setCurrentQuestionId(currentQuestion.next);
    setProgress((prev) => prev + 1);
  };

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  if (!currentQuestion) return <p>Quiz Completed!</p>;

  return (
    <div>
      <div className={styles.progress_bar}>
        <div style={{ width: `${(progress / questions.length) * 100}%` }} />
      </div>
      <AnimatePresence>
        <Question
          key={currentQuestion.id}
          question={currentQuestion}
          onAnswer={handleAnswer}
        />
      </AnimatePresence>
    </div>
  );
}
