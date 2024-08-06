"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./questions.module.css";

export default function Question({ question, onAnswer }) {
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(
    question.type === "multiple-choice" ? [] : null
  );

  const handleOptionChange = (e) => {
    const value = e.target.value;

    if (question.type === "multiple-choice") {
      setSelectedOption((prevSelected) =>
        prevSelected.includes(value)
          ? prevSelected.filter((option) => option !== value)
          : [...prevSelected, value]
      );
    } else {
      setSelectedOption(value);
    }
  };

  const handleSubmit = () => {
    onAnswer(selectedOption, setScore);
  };
  

  return (
    <div className={styles.parentContainer}>
      <div className={styles.mainQuiz}>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <Image
          src={question.image}
          alt={question.title}
          width={500}
          height={250}
        />
        <p className={styles.questions}>{question.question}</p>
        {question.type === "one-choice" && (
          <div>
            {question.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                />
                {option}
              </label>
            ))}
          </div>
        )}
        {question.type === "multiple-choice" && (
          <div>
            {question.options.map((option, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOption.includes(option)}
                  onChange={handleOptionChange}
                />
                {option}
              </label>
            ))}
          </div>
        )}
        {question.type === "input" && (
          <input
            type="text"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
        )}
        <button onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
}
