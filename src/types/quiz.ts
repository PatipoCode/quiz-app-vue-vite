import { CSV_COLUMNS } from "../utils/constants"

export type LocaleCode = 'en' | 'fr' | 'de' | 'es';

export type Type =
    "single"
    | "multiple"
    | "bubble";

export type Option = {
    id: string;
    labelKey: string
};

export type Question = {
    id: number
    type: Type
    titleKey: string
    subtitleKey?: string
    options: Option[]
    selectedValue: string | string[] | null
};

export type ApiType =
    | "single"
    | "multiple"
    | "bubble"
    | "single-select"
    | "multiple-select";

export type Action = "next" | "retake";

export type QuizAnswerRow = {
    order: number;
    title: string;
    type: Type;
    answer: string;
};

export type CsvColumn = typeof CSV_COLUMNS[number];