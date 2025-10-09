<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuizStore } from "../store/quiz";
import { useI18n } from "vue-i18n";
import type { ApiType, Type, Option, Question } from "../types/quiz";
import {
  normalizeType,
  getOptions,
  isGenderQuestion,
  isTopicsQuestion,
  variantForQuestion,
  genderImgFor,
  topicImgFor,
} from "../utils/quiz";
import ScreenLayout from "../components/ScreenLayout.vue";
import ProgressBar from "../components/ProgressBar.vue";
import Button from "../components/Button.vue";
import QuestionOption from "../components/QuestionOption.vue";
import backIcon from "../assets/icons/back-icon.png";

const router = useRouter();
const quiz = useQuizStore();
const { t } = useI18n();
const currentQuestion = computed<Question | null>(() => quiz.currentQuestion);
const overallCurrentIndex = computed(() => quiz.current + 1);
const overallTotal = computed(() => quiz.total + 1);

const typeForComp = computed<Type>(() =>
  normalizeType(currentQuestion.value?.type as ApiType)
);

const optionsForComp = computed<Option[]>(() =>
  getOptions(currentQuestion.value)
);

const selectedIds = computed(() =>
  currentQuestion.value ? quiz.answers[currentQuestion.value.id] ?? [] : []
);

const isAnswered = computed(
  () =>
    !!(currentQuestion.value && quiz.answers[currentQuestion.value.id]?.length)
);

const isGender = computed(() => isGenderQuestion(currentQuestion.value));
const isTopics = computed(() => isTopicsQuestion(currentQuestion.value));
const variant = computed(() => variantForQuestion(currentQuestion.value));

const onSelect = (optId: string) => {
  if (!currentQuestion.value) return;
  if (typeForComp.value === "single") {
    quiz.setSingleAnswer(currentQuestion.value.id, optId);
  } else {
    quiz.toggleMultipleAnswer(currentQuestion.value.id, optId, 3);
  }
};

const onBack = () => {
  if (quiz.current === 0) return router.replace("/");
  quiz.back();
};

onMounted(async () => {
  if (!quiz.language) return router.replace("/");
  if (!quiz.questions.length) await quiz.loadQuestions();
});
</script>

<template>
  <ScreenLayout>
    <template #header>
      <div class="quiz-header">
        <button class="quiz-header__back" aria-label="Back" @click="onBack">
          <img
            :src="backIcon"
            alt="Back button"
            aria-hidden="true"
            class="quiz-header__back-icon"
          />
        </button>

        <ProgressBar
          v-if="quiz.total > 0"
          :current="overallCurrentIndex"
          :total="overallTotal"
          rounded
        >
          <template #top>
            <span class="progress-bar__current">{{
              overallCurrentIndex + 1
            }}</span
            >/<span class="progress-bar__total">
              {{ overallTotal }}
            </span>
          </template>
        </ProgressBar>
      </div>
    </template>

    <template v-if="currentQuestion">
      <i18n-t :keypath="currentQuestion.titleKey" tag="h1" class="title">
        <template #hl>
          <span class="accent">{{ t("word.highlight") }}</span>
        </template>
      </i18n-t>

      <p v-if="currentQuestion.subtitleKey" class="subtitle">
        {{ t(currentQuestion.subtitleKey) }}
      </p>

      <QuestionOption
        :type="typeForComp"
        :options="optionsForComp"
        :selected-ids="selectedIds"
        :variant="variant"
        @select="onSelect"
      >
        <template #option="{ option }">
          <template v-if="isGender && genderImgFor(option.labelKey)">
            <img
              :src="genderImgFor(option.labelKey)"
              :alt="t(option.labelKey)"
              class="options__tile-emoji"
              aria-hidden="true"
            />
            <span class="options__tile-label">{{ t(option.labelKey) }}</span>
          </template>

          <template v-else-if="typeForComp === 'bubble' && isTopics">
            <img
              v-if="topicImgFor(option.labelKey)"
              :src="topicImgFor(option.labelKey)"
              :alt="t(option.labelKey)"
              class="options__bubble-icon"
              aria-hidden="true"
            />
            <span class="options__bubble-label">{{ t(option.labelKey) }}</span>
          </template>

          <template v-else>
            <span class="options__tile-label">{{ t(option.labelKey) }}</span>
          </template>
        </template>
      </QuestionOption>

      <Button action="next" :disabled="!isAnswered" class="next" />
    </template>
  </ScreenLayout>
</template>

<style scoped lang="scss">
.quiz-header {
  position: relative;
  margin-top: -20px;
}

.quiz-header__back {
  border: none;
  background: transparent;
}

.quiz-header__back-icon {
  position: absolute;
  top: 20px;
  cursor: pointer;
}

.title .accent {
  color: $accent;
}
</style>
