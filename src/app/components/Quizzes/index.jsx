import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./quizzes.module.css";
import { motion } from "framer-motion";

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch("/quiz-metadata.json")
      .then((response) => response.json())
      .then((data) => setQuizzes(data));
  }, []);

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.h1}>Available Quizzes</h1>
      <ul className={styles.available}>
        {quizzes.length > 0 ? (
          quizzes.map((quiz, i) => (
            <li key={quiz.quizId} className={styles.eachAvailable}>
              <h2>{quiz.title}</h2>
              <p>{quiz.description}</p>
              <Link
                href={`/quiz/${quiz.quizId}`}
                className={styles.btnAvailable}
              >
                Start Quiz
              </Link>
            </li>
          ))
        ) : (
          <p>No quizzes available</p>
        )}
      </ul>
    </div>
  );
}
