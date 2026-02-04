<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useQuizStore } from "../store/quiz";
import { PRE_QUIZ_STEPS, LANGUAGE_STEP_INDEX } from "../utils/constants";
import { useQuizProgress } from "../composables/useQuizProgress";
import { useLanguageStep } from "../composables/useLanguageStep";
import ScreenLayout from "../components/ScreenLayout.vue";
import ProgressBar from "../components/ProgressBar.vue";
import QuestionOption from "../components/QuestionOption.vue";
import BaseLoader from "../components/BaseLoader.vue";

const { t } = useI18n();
const quiz = useQuizStore();
const {
  languageQuestion,
  languageOptions,
  selectedLanguage,
  loadLanguageQuestion,
  selectLanguage,
  isLoading,
} = useLanguageStep();
const { progressTotal } = useQuizProgress(quiz, {
  stepsBeforeQuiz: PRE_QUIZ_STEPS,
  currentStepIndex: LANGUAGE_STEP_INDEX,
});

onMounted(loadLanguageQuestion);
</script>

<template>
  <ScreenLayout>
    <template #header>
      <ProgressBar :current="0" :total="progressTotal" rounded> </ProgressBar>
    </template>

    <BaseLoader v-if="isLoading" />

    <template v-else-if="languageQuestion">
      <h1 class="title" aria-live="polite">
        {{ t(languageQuestion.titleKey) }}
      </h1>
      <p class="subtitle" aria-live="polite">
        {{ t(languageQuestion.subtitleKey || "subtitle.language") }}
      </p>

      <QuestionOption
        type="single"
        :options="languageOptions"
        :selected-ids="selectedLanguage"
        @select="(id) => selectLanguage(id as any)"
      />
    </template>
  </ScreenLayout>
</template>

<style scoped lang="scss"></style>
