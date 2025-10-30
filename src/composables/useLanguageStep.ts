import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { fetchQuestions, answerKeyToLocale } from '../api/questions';
import { LANGUAGE_QUESTION_ID } from '../utils/constants';
import { useQuizStore } from '../store/quiz';
import { findLanguageQuestion, createLanguageOptions } from '../utils/quiz';
import type { Question, LocaleCode } from '../types/quiz';

export function useLanguageStep() {
  const quiz = useQuizStore();
  const router = useRouter();
  const { locale } = useI18n({ useScope: 'global' });

  const languageQuestion = ref<Question | null>(null);

  const loadLanguageQuestion = async () => {
    const allQuestions = await fetchQuestions();
    languageQuestion.value = findLanguageQuestion(allQuestions, LANGUAGE_QUESTION_ID);
    quiz.loadQuestions();
  };

  const languageOptions = computed(() =>
    createLanguageOptions(languageQuestion.value, answerKeyToLocale)
  );

  const selectedLanguage = computed(() => [quiz.language]);

  const selectLanguage = (code: LocaleCode) => {
    quiz.setLanguage(code);
    locale.value = code;
    router.push('/quiz');
  };

  return {
    languageQuestion,
    languageOptions,
    selectedLanguage,
    loadLanguageQuestion,
    selectLanguage,
  };
}
