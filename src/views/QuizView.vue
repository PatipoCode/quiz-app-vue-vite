<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useQuizStore } from "../store/quiz";
import { useI18n } from "vue-i18n";
import type { Question } from "../types/quiz";
import {
  normalizeType,
  isGenderQuestion,
  getOptions,
  isTopicsQuestion,
  variantForQuestion,
} from "../utils/quiz";
import { MULTI_SELECT_LIMIT } from "../utils/constants.ts";
import ScreenLayout from "../components/ScreenLayout.vue";
import ProgressBar from "../components/ProgressBar.vue";
import BaseButton from "../components/BaseButton.vue";
import QuestionOption from "../components/QuestionOption.vue";
import BackButton from "../components/BackButton.vue";
import GenderOption from "../components/GenderOption.vue";
import TopicOption from "../components/TopicOption.vue";
import DefaultOption from "../components/DefaultOption.vue";

const router = useRouter();
const quiz = useQuizStore();
const { t } = useI18n();
const currentQuestion = computed<Question | null>(() => quiz.currentQuestion);
const overallCurrentIndex = computed(() => quiz.current + 1);
const overallTotal = computed(() => quiz.total + 1);
const typeForComp = computed(() => normalizeType(currentQuestion.value?.type));
const optionsForComp = computed(() => getOptions(currentQuestion.value));
const selectedIds = computed(() =>
  currentQuestion.value ? quiz.answers[currentQuestion.value.id] ?? [] : []
);
const isAnswered = computed(
  () =>
    !!(currentQuestion.value && quiz.answers[currentQuestion.value.id]?.length)
);
const isLast = computed(() => quiz.current >= quiz.total - 1);
const isGender = computed(() => isGenderQuestion(currentQuestion.value));
const isTopics = computed(() => isTopicsQuestion(currentQuestion.value));
const variant = computed(() => variantForQuestion(currentQuestion.value));

const isLoading = ref(false);

const setOptionComponent = computed(() => {
  if (isGender.value) return GenderOption;
  if (typeForComp.value === "bubble" && isTopics.value) return TopicOption;
  return DefaultOption;
});

const onSelect = (optId: string) => {
  if (!currentQuestion.value) return;
  if (typeForComp.value === "single") {
    quiz.setSingleAnswer(currentQuestion.value.id, optId);
  } else {
    quiz.toggleMultipleAnswer(
      currentQuestion.value.id,
      optId,
      MULTI_SELECT_LIMIT
    );
  }
};

const onBack = () => {
  if (quiz.current === 0) return router.replace("/");
  quiz.back();
};

onMounted(async () => {
  if (!quiz.language) return router.replace("/");
  if (!quiz.questions.length) {
    isLoading.value = true;
    await quiz.loadQuestions();
    isLoading.value = false;
  }
});

const onNext = async () => {
  if (isLast.value) {
    await router.push({ name: "loader" });
  } else {
    quiz.next();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
</script>

<template>
  <ScreenLayout>
    <template #header>
      <BackButton v-if="!isLoading" @click="onBack" />
      <ProgressBar
        v-if="quiz.total > 0"
        :current="overallCurrentIndex"
        :total="overallTotal"
        rounded
      >
      </ProgressBar>
    </template>

    <div v-if="isLoading" class="quiz-loader">
      <div class="quiz-loader__spinner"></div>
      <p class="quiz-loader__text">{{ t("question.loading") }}</p>
    </div>

    <template v-else-if="currentQuestion">
      <i18n-t
        :keypath="currentQuestion.titleKey"
        tag="h1"
        class="title"
        aria-live="polite"
      >
        <template #hl>
          <span class="accent">{{ t("word.highlight") }}</span>
        </template>
      </i18n-t>

      <p v-if="currentQuestion.subtitleKey" class="subtitle" aria-live="polite">
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
          <component :is="setOptionComponent" :option="option" />
        </template>
      </QuestionOption>

      <BaseButton
        :disabled="!isAnswered"
        :title="t('button.next')"
        @click="onNext"
      >
      </BaseButton>
    </template>
  </ScreenLayout>
</template>

<style scoped lang="scss">
.title .accent {
  color: $accent;
}

.quiz-loader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
  gap: 20px;
}

.quiz-loader__spinner {
  width: 70px;
  height: 70px;
  border: 4px solid rgba($accent, 0.25);
  border-top-color: $accent;
  border-radius: 50%;
  animation: spin 0.45s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.quiz-loader__text {
  font-size: 16px;
  font-weight: 500;
  color: $primary;
}
</style>
