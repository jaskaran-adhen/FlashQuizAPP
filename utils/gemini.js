import axios from 'axios';
import { mockQuiz } from './mockQuiz';

const API_KEY = 'ArandomnqGI'; 
const MODEL_NAME = 'gemini-1.5-pro';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

export const fetchQuizFromGemini = async (topic) => {
  try {
    const prompt = `
      Generate 10 multiple-choice quiz questions on the topic "${topic}".
      Each question should be an object with:
      - "question": string
      - "options": array of 4 strings
      - "correctAnswer": string
      Return ONLY a JSON array.
    `;

    const response = await axios.post(
      URL,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const quizData = JSON.parse(rawText);

    return quizData;
  } catch (error) {
    // No console logs
    if (error?.response?.status === 429) {
      return 'RATE_LIMITED';
    }
    return null;
  }
};
