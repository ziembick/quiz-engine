'use client'
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Question from "../Questions";
import styles from './quiz.module.css';
import Start from "../Start";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showRestart, setShowRestart] = useState(false);

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

  const handleRestartQuiz = () => {
    setShowRestart(true);
  };

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  if (showRestart) {
    return <Start />;
  }

  if (!currentQuestion) {
    return (
      <div>
        <p>Quiz Completed!</p>
        <button onClick={handleRestartQuiz}>
          Restart Quiz
        </button>
      </div>
    );
  }

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
      <button onClick={handleRestartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
}
