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
} from "../utils/quiz";
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
const isLast = computed(() => quiz.current >= quiz.total - 1);
const isGender = computed(() => isGenderQuestion(currentQuestion.value));
const isTopics = computed(() => isTopicsQuestion(currentQuestion.value));
const variant = computed(() => variantForQuestion(currentQuestion.value));

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
      <BackButton @click="onBack" />

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
          <component :is="setOptionComponent" :option="option" />
        </template>
      </QuestionOption>

      <BaseButton :disabled="!isAnswered" @click="onNext">
        {{ t("button.next") }}
      </BaseButton>
    </template>
  </ScreenLayout>
</template>

<style scoped lang="scss"></style>
