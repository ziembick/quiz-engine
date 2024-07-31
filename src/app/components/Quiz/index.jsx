"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Question from "../Questions";
import styles from "./quiz.module.css";
import Start from "../Start";
import Score from "../Score";
import { motion } from 'framer-motion'

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showRestart, setShowRestart] = useState(false);
  const [score, setScore] = useState(0);
  const [notification, setNotification] = useState({ show: false, message: '', type: ''})

  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleAnswer = (answer) => {
    const currentQuestion = questions.find((q) => q.id === currentQuestionId);
    if (currentQuestion) {
      // Check if the answer is correct
      const isCorrect = Array.isArray(currentQuestion.answer)
        ? currentQuestion.answer.includes(answer)
        : currentQuestion.answer === answer;

      // Update the score
      if (isCorrect) {
        setScore((prevScore) => prevScore + 10);
        setNotification({show: true, message: 'Correct!', type: 'success'})
      } else {
        setScore((prevScore) => prevScore - 5);
        setNotification({show: true, message: "Incorrect", type: 'error'})
      }

      setTimeout(() => {
        setNotification({show: true, message: '', type: ''})
      }, 2000)

      // Move to the next question
      setCurrentQuestionId(currentQuestion.next);
      setProgress((prev) => prev + 1);
    }

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
        <Score score={score} />
        <button onClick={handleRestartQuiz}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div>
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={notification.type === 'success' ? styles.success : styles.error}
        >
          {notification.message}
        </motion.div>
      )}
      <Score score={score} />
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
