'use client';

import { useParams } from 'next/navigation';

import QuizForm from 'src/layouts/dashboard/home/quizzes/quizFrom';

// -----------------------------------------------------------------

export default function EditQuizPage() {
    const { id } = useParams();
    return <QuizForm editId={id} />;
}
