import { useQuizStore } from "../store/quiz";
import type { Question, Option } from "../types/quiz";
import { CSV_COLUMNS } from "../utils/constants";

export function useExportQuizAnswers() {
    const quiz = useQuizStore();

    const getAnswerRows = (t: (key: string) => string) => {
        return (quiz.questions as Question[]).map((question: Question, index: number) => {
            const selectedOptions = new Set<string>(quiz.answers[question.id] ?? []);

            const options: Option[] = question.options as Option[];
            const answerLabels = options
                .filter((option) => selectedOptions.has(option.id))
                .map((option) => t(option.labelKey));

            return {
                order: index + 1,
                title: t(question.titleKey),
                type: question.type,
                answer: answerLabels.join("; "),
            };
        });
    };

    const escapeCsvValue = (value: unknown): string => {
        const stringValue = String(value ?? "");
        return /[",\n\r]/.test(stringValue)
            ? `"${stringValue.replace(/"/g, '""')}"`
            : stringValue;
    };

    const downloadAnswersAsCsv = (t: (key: string) => string): void => {
        const answerRows = getAnswerRows(t);

        const csvLines: string[] = [
            CSV_COLUMNS.join(","),
            ...answerRows.map((row) =>
                CSV_COLUMNS.map((header) => escapeCsvValue(row[header])).join(",")
            ),
        ];

        const csvContent = csvLines.join("\r\n");
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8",
        });

        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `quiz-answers-${quiz.language}.csv`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(downloadUrl);
    };

    return {
        downloadAnswersAsCsv,
        getAnswerRows,
    };
}