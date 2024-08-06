"use client";
import { useState, useEffect } from "react";
import Question from "../Questions";
import styles from "./quiz.module.css";
import Start from "../Start";
import Score from "../Score";

export default function Quiz({ questionIds, onRestart }) {
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
        const filteredQuestions = data.filter((question) =>
          questionIds.includes(question.id)
        );
        setQuestions(filteredQuestions);
      });
  }, [questionIds]);

  const handleAnswer = (selectedOptions) => {
    const currentQuestion = questions.find((q) => q.id === currentQuestionId);

    if (
      !selectedOptions ||
      (Array.isArray(selectedOptions) && selectedOptions.length === 0)
    ) {
      setNotification({
        show: true,
        message: "Please select an answer!",
        type: "error",
      });
      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" });
      }, 2000);
      return;
    }

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
        const nextQuestionId = currentQuestion.next || null;
        setCurrentQuestionId(nextQuestionId);
        setProgress((prev) => prev + 1);
      }, 2000);
    }
  };

  const handleRestartQuiz = () => {
    onRestart();
    setShowRestart(true);
  };

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  if (showRestart) {
    return <Start />;
  }

  if (!currentQuestion) {
    return (
      <div className={styles.parentContainer}>
        <div className={styles.completedQuiz}>
          <p className={styles.completedTitle}>Quiz Completed!</p>
          <div className={styles.score}>
            <Score score={score} />
          </div>
          <button onClick={handleRestartQuiz} className={styles.restartBtn}>
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.titlesComponent}>
      <div className={styles.scoreTitles}>
        <Score score={score} />
      </div>
      {notification.show && (
        <div
          className={
            notification.type === "success" ? styles.success : styles.error
          }
        >
          {notification.message}
        </div>
      )}
      <div className={styles.progress_bar}>
        <div style={{ width: `${(progress / questions.length) * 100}%` }} />
      </div>

      <Question
        key={currentQuestion.id}
        question={currentQuestion}
        onAnswer={handleAnswer}
      />
      <div className={styles.btnContainer}>
        <button onClick={handleRestartQuiz} className={styles.restartBtn}>
          Restart Quiz
        </button>
      </div>
    </div>
  );
}
