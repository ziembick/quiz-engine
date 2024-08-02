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
      <motion.h1
      initial={{ opacity: 0, y: -100, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -100, filter: "blur(10px)" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30,
        delay: 0.2,
      }}
      >Available Quizzes</motion.h1>
      <ul className={styles.available}>
        {quizzes.length > 0 ? (
          quizzes.map((quiz, i) => (
            <motion.li
              key={quiz.quizId}
              className={styles.eachAvailable}
              initial={{ opacity: 0, x: -400, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -400, filter: "blur(10px)" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: i * 0.2,
              }}
            >
              <h2>{quiz.title}</h2>
              <p>{quiz.description}</p>
              <Link
                href={`/quiz/${quiz.quizId}`}
                className={styles.btnAvailable}
              >
                Start Quiz
              </Link>
            </motion.li>
          ))
        ) : (
          <p>No quizzes available</p>
        )}
      </ul>
    </div>
  );
}
