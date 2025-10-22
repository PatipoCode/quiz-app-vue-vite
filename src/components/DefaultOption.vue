<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { Option } from "../types/quiz";

defineProps<{
  option: Option;
}>();

const { t } = useI18n();
</script>

<template>
  <span class="options__tile-label">{{ t(option.labelKey) }}</span>
</template>