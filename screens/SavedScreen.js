import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { getSavedQuizzes, clearSavedQuizzes } from '../utils/storage';

export default function SavedScreen({ navigation }) {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const loadQuizzes = async () => {
      const data = await getSavedQuizzes();
      setQuizzes(data.reverse()); // Show latest first
    };

    const unsubscribe = navigation.addListener('focus', loadQuizzes);
    return unsubscribe;
  }, [navigation]);

  const handleClear = () => {
    Alert.alert('Confirm', 'Delete all saved quizzes?', [
      { text: 'Cancel' },
      {
        text: 'Delete All',
        onPress: async () => {
          await clearSavedQuizzes();
          setQuizzes([]);
        },
        style: 'destructive',
      },
    ]);
  };

  const renderQuiz = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('Result', {
          questions: item.questions,
          userAnswers: item.questions.map(q => q.userAnswer),
          topic: item.topic,
        })
      }
    >
      <Text style={styles.title}>{item.topic}</Text>
      <Text style={styles.detail}>🗓 {new Date(item.date).toLocaleString()}</Text>
      <Text style={styles.detail}>🎯 Score: {item.score}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🗂 Saved Quizzes</Text>
      {quizzes.length === 0 ? (
        <Text style={styles.empty}>No saved quizzes yet.</Text>
      ) : (
        <FlatList data={quizzes} renderItem={renderQuiz} keyExtractor={(item, index) => index.toString()} />
      )}

      {quizzes.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
          <Text style={styles.clearText}>🗑 Clear All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#F7F9FB' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#3366FF', textAlign: 'center' },
  empty: { fontSize: 16, color: '#999', marginTop: 40, textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: '600', color: '#333' },
  detail: { fontSize: 14, marginTop: 4, color: '#555' },
  clearBtn: {
    marginTop: 20,
    backgroundColor: '#FF4444',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});