<!-- <script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useQuizStore } from "../store/quiz";
import type { Action } from "../types/quiz";

const props = defineProps<{
  action: Action;
  disabled?: boolean;
  labelKey?: string;
}>();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const quiz = useQuizStore();
const emit = defineEmits<{ (e: "press"): void }>();
const isLast = computed(() => quiz.current >= quiz.total - 1);

async function handleClick() {
  if (props.disabled) return;

  emit("press");

  if (props.action === "retake") {
    quiz.retakeQuiz?.();
    await router.replace({ name: "language" });
    return;
  }

  if (props.action === "next") {
    await handleNextAction();
  }
}
// use mid component between button and parent OR use emit and login on parent component!!!
async function handleNextAction() {
  const routeName = String(route.name ?? "");

  switch (routeName) {
    case "quiz":
      await handleQuizNext();
      break;

    case "email":
      await router.replace({ name: "final" });
      break;

    case "language":
      await router.replace({ name: "quiz" });
      break;
  }
}

async function handleQuizNext() {
  if (isLast.value) {
    await router.push({ name: "loader" });
  } else {
    quiz.next();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

const label = computed(() =>
  props.labelKey
    ? t(props.labelKey)
    : props.action === "next"
    ? t("button.next")
    : t("button.retake")
);
</script> -->

<script setup lang="ts">
defineProps<{
  disabled?: boolean;
  type?: "button" | "submit";
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    class="base-button"
    :class="{ 'base-button--disabled': disabled }"
    type="button"
    :disabled="disabled"
    @click="emit('click')"
  >
    <span class="base-button__label">
      <slot />
    </span>
  </button>
</template>

<style scoped lang="scss">
.base-button {
  position: absolute;
  bottom: 20px;
  width: 90%;
  height: 56px;
  padding: 16px;
  border: 0;
  border-radius: 1000px;
  background-color: $accent;
  color: $btn-txt-color;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(&--disabled) {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid $accent;
    outline-offset: 2px;
  }

  &__label {
    display: inline-block;
    line-height: 1.5;
  }
}
</style>
