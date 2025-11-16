

// export const TIMER_DURATION = 30;
// export const TOTAL_QUESTIONS = 10;


// export const ALL_QUESTIONS = [
//   { id: 1, question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4' },
//   {
//     id: 2,
//     question: 'Which planet is known as the Red Planet?',
//     options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
//     correctAnswer: 'Mars',
//     qus_time: 30,
//     explain: 'text',
//   },
//   {
//     id: 3,
//     question: 'What is the capital of France?',
//     options: ['London', 'Berlin', 'Paris', 'Madrid'],
//     correctAnswer: 'Paris',
//   },
//   {
//     id: 4,
//     question: 'Which animal is known as the King of the Jungle?',
//     options: ['Elephant', 'Lion', 'Tiger', 'Giraffe'],
//     correctAnswer: 'Lion',
//   },
//   {
//     id: 5,
//     question: 'How many days are there in a week?',
//     options: ['5', '6', '7', '8'],
//     correctAnswer: '7',
//   },
//   {
//     id: 6,
//     question: 'What is the largest ocean on Earth?',
//     options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
//     correctAnswer: 'Pacific',
//   },
//   {
//     id: 7,
//     question: 'How many continents are there?',
//     options: ['5', '6', '7', '8'],
//     correctAnswer: '7',
//   },
//   {
//     id: 8,
//     question: 'What is the smallest prime number?',
//     options: ['0', '1', '2', '3'],
//     correctAnswer: '2',
//   },
//   {
//     id: 9,
//     question: 'Which gas do plants absorb from the atmosphere?',
//     options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
//     correctAnswer: 'Carbon Dioxide',
//   },
//   {
//     id: 10,
//     question: 'What is the freezing point of water in Celsius?',
//     options: ['-10°C', '0°C', '10°C', '32°C'],
//     correctAnswer: '0°C',
//   },
//   {
//     id: 11,
//     question: 'How many sides does a hexagon have?',
//     options: ['4', '5', '6', '7'],
//     correctAnswer: '6',
//   },
//   {
//     id: 12,
//     question: 'What is the capital of Japan?',
//     options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
//     correctAnswer: 'Tokyo',
//   },
//   {
//     id: 13,
//     question: 'Which is the fastest land animal?',
//     options: ['Lion', 'Cheetah', 'Tiger', 'Leopard'],
//     correctAnswer: 'Cheetah',
//   },
//   {
//     id: 14,
//     question: 'How many colors are in a rainbow?',
//     options: ['5', '6', '7', '8'],
//     correctAnswer: '7',
//   },
//   {
//     id: 15,
//     question: 'What is the largest mammal in the world?',
//     options: ['Elephant', 'Blue Whale', 'Giraffe', 'Polar Bear'],
//     correctAnswer: 'Blue Whale',
//   },
// ];




// -------------------------------------------------------------


// src/hooks/QuizData.js

import { useEffect } from "react";

import { useEndpoints } from "src/utils/useEndpoints";

import useApi from "src/api/api";

// ==========================
//  Shuffle Function
// ==========================
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// ==========================
//  Custom Hook for All Quizzes
// ==========================
export const useAllQuizzes = () => {
  const { qus_quizzes: quizUrl } = useEndpoints();

  const {
    data: quizzes,
    error,
    isLoading,
    mutate,
  } = useApi(quizUrl, {
    fetch: true,
  });

  useEffect(() => {
    mutate(); // auto refresh on mount
  }, [mutate]);

  return {
    quizzes,
    error,
    isLoading,
    mutate,
  };
};
