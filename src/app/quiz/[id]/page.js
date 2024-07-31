'use client';
import Quiz from '@/app/components/Quiz';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


export default function QuizPage() {
  const { id } = useParams();
  const router = useRouter();
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

  const handleRestartQuiz = () => {
    setQuiz(null); // Reset the quiz state
    router.push('/'); // Navigate back to the main page
  };


  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      <Quiz questionIds={quiz.questions} onRestart={handleRestartQuiz}/>
    </div>
  );
}
