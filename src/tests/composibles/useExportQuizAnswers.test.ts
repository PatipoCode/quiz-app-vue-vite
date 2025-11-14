import { describe, test, expect, vi, beforeEach } from 'vitest'
import { useExportQuizAnswers } from '../../composables/useExportQuizAnswers'
import { setActivePinia, createPinia } from 'pinia'
import { useQuizStore } from '../../store/quiz'
import type { Type } from '../../types/quiz'

const testQuestion = (id: number, titleKey: string) => ({
    id,
    titleKey,
    type: 'single' as Type,
    options: [{ id: 'opt1', labelKey: 'option1' }],
    selectedValue: null
})

describe('useExportQuizAnswers', () => {

    let store: any;

    beforeEach(() => {
        setActivePinia(createPinia());
        store = useQuizStore();
    })

    const setupExport = () => {
        const createLinkForDownload = vi.spyOn(document, 'createElement');
        const { downloadAnswersAsCsv } = useExportQuizAnswers();
        const translation = (key: string) => key;

        return { createLinkForDownload, downloadAnswersAsCsv, translation };
    }

    const testDownload = () => {
        const { createLinkForDownload, downloadAnswersAsCsv, translation } = setupExport();
        downloadAnswersAsCsv(translation);
        expect(createLinkForDownload).toHaveBeenCalledWith('a');
    }

    test('creates csv file', () => {
        store.questions = [testQuestion(1, 'question1')]
        store.answers = { 1: ['opt1'] };
        store.language = 'en';

        testDownload();
    })

    test('handles empty answers', () => {
        store.questions = [testQuestion(1, 'question1')];
        store.answers = {};

        testDownload();
    })
})