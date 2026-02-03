import { describe, test, expect, vi, beforeEach } from 'vitest';
import { fetchQuestions } from '@/api/questions';
import { setActivePinia, createPinia } from 'pinia';
import { useQuizStore } from '@/store/quiz';
import type { Question } from '@/types/quiz';
import { STORAGE_KEYS } from '@/utils/constants';

vi.mock('@/api/questions');

const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => { store[key] = value },
        removeItem: (key: string) => { delete store[key] },
        clear: () => { store = {} }
    }
})();

globalThis.localStorage = localStorageMock as any;

const mockQuestions: Question[] = [
    {
        id: 2,
        type: 'single',
        titleKey: 'First question title - test',
        subtitleKey: 'Subtitle - test',
        options: [{
            id: 'A',
            labelKey: 'optA'
        },
        {
            id: 'B',
            labelKey: 'optB'
        }],
        selectedValue: null,
    }, {
        id: 3,
        type: 'single',
        titleKey: 'Second question title - test',
        subtitleKey: 'Subtitle - test',
        options: [{
            id: 'A',
            labelKey: 'optA'
        },
        {
            id: 'B',
            labelKey: 'optB'
        },
        {
            id: 'C',
            labelKey: 'optC'
        },
        {
            id: 'D',
            labelKey: 'optD'
        }],
        selectedValue: null,
    }
    , {
        id: 4,
        type: 'single',
        titleKey: 'Second question title - test',
        subtitleKey: 'Subtitle - test',
        options: [{
            id: 'A',
            labelKey: 'optA'
        },
        {
            id: 'B',
            labelKey: 'optB'
        }],
        selectedValue: null,
    }
];

describe('useQuizStore', () => {

    let store: ReturnType<typeof useQuizStore>;

    beforeEach(() => {
        localStorageMock.clear();
        setActivePinia(createPinia());
        store = useQuizStore();
    })

    test('store has correct initial values', () => {
        expect(store.language).toBe('en');
        expect(store.questions).toEqual([]);
        expect(store.current).toBe(0);
        expect(store.answers).toEqual({});
        expect(store.loading).toBe(false);
        expect(store.error).toBe('');
        expect(store.email).toBe('');
    })

    test('total returns correct value of total questions', () => {
        store.questions = mockQuestions;

        expect(store.total).toBe(mockQuestions.length)
    })

    test('currentQuestion returns null when questions array is empty', () => {
        store.questions = [];

        expect(store.currentQuestion).toBe(null)
    })

    test('currentQuestion returns correct value of current question index', () => {
        store.questions = mockQuestions;
        store.current = 1;

        expect(store.currentQuestion).toEqual(mockQuestions[1])
    })

    test('resetQuizData clears store', () => {
        store.questions = mockQuestions;
        store.answers = { 2: ['B'] };
        store.current = 2;
        store.resetQuizData();

        expect(store.questions).toEqual([]);
        expect(store.answers).toEqual({});
        expect(store.current).toBe(0);
    })

    test('setSingleAnswer stores correct answer [optionId] for questionId', () => {
        store.setSingleAnswer(2, 'B');

        expect(store.answers[2]).toEqual(['B']);
    })

    test('toggleMultipleAnswer stores correct array of answers for max limit is 3', () => {
        store.toggleMultipleAnswer(2, 'A');
        expect(store.answers[2]).toEqual(['A']);

        store.toggleMultipleAnswer(2, 'B');
        expect(store.answers[2]).toEqual(['A', 'B']);

        store.toggleMultipleAnswer(2, 'C');
        expect(store.answers[2]).toEqual(['A', 'B', 'C']);
    })

    test('toggleMultipleAnswer removes oldest answer when max limit reached', () => {
        store.toggleMultipleAnswer(2, 'A');
        store.toggleMultipleAnswer(2, 'B');
        store.toggleMultipleAnswer(2, 'C');
        store.toggleMultipleAnswer(2, 'D');

        expect(store.answers[2]).toEqual(['B', 'C', 'D']);
    })

    test('resetQuiz resets store and clears localStorage', () => {
        store.questions = mockQuestions;
        store.answers = { 2: ['B'] };
        store.current = 2;
        store.language = 'fr';
        store.email = 'testemail@test.com';

        localStorage.setItem(STORAGE_KEYS.locale, 'fr');
        localStorage.setItem(STORAGE_KEYS.email, 'testemail@test.com');

        store.retakeQuiz();

        expect(store.questions).toEqual([]);
        expect(store.answers).toEqual({});
        expect(store.current).toBe(0);
        expect(store.language).toBe('en');
        expect(store.email).toBe('');
    })

    test('next and back navigate through questions correctly', () => {
        store.questions = mockQuestions;
        store.current = 0;

        // moves to next question
        store.next();
        expect(store.current).toBe(1);

        // moves to last question
        store.next();
        expect(store.current).toBe(2);

        // cannot move beyond last question - stays on last question
        store.next();
        expect(store.current).toBe(2);

        // moves back
        store.back();
        expect(store.current).toBe(1);

        // cannot move below first question - stays on first question
        store.back();
        expect(store.current).toBe(0); 
    })

    test('loadQuestions loads questions successfully', async () => {
        vi.mocked(fetchQuestions).mockResolvedValue(mockQuestions);
        await store.loadQuestions();

        expect(store.questions).toEqual(mockQuestions);
        expect(store.loading).toBe(false);
        expect(store.error).toBe('');

    })

})


