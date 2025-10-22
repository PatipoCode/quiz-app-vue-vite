<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useQuizStore } from "../store/quiz";
import ScreenLayout from "../components/ScreenLayout.vue";
import BaseButton from "../components/BaseButton.vue";
import type { Question, Option, QuizAnswerRow, CsvColumn } from "../types/quiz";

const { t } = useI18n();
const quiz = useQuizStore();
const router = useRouter();

const answerRows = computed<QuizAnswerRow[]>(() =>
  (quiz.questions as Question[]).map((question: Question, index: number) => {
    const selectedOptions = new Set<string>(quiz.answers[question.id] ?? []);

    const options: Option[] = question.options as Option[];
    const answerLabels = options
      .filter((option) => selectedOptions.has(option.id))
      .map((option) => t(option.labelKey));
    return {
      order: index + 1,
      title: t(question.titleKey),
      type: question.type,
      answer: answerLabels.join("; "),
    };
  })
);

const CSV_HEADER: readonly CsvColumn[] = [
  "order",
  "title",
  "type",
  "answer",
] as const;

const escapeCsvValue = (value: unknown): string => {
  const stringValue = String(value ?? "");
  return /[",\n\r]/.test(stringValue)
    ? `"${stringValue.replace(/"/g, '""')}"`
    : stringValue;
};

function downloadAnswersAsCsv(): void {
  const csvLines: string[] = [
    CSV_HEADER.join(","),
    ...answerRows.value.map((row) =>
      CSV_HEADER.map((header) => escapeCsvValue(row[header])).join(",")
    ),
  ];
  const csvContent = csvLines.join("\r\n");
  const blob = new Blob([csvContent], {
    type: "text/csvContent;charset=utf-8",
  });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = `quiz-answers-${quiz.language}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(downloadUrl);
}

const onRetake = async () => {
  quiz.retakeQuiz?.();
  await router.replace({ name: "language" });
};
</script>

<template>
  <ScreenLayout>
    <template #header>
      <h1 class="title cursive">{{ t("final.title") }}</h1>
      <p class="subtitle">
        {{ t("final.subtitle") }}
      </p>
    </template>

    <img
      src="../assets/icons/checkmark-green.png"
      alt="Quiz done checkmark"
      aria-hidden="true"
      class="final-screen__badge"
    />

    <button
      class="final-screen__download"
      type="button"
      @click="downloadAnswersAsCsv"
    >
      <img
        src="../assets/icons/download-icon.png"
        alt="Icon download answers"
        aria-hidden="true"
        class="final-screen__download-icon"
      />
      <span class="final-screen__download-label">
        {{ t("final.download") }}
      </span>
    </button>

    <BaseButton @click="onRetake" class="final-screen__retake">
      {{ t("button.retake") }}
    </BaseButton>
  </ScreenLayout>
</template>

<style scoped lang="scss">
.final-screen__badge {
  display: block;
  margin: 62px auto 142px;
}

.final-screen__download {
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: 0;
  color: $primary;
  font-size: 18px;
  cursor: pointer;
}

.final-screen__download-icon {
  width: 42px;
  height: 42px;
  display: block;
}
</style>
