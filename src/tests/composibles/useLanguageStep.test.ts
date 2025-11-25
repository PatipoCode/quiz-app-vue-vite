import { describe, test, expect, vi } from 'vitest'
import { mount } from '../utils'
import { setActivePinia, createPinia } from 'pinia'
import { defineComponent, ref } from 'vue'
import { mockRouter } from '../mocks'
import { LANGUAGE_QUESTION_ID } from '../../utils/constants'

mockRouter();

import { useLanguageStep } from '../../composables/useLanguageStep'

vi.mock('vue-i18n', async (importOriginal) => {
    const actual = await importOriginal<typeof import('vue-i18n')>();
    return {
        ...actual,
        useI18n: () => ({
            t: (key: string) => key,
            locale: ref('en'),
        }),
    };
});

vi.mock('../../api/questions', () => ({
    fetchQuestions: vi.fn(() => Promise.resolve([
        {
            id: LANGUAGE_QUESTION_ID,
            titleKey: 'question.language',
            type: 'single',
            options: [
                { id: '1', labelKey: 'answers.english' },
                { id: '2', labelKey: 'answers.french' },
                { id: '3', labelKey: 'answers.german' },
                { id: '4', labelKey: 'answers.spanish' },
            ],
            selectedValue: null
        }
    ])),
    answerKeyToLocale: {
        'answers.english': 'en',
        'answers.french': 'fr',
        'answers.german': 'de',
        'answers.spanish': 'es',
    }
}))

describe('useLanguageStep', () => {

    const createTestComposable = () => {
        setActivePinia(createPinia());

        let composable: any;

        const TestComponent = defineComponent({
            setup() {
                composable = useLanguageStep()
                return {}
            },
            template: '<div></div>'
        })

        mount(TestComponent);
        return composable;
    }

    test('returns default language `en`', () => {
        const { selectedLanguage } = createTestComposable();

        expect(selectedLanguage.value).toEqual(['en']);
    })

    test('returns updated language', async () => {
        const { selectedLanguage, selectLanguage } = createTestComposable();

        await selectLanguage('fr');

        expect(selectedLanguage.value).toEqual(['fr']);
    })

    test('loads question', async () => {
        const { loadLanguageQuestion, languageQuestion } = createTestComposable();

        await loadLanguageQuestion();

        expect(languageQuestion.value).not.toBeNull();
        expect(languageQuestion.value?.titleKey).toBe('question.language');
    })
})