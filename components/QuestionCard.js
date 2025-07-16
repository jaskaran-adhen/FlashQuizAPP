import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function QuestionCard({ questionData, selectedOption, onSelectOption }) {
  return (
    <Animatable.View animation="fadeInUp" duration={600} style={styles.card}>
      <Text style={styles.question}>{questionData.question}</Text>

      {questionData.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selectedOption === option && styles.selectedOption,
          ]}
          onPress={() => onSelectOption(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  option: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  selectedOption: {
    backgroundColor: '#3366FF',
  },
  optionText: {
    color: '#333',
    fontSize: 16,
  },
});
