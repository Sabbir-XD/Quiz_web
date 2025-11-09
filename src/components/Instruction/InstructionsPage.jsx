'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import QuizModeSelection from './QuizModeSelection';
import InstructionPDFPage from './InstructionPDFPage';

export default function InstructionsPage() {
  const [currentStep, setCurrentStep] = useState('instructions'); // 'instructions' | 'mode-selection' | 'quiz'
  const [quizMode, setQuizMode] = useState(null); // 'single' | 'all'
  const router = useRouter();
  const { id } = useParams();
  // console.log('Instruction ID:', id);

  // Move to mode selection after instructions
  const handleStartQuiz = () => {
    setCurrentStep('mode-selection');
  };

  // Handle mode selection and navigate to quiz
  const handleModeSelect = (mode) => {
    console.log('Selected mode:', mode);
    setQuizMode(mode);
  };

  // Show mode selection screen
  if (currentStep === 'mode-selection') {
    return <QuizModeSelection onModeSelect={handleModeSelect} />;
  }

  // Show instructions (default)
  return <InstructionPDFPage id={id} onStartQuiz={handleStartQuiz} />;
}
