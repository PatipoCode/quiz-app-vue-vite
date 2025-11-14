import { describe, test, expect, vi } from 'vitest'
import { mount } from '../utils'
import { useLanguageStep } from '../../composables/useLanguageStep'
import { setActivePinia, createPinia } from 'pinia'
import { defineComponent } from 'vue'
import { mockRouter } from '../mocks'
import { LANGUAGE_QUESTION_ID } from '../../utils/constants'

mockRouter();

vi.mock('../../api/questions', () => ({
    fetchQuestions: vi.fn(() => Promise.resolve([
        {
            id: LANGUAGE_QUESTION_ID,
            titleKey: 'question.language',
            type: 'single',
            options: [
                { id: 'en', labelKey: 'English' }
            ],
            selectedValue: null
        }
    ]))
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

    test('returns selected language', () => {
        const { selectedLanguage } = createTestComposable();

        expect(selectedLanguage.value).toEqual(['en']);
    })

    test('loads question', async () => {
        const { loadLanguageQuestion, languageQuestion } = createTestComposable();

        await loadLanguageQuestion();

        expect(languageQuestion.value).not.toBeNull();
    })
})