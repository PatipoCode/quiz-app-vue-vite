import { defineStore } from 'pinia'
import { fetchQuestions } from '../api/questions'
import type { Question, LocaleCode } from '../types/quiz'
import { STORAGE_KEYS, LANGUAGE_QUESTION_ID } from "../utils/constants"

export const useQuizStore = defineStore('quiz', {
    state: () => ({
        language: ('en' as LocaleCode),
        questions: [] as Question[],
        current: 0,
        answers: {} as Record<number, string[]>,
        loading: false,
        error: '' as string | '',
        email: '' as string,
    }),

    getters: {
        total: state => state.questions.length,
        currentQuestion: state => state.questions[state.current] ?? null,
    },

    actions: {
        initFromStorage() {
            const savedLang = localStorage.getItem(STORAGE_KEYS.locale) as LocaleCode | null
            if (savedLang) this.language = savedLang;
            const savedEmail = localStorage.getItem(STORAGE_KEYS.email);
            if (savedEmail) this.email = savedEmail;
        },

        resetQuizData() {
            this.questions = [];
            this.answers = {};
            this.current = 0;
        },
        setLanguage(lang: LocaleCode) {
            if (this.language === lang) return
            this.language = lang;
            localStorage.setItem(STORAGE_KEYS.locale, lang);
            this.resetQuizData();
        },

        setEmail(email: string) {
            this.email = email;
            localStorage.setItem(STORAGE_KEYS.email, email);
        },

        setSingleAnswer(questionId: number, optionId: string) {
            this.answers[questionId] = [optionId];
        },

        toggleMultipleAnswer(questionId: number, optionId: string, max = 3) {
            const selectedOptions = new Set(this.answers[questionId] ?? []);

            if (selectedOptions.has(optionId)) {
                selectedOptions.delete(optionId);
            } else {
                if (selectedOptions.size >= max) {
                    this.removeOldestItem(selectedOptions);
                }
                selectedOptions.add(optionId);
            }

            this.answers[questionId] = [...selectedOptions];
        },

        removeOldestItem(selectedOptions: Set<string>) {
            const firstItem = [...selectedOptions][0];
            selectedOptions.delete(firstItem);
        },

        next() { if (this.current < this.total - 1) this.current++ },
        back() { if (this.current > 0) this.current-- },

        async loadQuestions() {
            if (this.questions.length) return;

            this.loading = true;
            this.error = '';

            try {
                const allQuestions = await fetchQuestions();
                this.questions = allQuestions.filter(question => question.id !== LANGUAGE_QUESTION_ID);
                this.current = 0;
                this.answers = {};
            } catch (error: any) {
                this.error = error?.message ?? 'Unable to load questions';
                this.questions = [];
            } finally {
                this.loading = false;
            }
        },
        retakeQuiz() {
            localStorage.removeItem(STORAGE_KEYS.locale);
            localStorage.removeItem(STORAGE_KEYS.email);
            this.language = 'en';
            this.email = '';
            this.resetQuizData();
        },
    },
})