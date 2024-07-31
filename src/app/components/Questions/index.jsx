"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Question({ question, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    onAnswer(selectedOption);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <h2>{question.title}</h2>
      <p>{question.description}</p>
      <Image src={question.image} alt={question.title} width={50} height={50} />
      <p>{question.question}</p>
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
                checked={selectedOption?.includes(option)}
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
          onChange={handleOptionChange}
        />
      )}
      <button onClick={handleSubmit}>Next</button>
    </motion.div>
  );
}
