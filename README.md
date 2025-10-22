# Quiz Application

A multilingual quiz application built with Vue 3, TypeScript, and Pinia for state management.

## Features

- 🌍 **Multi-language support** (English, French, German, Spanish)
- 📝 **Multiple question types** (single choice, multiple choice, bubble selection)
- ✅ **Form validation** with vee-validate
- 💾 **Local storage persistence** for user progress
- 📊 **CSV export** of quiz answers
- 🔄 **Progress tracking** throughout the quiz

## Tech Stack

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=for-the-badge&logo=pinia&logoColor=black) ![Vue Router](https://img.shields.io/badge/Vue_Router-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D) ![i18n](https://img.shields.io/badge/Vue_I18n-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D) ![Vee-validate](https://img.shields.io/badge/Vee--validate-00C58E?style=for-the-badge&logo=&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)

## Getting Started

- Start the development server:

npm install
 or
pnpm install

- Open your browser and navigate to http://localhost:5174:

npm run dev
 or
pnpm dev

## Supported Languages 

Languages are defined in src/types/quiz.ts:
- export type LocaleCode = 'en' | 'fr' | 'de' | 'es';

# Features Breakdown

## Question Types

- Single Choice: User selects one option
- Multiple Choice: User can select up to 3 options (configurable)
- Bubble Selection: Visual bubble interface for topic selection

## Validation

Email validation is implemented with vee-validate:
- Required field check
- Valid email format
- Maximum length (50 characters)

## Data Persistence

User progress is saved to localStorage:
- Selected language
- Email address
- Quiz answers

## CSV Export

Users can download their quiz answers as a CSV file with:
- Question order
- Question title
- Question type
- User's answers

