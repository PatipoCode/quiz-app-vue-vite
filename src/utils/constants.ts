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
    "gender.female": iconUrl("female-icon.svg"),
    "gender.male": iconUrl("male-icon.svg"),
    "gender.other": iconUrl("other-gender-icon.svg"),
};

export const TOPIC_ICON_BY_LABEL: Record<string, string> = {
    "topic.werewolf": iconUrl("werewolf-icon.svg"),
    "topic.action": iconUrl("action-icon.svg"),
    "topic.royal_obsession": iconUrl("royal-icon.svg"),
    "topic.billionaire": iconUrl("billionaire-icon.svg"),
    "topic.romance": iconUrl("romance-icon.svg"),
    "topic.young_adult": iconUrl("young-adult-icon.svg"),
    "topic.bad_boy": iconUrl("bad-boy-icon.svg"),
};

export const CSV_COLUMNS = ["order", "title", "type", "answer"] as const;
