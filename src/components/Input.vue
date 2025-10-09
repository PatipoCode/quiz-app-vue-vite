<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    pattern?: RegExp;
    autoFocus?: boolean;
  }>(),
  {
    placeholder: "",
    pattern: (_props) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    autoFocus: false,
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
  (event: "update:valid", value: boolean): void;
}>();

const inputValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== inputValue.value) {
      inputValue.value = newValue;
    }
  }
);

watch(inputValue, (newValue) => emit("update:modelValue", newValue));

const touched = ref(false);
const isValid = computed(() => props.pattern.test(inputValue.value.trim()));

watch(isValid, (newValue) => emit("update:valid", newValue), {
  immediate: true,
});

function onBlur() {
  touched.value = true;
}
</script>

<template>
  <label
    class="form-field"
    :class="{ 'form-field--invalid': touched && !isValid }"
  >
    <input
      class="form-field__control"
      v-model="inputValue"
      type="email"
      inputmode="email"
      autocomplete="email"
      autocapitalize="off"
      spellcheck="false"
      :placeholder="placeholder"
      :aria-invalid="touched && !isValid ? 'true' : 'false'"
      :aria-describedby="touched && !isValid ? 'email-err' : undefined"
      @blur="onBlur"
      :autofocus="autoFocus"
    />
  </label>

  <p v-if="touched && !isValid" id="email-err" class="form-field__error">
    <slot name="error"></slot>
  </p>
</template>

<style scoped lang="scss">
.form-field {
  display: block;
}

.form-field__control {
  display: block;
  width: 100%;
  padding: 26px 20px;
  border-radius: 16px;
  border: 0;
  background-color: $input-bg-color;
  color: $btn-txt-color;
  font-size: 16px;
  outline: 2px solid $accent;
}

.form-field__error {
  margin: 8px 0 0;
  color: $accent;
  font-size: 13px;
}
</style>
