<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    type?: "email" | "text" | "tel";
    autoFocus?: boolean;
    label?: string;
    disabled?: boolean;
    required?: boolean;
  }>(),
  {
    placeholder: "",
    type: "email",
    autoFocus: false,
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>

<template>
  <div class="base-input">
    <label for="email" class="base-input__label">
      <span class="base-input__label-text">{{ label }}</span>
      <input
        id="email"
        class="base-input__field"
        v-model="inputValue"
        :type="type"
        :inputmode="
          type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'text'
        "
        :autocomplete="type"
        autocapitalize="off"
        spellcheck="false"
        :placeholder="placeholder"
        :aria-invalid="!!$slots.error"
        :aria-describedby="$slots.error ? 'base-input-error' : undefined"
        :disabled="disabled"
        :required="required"
      />
    </label>

    <p v-if="$slots.error" id="base-input-error" class="base-input__error">
      <slot name="error" />
    </p>
  </div>
</template>

<style scoped lang="scss">
.base-input {
  display: block;

  &__label {
    display: block;

    &-text {
      @include visually-hidden;
    }
  }

  &__field {
    display: block;
    width: 100%;
    padding: 26px 20px;
    border-radius: 16px;
    border: 0;
    background-color: $input-bg-color;
    color: $btn-txt-color;
    font-size: 16px;
    outline: 2px solid transparent;
    transition: $transition;

    @include focus-visible;

    &[aria-invalid="true"] {
      outline-color: $accent;
    }

    &::placeholder {
      color: rgba($btn-txt-color, 0.5);
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 1000px $input-bg-color inset;
      -webkit-text-fill-color: $btn-txt-color;
    }
  }

  &__error {
    margin: 8px 0 0;
    color: $accent;
    font-size: 13px;
    line-height: 1.4;
  }
}
</style>
