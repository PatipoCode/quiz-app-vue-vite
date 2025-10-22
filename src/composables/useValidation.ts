import { useI18n } from "vue-i18n";

export function useValidation() {
  const { t } = useI18n();

  const validateEmail = (value: string) => {
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
  };

  return {
    validateEmail,
  };
}