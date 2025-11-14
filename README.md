# Quiz Application

A multilingual quiz application built with Vue 3, TypeScript, and Pinia for state management.

## Features

- 🌍 **Multi-language support** (English, French, German, Spanish)
- 📝 **Multiple question types** (single choice, multiple choice, bubble selection)
- ✅ **Form validation** with vee-validate
- 💾 **Local storage persistence** for user progress
- 📊 **CSV export** of quiz answers
- 🔄 **Progress tracking** throughout the quiz
- 🗣️ **Accessibility compliant** (WCAG 2.1 AA standards, Lighthouse, WAVE)
- 🧪 **Comprehensive test coverage** with Vitest

## Tech Stack

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=for-the-badge&logo=pinia&logoColor=black) ![Vue Router](https://img.shields.io/badge/Vue_Router-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D) ![i18n](https://img.shields.io/badge/Vue_I18n-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D) ![Vee-validate](https://img.shields.io/badge/Vee--validate-00C58E?style=for-the-badge&logo=&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white) ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white) 

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

## Accessibility Features
This application follows WCAG 2.1 AA guidelines:
- ✅ **Semantic HTML** - Proper heading hierarchy and ARIA labels
- ✅ **Keyboard navigation** - Keyboard accessibility
- ✅ **Screen reader support** - ARIA live regions and descriptive labels
- ✅ **Color contrast**
- ✅ **Focus indicators** - Clear visual focus states
- ✅ **Form validation** - Clear error messages and instructions
  
<img width="250" height="90" alt="Lighthouse test of language screen" src="https://github.com/user-attachments/assets/baa48320-0384-437b-8eae-cd936ea839fc" />
<img width="250" height="90" alt="Lighthouse test of quiz screen" src="https://github.com/user-attachments/assets/d649c99a-dd30-4c59-91e9-c03e4a7b0f17" />
<img width="250" height="90" alt="Lighthouse test of loader screen" src="https://github.com/user-attachments/assets/bbb5a1c0-0671-49bd-9283-a844acd8fcd3" />
<img width="250" height="90" alt="Lighthouse test of email screen" src="https://github.com/user-attachments/assets/c648a0ad-eb19-44c9-99e0-6f68b22eda5a" />
<img width="250" height="90" alt="Lighthouse test of final screen" src="https://github.com/user-attachments/assets/f557c692-6227-418e-8fdd-9f3ac7c2ee61" />
