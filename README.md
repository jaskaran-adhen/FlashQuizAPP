# 📱 FlashQuiz - AI-Powered Flashcard Quiz App Using Gemini

**FlashQuiz** is a modern React Native app that dynamically generates flashcard quizzes based on any topic you provide. Powered by **Google's Gemini API**, it delivers personalized multiple-choice quizzes in real-time. Even when the API limit is reached, the app falls back to a mock quiz — ensuring a smooth and uninterrupted experience.

---

## ✨ Features

- 🔍 **Topic-Based Quiz Generation**  
  Enter any topic (e.g., "Java", "React Native", "World War II") and get a custom 10-question quiz using Gemini AI.

- ⚠️ **Smart Fallback (Mock Quiz)**  
  If the Gemini API fails (e.g., `429 Too Many Requests`), FlashQuiz switches to a built-in mock quiz and notifies the user via popup.

- ✅ **Interactive Quiz Flow**  
  - Multiple-choice format  
  - One question per screen  
  - Answer validation before proceeding  
  - Final results screen with answer review

- 📂 **Quiz History Storage**  
  All completed quizzes are stored using **AsyncStorage**, allowing users to revisit past quizzes anytime — even after closing the app.

- 🎨 **Modern, Animated UI**  
  Clean layout, gradient header, centered question cards, and subtle animations for a smooth experience.

---

## 📸 Video 
[![App Working Demo](https://img.youtube.com/vi/t0iPk_ARRe0/hqdefault.jpg)](https://youtube.com/shorts/t0iPk_ARRe0?feature=share)

---

## 🛠️ Tech Stack

| Tech              | Purpose                            |
|-------------------|-------------------------------------|
| React Native (Expo) | Mobile UI & logic                 |
| AsyncStorage       | Persistent local storage           |
| Axios              | API requests                       |
| Google Gemini API  | AI-generated quiz content          |
| React Navigation   | Screen navigation                  |
| Postman            | API testing                        |

---

## 🧪 How It Works

1. **User enters a topic**
2. App sends a request to Gemini API to generate a quiz
3. If API succeeds → quiz is displayed  
   If API fails (like 429 error) → mock quiz is loaded with popup
4. User answers questions one by one
5. Result screen shows correct answers and score
6. Quiz is saved to history via AsyncStorage

---

## 🔧 Installation & Setup

1. **Clone the repo:**
   ```bash
   git clone  https://github.com/jaskaran-adhen/FlashQuizAPP.git
   cd flashquiz-app
