<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { topicImgFor } from "../utils/quiz";
import type { Option } from "../types/quiz";

defineProps<{
  option: Option;
}>();

const { t } = useI18n();
</script>

<template>
  <img
    v-if="topicImgFor(option.labelKey)"
    :src="topicImgFor(option.labelKey)"
    :alt="t(option.labelKey)"
    class="options__bubble-icon"
    aria-hidden="true"
  />
  <span class="options__bubble-label">{{ t(option.labelKey) }}</span>
</template>