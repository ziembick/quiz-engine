'use client';
import Quiz from '@/app/components/Quiz';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';


export default function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    if (id) {
      fetch('/quiz-metadata.json')
        .then((response) => response.json())
        .then((data) => {
          const selectedQuiz = data.find((quiz) => quiz.quizId === parseInt(id));
          setQuiz(selectedQuiz);
        });
    }
  }, [id]);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      <Quiz questionIds={quiz.questions} />
    </div>
  );
}
