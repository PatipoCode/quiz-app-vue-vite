<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useForm, useField } from "vee-validate";
import { useQuizStore } from "../store/quiz";
import { useValidation } from "../composables/useValidation";
import ScreenLayout from "../components/ScreenLayout.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseButton from "../components/BaseButton.vue";

const router = useRouter();
const { t } = useI18n();
const quiz = useQuizStore();
const { validateEmail } = useValidation();

const { handleSubmit, meta } = useForm({
  validationSchema: {
    email: validateEmail,
  },
  initialValues: {
    email: quiz.email ?? "",
  },
});

const { value: email, errorMessage } = useField<string>("email");

const onSubmit = handleSubmit(async (values) => {
  try {
    const trimmedEmail = values.email.trim();
    quiz.setEmail(trimmedEmail);
    await router.replace({ name: "final" });
  } catch (error) {
    console.error("Failed to submit email:", error);
  }
});
</script>

<template>
  <ScreenLayout>
    <template #header>
      <h1 class="title">{{ t("email.title") }}</h1>
      <p class="subtitle">{{ t("email.subtitle") }}</p>
    </template>

    <form class="email-form" @submit.prevent="onSubmit" novalidate>
      <BaseInput
        v-model="email"
        :placeholder="t('email.placeholder')"
        autoFocus
      >
        <template v-if="errorMessage" #error>
          {{ errorMessage }}
        </template>
      </BaseInput>

      <p class="email-form__legal">
        {{ t("email.legal.prefix") }}
        <a href="#" class="email-form__link">{{ t("email.legal.privacy") }}</a>
        {{ t("email.legal.and") }}
        <a href="#" class="email-form__link">{{ t("email.legal.terms") }}</a>
      </p>

      <BaseButton
        :disabled="!meta.valid"
        @click="onSubmit"
        class="email-form__submit"
      >
        {{ t("button.next") }}
      </BaseButton>
    </form>
  </ScreenLayout>
</template>

<style scoped lang="scss">
.email-form {
  display: flex;
  flex-direction: column;
  margin-top: 56px;

  &__legal {
    display: block;
    margin: 50px 27.5px auto;
    text-align: center;
    color: $secondary;
    font-size: 14px;
  }

  &__link {
    color: $accent;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__submit {
    margin-top: 8px;
  }
}
</style>
