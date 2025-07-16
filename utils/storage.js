import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'QUIZ_HISTORY';

export const saveQuizToStorage = async (newQuiz) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = existing ? JSON.parse(existing) : [];
    parsed.push(newQuiz);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch (err) {
    console.error('❌ Error saving quiz:', err);
  }
};

export const getSavedQuizzes = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('❌ Error reading saved quizzes:', err);
    return [];
  }
};

export const clearSavedQuizzes = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('❌ Error clearing quizzes:', err);
  }
};
