import React from "react";
import styles from './score.module.css'

export default function Score({ score }) {
  return (
    <div className={styles.scoreContainer}>
      <h1 className={styles.scoreTitle}>Score: {score}</h1>
    </div>
  );
}
