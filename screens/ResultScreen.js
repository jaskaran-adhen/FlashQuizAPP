import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { saveQuizToStorage } from '../utils/storage';

export default function ResultScreen({ route, navigation }) {
  const { questions, userAnswers, topic } = route.params;
  const [score, setScore] = useState(0);

  useEffect(() => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (q.correctAnswer === userAnswers[i]) {
        correct++;
      }
    });
    setScore(correct);
  }, []);

  const handleSaveQuiz = async () => {
    const quizData = {
      topic,
      date: new Date().toISOString(),
      score: `${score}/${questions.length}`,
      questions: questions.map((q, i) => ({
        ...q,
        userAnswer: userAnswers[i],
      })),
    };

    await saveQuizToStorage(quizData);
    Alert.alert('Quiz Saved!');
    navigation.navigate('Saved');
  };

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.score}>
        🎉 You got {score} out of {questions.length} correct!
      </Animatable.Text>

      <FlatList
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const isCorrect = item.correctAnswer === userAnswers[index];
          return (
            <View style={styles.card}>
              <Text style={styles.qText}>{index + 1}. {item.question}</Text>
              <Text style={isCorrect ? styles.correct : styles.incorrect}>
                Your Answer: {userAnswers[index]}
              </Text>
              {!isCorrect && (
                <Text style={styles.correct}>
                  Correct Answer: {item.correctAnswer}
                </Text>
              )}
            </View>
          );
        }}
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveQuiz}>
        <Text style={styles.buttonText}>💾 Save Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#F5F9FF' },
  score: { fontSize: 24, fontWeight: 'bold', marginVertical: 20, textAlign: 'center', color: '#3366FF' },
  card: { backgroundColor: '#fff', padding: 15, marginVertical: 8, borderRadius: 10, elevation: 2 },
  qText: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  correct: { color: 'green', fontSize: 15, marginTop: 4 },
  incorrect: { color: 'red', fontSize: 15, marginTop: 4 },
  button: {
    backgroundColor: '#3366FF',
    padding: 15,
    marginVertical: 20,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
