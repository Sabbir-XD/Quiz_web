'use client';

import { useState } from 'react';
import { useParams} from 'next/navigation';

import QuizModeSelection from './QuizModeSelection';
import InstructionPDFPage from './InstructionPDFPage';

export default function InstructionsPage() {
  const [currentStep, setCurrentStep] = useState('instructions'); // 'instructions' | 'mode-selection' | 'quiz'
  const { id } = useParams();
  // console.log('Instruction ID:', id);

  // Move to mode selection after instructions
  const handleStartQuiz = () => {
    setCurrentStep('mode-selection');
  };

  // Show mode selection screen
  if (currentStep === 'mode-selection') {
 
   return <QuizModeSelection id={id} />;
  }
   
  // Show instructions (default)
  return <InstructionPDFPage id={id} onStartQuiz={handleStartQuiz} />;
}
