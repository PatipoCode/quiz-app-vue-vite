<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useForm, useField } from "vee-validate";
import { useQuizStore } from "../store/quiz";
import ScreenLayout from "../components/ScreenLayout.vue";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";

const router = useRouter();
const { t } = useI18n();
const quiz = useQuizStore();
const submitting = ref(false);

function validateEmail(value: string) {
  if (!value) {
    return t("email.error.required");
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return t("email.error.required");
  }

  const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!EMAIL_RE.test(trimmedValue)) {
    return t("email.error.invalid");
  }

  if (trimmedValue.length > 50) {
    return t("email.error.tooLong");
  }

  return true;
}

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
  if (submitting.value) return;

  submitting.value = true;

  try {
    const trimmedEmail = values.email.trim();
    quiz.setEmail(trimmedEmail);
    await router.replace({ name: "final" });
  } catch (error) {
    submitting.value = false;
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
      <Input v-model="email" :placeholder="t('email.placeholder')" autoFocus>
        <template v-if="errorMessage" #error>
          {{ errorMessage }}
        </template>
      </Input>

      <p class="email-form__legal">
        {{ t("email.legal.prefix") }}
        <a href="#" class="email-form__link">{{ t("email.legal.privacy") }}</a>
        {{ t("email.legal.and") }}
        <a href="#" class="email-form__link">{{ t("email.legal.terms") }}</a>
      </p>

      <Button
        action="next"
        :disabled="!meta.valid || submitting"
        @press="onSubmit"
        class="email-form__submit"
      />
    </form>
  </ScreenLayout>
</template>

<style scoped lang="scss">
.email-form {
  display: flex;
  flex-direction: column;
  margin-top: 56px;
}

.email-form__legal {
  display: block;
  margin: 50px 27.5px auto;
  text-align: center;
  color: $secondary;
  font-size: 14px;
}

.email-form__link {
  color: $accent;
  text-decoration: none;
}
.email-form__link:hover {
  text-decoration: underline;
}

.email-form__submit {
  margin-top: 8px;
}
</style>
