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

const { t } = useI18n();
const quiz = useQuizStore();
const {
  languageQuestion,
  languageOptions,
  selectedLanguage,
  loadLanguageQuestion,
  selectLanguage,
} = useLanguageStep();
const { progressTotal, progressCurrent } = useQuizProgress(quiz, {
  stepsBeforeQuiz: PRE_QUIZ_STEPS,
  currentStepIndex: LANGUAGE_STEP_INDEX,
});

onMounted(loadLanguageQuestion);
</script>

<template>
  <ScreenLayout>
    <template #header>
      <ProgressBar :current="0" :total="progressTotal" rounded>
        <template #top>
          <span class="progress-bar__current">{{ progressCurrent }}</span> /
          <span class="progress-bar__total">{{ progressTotal }}</span>
        </template>
      </ProgressBar>
    </template>

    <template v-if="languageQuestion">
      <h1 class="title">{{ t(languageQuestion.titleKey) }}</h1>
      <p class="subtitle">
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
