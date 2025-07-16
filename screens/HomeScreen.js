
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { fetchQuizFromGemini } from '../utils/gemini';
import { mockQuiz } from '../utils/mockQuiz';


export default function HomeScreen({ navigation }) {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStartQuiz = async () => {
    if (!topic.trim()) {
      Alert.alert('Please enter a topic');
      return;
    }

    setLoading(true);
    const result = await fetchQuizFromGemini(topic.trim());
    setLoading(false);

    if (Array.isArray(result) && result.length > 0) {
      navigation.navigate('Quiz', { questions: result, topic });
    } else if (result === 'RATE_LIMITED') {
      Alert.alert('Too Many Requests', 'Using mock quiz instead due to API rate limits.');
      navigation.navigate('Quiz', { questions: mockQuiz, topic: 'Mock Quiz' });
    } else {
      Alert.alert('Too many requests for today.', 'Using mock quiz instead due to API rate limits.');
      navigation.navigate('Quiz', { questions: mockQuiz, topic: 'Mock Quiz' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 FlashQuiz</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter quiz topic (e.g., Space)"
        value={topic}
        onChangeText={setTopic}
      />
      <TouchableOpacity style={styles.button} onPress={handleStartQuiz}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Start Quiz</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
  style={[styles.button, { backgroundColor: '#ccc', marginTop: 10 }]}
  onPress={() => navigation.navigate('Saved')}
>
  <Text style={styles.buttonText}>📚 View Saved Quizzes</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#F4F9FF' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: '#3366FF' },
  input: { width: '100%', padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, marginBottom: 20, fontSize: 16 },
  button: { backgroundColor: '#3366FF', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '600' },
});
