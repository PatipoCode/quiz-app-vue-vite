import type {
    ApiType,
    Type,
    Question,
    Option,
    LocaleCode
} from "../types/quiz";
import {
    GENDER_QUESTION_ID,
    TOPICS_QUESTION_ID,
    TYPE_MAP, GENDER_IMG_BY_LABEL,
    TOPIC_ICON_BY_LABEL
} from "../utils/constants"

export const findLanguageQuestion = (
    allQuestions: Question[],
    languageQuestionId: number
): Question | null =>
    allQuestions.find(question => question.id === languageQuestionId) ?? null;

export const createLanguageOptions = (
    languageQuestion: Question | null,
    answerKeyToLocale: Record<string, LocaleCode>
) => {
    const options = languageQuestion?.options ?? [];
    return options.map(option => ({
        id: answerKeyToLocale[option.labelKey],
        labelKey: option.labelKey,
    }));
};

export const normalizeType = (apiType?: ApiType): Type =>
    TYPE_MAP[apiType ?? "single"];

export const getOptions = (question?: Question | null): Option[] => question?.options ?? [];

export const isGenderQuestion = (question?: Question | null): boolean =>
    !!question && (question.id === GENDER_QUESTION_ID || question.titleKey === "question.gender");

export const isTopicsQuestion = (question?: Question | null): boolean =>
    !!question && (question.id === TOPICS_QUESTION_ID || question.titleKey === "question.favorite_topics");

export const variantForQuestion = (question?: Question | null): "default" | "tiles" =>
    isGenderQuestion(question) ? "tiles" : "default";

export const iconUrl = (file: string) =>
    new URL(`../assets/icons/${file}`, import.meta.url).href;

export const genderImgFor = (labelKey: string): string =>
    GENDER_IMG_BY_LABEL[labelKey] ?? "";

export const topicImgFor = (labelKey: string): string =>
    TOPIC_ICON_BY_LABEL[labelKey] ?? "";