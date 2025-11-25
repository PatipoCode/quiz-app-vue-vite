import { describe, test, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import LanguageView from '../../views/LanguageView.vue';
import ScreenLayout from '../../components/ScreenLayout.vue';
import ProgressBar from '../../components/ProgressBar.vue';
import QuestionOption from '../../components/QuestionOption.vue';

vi.mock('vue-i18n', () => ({
    useI18n: () => ({
        t: (key: string) => key,
    }),
}));

vi.mock('../../store/quiz', () => ({
    useQuizStore: () => ({
        language: 'en',
        questions: [],
        current: 0,
        answers: {},
        loading: false,
        error: '',
        email: '',
        total: 5,
        currentQuestion: null,
    }),
}));

vi.mock('../../composables/useLanguageStep', () => ({
    useLanguageStep: () => ({
        languageQuestion: {
            titleKey: 'question.language.title',
            subtitleKey: 'question.language.subtitle',
        },
        languageOptions: [
            { id: '1', labelKey: 'answers.english' },
            { id: '2', labelKey: 'answers.french' },
            { id: '3', labelKey: 'answers.german' },
            { id: '4', labelKey: 'answers.spanish' },
        ],
        selectedLanguage: [],
        loadLanguageQuestion: vi.fn(),
        selectLanguage: vi.fn(),
    }),
}));

vi.mock('../../composables/useQuizProgress', () => ({
    useQuizProgress: () => ({
        progressTotal: 5,
    }),
}));

describe('LanguageStep.vue', () => {

    let wrapper: VueWrapper

    beforeEach(() => {
        wrapper = mount(LanguageView);
    });

    test('renders all child components', () => {
        expect(wrapper.findComponent(ScreenLayout).exists()).toBe(true);
        expect(wrapper.findComponent(ProgressBar).exists()).toBe(true);
        expect(wrapper.findComponent(QuestionOption).exists()).toBe(true);
    });

    test('passes props to ProgressBar', () => {
        const progressBar = wrapper.findComponent(ProgressBar);

        expect(progressBar.props('current')).toBe(0);
        expect(progressBar.props('total')).toBe(5);
        expect(progressBar.props('rounded')).toBe(true);
    });

    test('passes props to QuestionOption', () => {
        const questionOption = wrapper.findComponent(QuestionOption);

        expect(questionOption.props('type')).toBe('single');
        expect(questionOption.props('options')).toHaveLength(4);
        expect(questionOption.props('selectedIds')).toEqual([]);
    });

    test('displays title', () => {
        const title = wrapper.find('.title');

        expect(title.exists()).toBe(true);
        expect(title.text()).toBe('question.language.title');
    });

    test('displays subtitle', () => {
        const subtitle = wrapper.find('.subtitle');

        expect(subtitle.exists()).toBe(true);
        expect(subtitle.text()).toBe('question.language.subtitle');
    });
});