<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { genderImgFor } from "../utils/quiz";
import type { Option } from "../types/quiz";

defineProps<{
  option: Option;
}>();

const { t } = useI18n();
</script>

<template>
  <img
    v-if="genderImgFor(option.labelKey)"
    :src="genderImgFor(option.labelKey)"
    :alt="t(option.labelKey)"
    class="options__tile-emoji"
    aria-hidden="true"
  />
  <span class="options__tile-label">{{ t(option.labelKey) }}</span>
</template>