'use client';
import Quiz from '@/app/components/Quiz';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './quizPage.module.css'


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
    setQuiz(null); 
    router.push('/'); 
  };


  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <h1 className={styles.quizTitle}>{quiz.title}</h1>
      <Quiz questionIds={quiz.questions} onRestart={handleRestartQuiz}/>
    </div>
  );
}
