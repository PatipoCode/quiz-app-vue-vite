import { describe, test, expect, beforeEach } from 'vitest'
import { useQuizStore } from '../../store/quiz'
import { setActivePinia, createPinia } from 'pinia'
import { useQuizProgress } from '../../composables/useQuizProgress'
import type { Type } from '../../types/quiz'

const testQuestion = (id: number, titleKey: string, type: Type = 'single') => ({
    id,
    titleKey,
    type,
    options: [],
    selectedValue: null
})

describe('useQuizProgress', () => {

    let store: any;

    beforeEach(() => {
        setActivePinia(createPinia());
        store = useQuizStore();
    })

    test('calculates progress for progressCurrent', () => {
        store.questions = [
            testQuestion(1, 'question1'),
            testQuestion(2, 'question2', 'multiple')
        ];
        const { progressTotal, progressCurrent } = useQuizProgress(store);

        expect(progressTotal.value).toBe(3);
        expect(progressCurrent.value).toBe(1);
    })

    test('progressCurrent doesn`t exceed progressTotal', () => {
        store.questions = [testQuestion(3, 'question1')];
        const { progressTotal, progressCurrent } = useQuizProgress(store, {
            currentStepIndex: 7
        });

        expect(progressCurrent.value).toBe(progressTotal.value);
    })
})