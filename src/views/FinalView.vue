<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import ScreenLayout from "../components/ScreenLayout.vue";
import { useExportQuizAnswers } from "../composables/useExportQuizAnswers";
import BaseButton from "../components/BaseButton.vue";
import DownloadIcon from "../assets/icons/download.svg";

const { t } = useI18n();
const router = useRouter();

const { downloadAnswersAsCsv } = useExportQuizAnswers();
const handleDownload = () => {
  downloadAnswersAsCsv(t);
};

const onRetake = async () => {
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
      alt=""
      aria-hidden="true"
      class="final-screen__badge"
    />

    <button
      class="final-screen__download"
      type="button"
      @click="handleDownload"
      :aria-label="t('final.download_label')"
    >
      <DownloadIcon class="final-screen__download-icon" aria-hidden="true" />
      <span class="final-screen__download-label">
        {{ t("final.download") }}
      </span>
    </button>

    <BaseButton :title="t('button.retake')" @click="onRetake"> </BaseButton>
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
  padding: 12px 20px;
  border-radius: 12px;
  color: $primary;
  font-size: 18px;
  cursor: pointer;
  transition: $transition;

  @include focus-visible;

  &:hover {
    color: $accent;
  }
}

.final-screen__download-icon {
  width: 42px;
  height: 42px;
  display: block;
  transition: $transition;
}

.final-screen__download-label {
  transition: $transition;
}
</style>
