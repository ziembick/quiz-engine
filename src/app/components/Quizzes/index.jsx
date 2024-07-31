import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch('/quiz-metadata.json')
      .then((response) => response.json())
      .then((data) => setQuizzes(data));
  }, []);

  return (
    <div>
      <h1>Available Quizzes</h1>
      <ul>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <li key={quiz.quizId}>
              <h2>{quiz.title}</h2>
              <p>{quiz.description}</p>
              <Link href={`/quiz/${quiz.quizId}`}>
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
