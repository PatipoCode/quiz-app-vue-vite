import type { ApiType, Type } from '../types/quiz';
import { iconUrl } from './quiz';

export const STORAGE_KEYS = {
    locale: 'quiz.locale',
    email: 'quiz.email',
} as const;

export const LANGUAGE_QUESTION_ID = 1 as const;

export const PRE_QUIZ_STEPS = 1 as const;
export const LANGUAGE_STEP_INDEX = 0 as const;

export const MULTI_SELECT_LIMIT = 3 as const;

export const GENDER_QUESTION_ID = 2 as const;
export const TOPICS_QUESTION_ID = 5 as const;

export const TYPE_MAP: Record<ApiType, Type> = {
    single: 'single',
    multiple: 'multiple',
    bubble: 'bubble',
    'single-select': 'single',
    'multiple-select': 'multiple',
} as const;

export const GENDER_IMG_BY_LABEL: Record<string, string> = {
    "gender.female": iconUrl("female-icon.png"),
    "gender.male": iconUrl("male-icon.png"),
    "gender.other": iconUrl("other-gender-icon.png"),
};

export const TOPIC_ICON_BY_LABEL: Record<string, string> = {
    "topic.werewolf": iconUrl("werewolf-icon.png"),
    "topic.action": iconUrl("action-icon.png"),
    "topic.royal_obsession": iconUrl("royal-icon.png"),
    "topic.billionaire": iconUrl("billionaire-icon.png"),
    "topic.romance": iconUrl("romance-icon.png"),
    "topic.young_adult": iconUrl("young-adult-icon.png"),
    "topic.bad_boy": iconUrl("bad-boy-icon.png"),
};

export const CSV_COLUMNS = ["order", "title", "type", "answer"] as const;
