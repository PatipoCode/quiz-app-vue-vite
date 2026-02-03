import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchQuestions, answerKeyToLocale } from '@/api/questions';

describe('questions API', () => {

    beforeEach(() => {
        global.fetch = vi.fn() as typeof fetch;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('answerKeyToLocale', () => {
        test('maps answer keys to locale codes correctly', () => {
            expect(answerKeyToLocale['answers.english']).toBe('en');
            expect(answerKeyToLocale['answers.french']).toBe('fr');
            expect(answerKeyToLocale['answers.german']).toBe('de');
            expect(answerKeyToLocale['answers.spanish']).toBe('es');
        });
    });

    describe('fetchQuestions', () => {
        test('fetches and transforms questions successfully', async () => {
            const mockApiResponse = [
                {
                    id: 1,
                    type: 'single-select',
                    question: 'questions.q1.title',
                    subtitle: 'questions.q1.subtitle',
                    answers: ['answers.option1', 'answers.option2', 'answers.option3']
                },
                {
                    id: 2,
                    type: 'multiple-select',
                    question: 'questions.q2.title',
                    answers: ['answers.option1', 'answers.option2', 'answers.option3']
                }
            ];

            vi.mocked(fetch).mockResolvedValue({
                ok: true,
                json: async () => mockApiResponse
            } as Response);

            const result = await fetchQuestions();

            expect(fetch).toHaveBeenCalledWith('/quiz-api/questions');
            expect(result).toHaveLength(2);

            expect(result[0]).toEqual({
                id: 1,
                type: 'single',
                titleKey: 'questions.q1.title',
                subtitleKey: 'questions.q1.subtitle',
                options: [
                    { id: '1', labelKey: 'answers.option1' },
                    { id: '2', labelKey: 'answers.option2' },
                    { id: '3', labelKey: 'answers.option3' }
                ],
                selectedValue: null
            });

            expect(result[1]).toEqual({
                id: 2,
                type: 'multiple',
                titleKey: 'questions.q2.title',
                subtitleKey: undefined,
                options: [
                    { id: '1', labelKey: 'answers.option1' },
                    { id: '2', labelKey: 'answers.option2' },
                    { id: '3', labelKey: 'answers.option3' }
                ],
                selectedValue: []
            });
        });

        test('normalizes type from "multiple-select" to "multiple"', async () => {
            const mockApiResponse = [{
                id: 1,
                type: 'multiple-select',
                question: 'test',
                answers: ['a', 'b']
            }];

            vi.mocked(fetch).mockResolvedValue({
                ok: true,
                json: async () => mockApiResponse
            } as Response);

            const result = await fetchQuestions();

            expect(result[0].type).toBe('multiple');
            expect(result[0].selectedValue).toEqual([]);
        });

        test('normalizes type from "bubble" to "bubble"', async () => {
            const mockApiResponse = [{
                id: 1,
                type: 'bubble',
                question: 'test',
                answers: ['a', 'b']
            }];

            vi.mocked(fetch).mockResolvedValue({
                ok: true,
                json: async () => mockApiResponse
            } as Response);

            const result = await fetchQuestions();

            expect(result[0].type).toBe('bubble');
            expect(result[0].selectedValue).toEqual([]);
        });

        test('defaults to "single" type for unknown types', async () => {
            const mockApiResponse = [{
                id: 1,
                type: 'unknown',
                question: 'test',
                answers: ['a', 'b']
            }];

            vi.mocked(fetch).mockResolvedValue({
                ok: true,
                json: async () => mockApiResponse
            } as Response);

            const result = await fetchQuestions();

            expect(result[0].type).toBe('single');
            expect(result[0].selectedValue).toBe(null);
        });

        test('handles missing subtitle', async () => {
            const mockApiResponse = [{
                id: 1,
                question: 'test',
                answers: ['test answer.a', 'test answer.b']
            }];

            vi.mocked(fetch).mockResolvedValue({
                ok: true,
                json: async () => mockApiResponse
            } as Response);

            const result = await fetchQuestions();

            expect(result[0].subtitleKey).toBeUndefined();
        });

        test('throws error when fetch fails', async () => {
            vi.mocked(fetch).mockResolvedValue({
                ok: false,
                status: 500
            } as Response);

            await expect(fetchQuestions()).rejects.toThrow('Failed to fetch');
        });

        test('returns empty array for invalid API data', async () => {
            vi.mocked(fetch).mockResolvedValue({
                ok: true,
                json: async () => null
            } as Response);

            const result = await fetchQuestions();

            expect(result).toEqual([]);
        });
    });
});