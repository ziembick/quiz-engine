'use client';
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Question from "../Questions";
import styles from "./quiz.module.css";
import Start from "../Start";
import Score from "../Score";

export default function Quiz({ questionIds }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(questionIds[0]);
  const [progress, setProgress] = useState(0);
  const [showRestart, setShowRestart] = useState(false);
  const [score, setScore] = useState(0);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => {
        // Filter questions based on questionIds prop
        const filteredQuestions = data.filter((question) =>
          questionIds.includes(question.id)
        );
        setQuestions(filteredQuestions);
      });
  }, [questionIds]);

  const handleAnswer = (selectedOptions) => {
    const currentQuestion = questions.find((q) => q.id === currentQuestionId);
    if (currentQuestion) {
      let isCorrect = false;
      if (Array.isArray(currentQuestion.answer)) {
        isCorrect =
          selectedOptions.length === currentQuestion.answer.length &&
          selectedOptions.every((option) =>
            currentQuestion.answer.includes(option)
          );
      } else {
        isCorrect = currentQuestion.answer === selectedOptions;
      }

      const updateScore = () => {
        if (isCorrect) {
          setScore((prevScore) => prevScore + 10);
          setNotification({ show: true, message: "Correct!", type: "success" });
        } else {
          setScore((prevScore) => (prevScore > 0 ? prevScore - 5 : 0));
          setNotification({ show: true, message: "Incorrect", type: "error" });
        }
      };

      updateScore();

      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" });
      }, 2000);

      // Move to the next question
      const nextQuestionId = currentQuestion.next || null;
      setCurrentQuestionId(nextQuestionId);
      setProgress((prev) => prev + 1);
    }
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
          className={
            notification.type === "success" ? styles.success : styles.error
          }
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
      <button onClick={handleRestartQuiz}>Restart Quiz</button>
    </div>
  );
}
