<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import ScreenLayout from "../components/ScreenLayout.vue";

const router = useRouter();
const { t } = useI18n();
const value = ref(0);
const size = 180;
const stroke = 12;
const r = (size - stroke) / 2;
const c = 2 * Math.PI * r;
const dashoffset = computed(() => c - (c * value.value) / 100);

const showMessage = ref(true);
let rafId: number | null = null;
let toId: number | null = null;

onMounted(() => {
  const duration = 5000;
  const start = performance.now();

  const tick = (now: number) => {
    const pct = Math.min(100, Math.round(((now - start) / duration) * 100));
    value.value = pct;
    if (pct < 100) {
      rafId = requestAnimationFrame(tick);
    } else {
      showMessage.value = false;
      toId = window.setTimeout(() => router.replace("/email"), 500);
    }
  };

  rafId = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
  if (rafId != null) cancelAnimationFrame(rafId);
  if (toId != null) clearTimeout(toId);
});
</script>

<template>
  <ScreenLayout>
    <div class="loader">
      <svg
        :width="size"
        :height="size"
        :viewBox="`0 0 ${size} ${size}`"
        class="loader__ring"
      >
        <circle
          :cx="size / 2"
          :cy="size / 2"
          :r="r"
          class="loader__ring-track"
          :stroke-width="stroke"
          fill="none"
        />

        <circle
          :cx="size / 2"
          :cy="size / 2"
          :r="r"
          class="loader__ring-progress"
          :stroke-width="stroke"
          fill="none"
          stroke-linecap="round"
          :stroke-dasharray="c"
          :stroke-dashoffset="dashoffset"
          :transform="`rotate(-90 ${size / 2} ${size / 2})`"
        />

        <text
          x="50%"
          y="50%"
          text-anchor="middle"
          dominant-baseline="central"
          class="loader__percent"
        >
          {{ value }}%
        </text>
      </svg>

      <p class="hint">{{ t("loader.hint") }}</p>
    </div>
  </ScreenLayout>
</template>

<style scoped lang="scss">
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-top: 150px;
}

.loader__ring {
  display: block;
}

.loader__ring-track {
  stroke: $primary;
}

.loader__ring-progress {
  stroke: $accent;
  transition: stroke-dashoffset 0.1s linear;
}

.loader__percent {
  font-size: 52px;
  font-weight: 800;
  fill: $primary;
}

.hint {
  font-size: 17px;
  font-weight: 600;
  color: $primary;
}
</style>
