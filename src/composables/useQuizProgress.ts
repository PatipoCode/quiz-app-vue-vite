import { computed } from "vue";
import type { useQuizStore } from "../store/quiz";

type QuizStore = ReturnType<typeof useQuizStore>;

export interface PreQuizConfig {
    stepsBeforeQuiz?: number;
    currentStepIndex?: number;
}

export function useQuizProgress(
    quizStore: QuizStore,
    { stepsBeforeQuiz = 1, currentStepIndex = 0 }: PreQuizConfig = {}
) {
    const progressTotal = computed(() => quizStore.total + stepsBeforeQuiz);
    const progressCurrent = computed(() =>
        Math.min(currentStepIndex + 1, progressTotal.value)
    );

    return {
        progressTotal,
        progressCurrent,
    };
}
