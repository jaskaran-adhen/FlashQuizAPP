import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import QuestionCard from '../components/QuestionCard';

export default function QuizScreen({ route, navigation }) {
  const { questions, topic } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));

  const handleOptionSelect = (option) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = option;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (!userAnswers[currentIndex]) {
      Alert.alert('Please select an option');
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Result', {
        questions,
        userAnswers,
        topic,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.quizBox}>
        <Text style={styles.counter}>Question {currentIndex + 1} / {questions.length}</Text>
        <QuestionCard
          questionData={questions[currentIndex]}
          selectedOption={userAnswers[currentIndex]}
          onSelectOption={handleOptionSelect}
        />
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>
            {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    padding: 20,
  },
  quizBox: {
    width: '100%',
    maxWidth: 400,
  },
  counter: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#3366FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
