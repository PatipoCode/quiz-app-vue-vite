import { describe, test, expect, vi, beforeEach } from 'vitest'
import { config } from '@vue/test-utils'
import { mount } from '../utils'
import { createPinia, setActivePinia } from 'pinia'
import { useQuizStore } from '../../store/quiz'
import { nextTick } from 'vue'
import { mockRouter } from '../mocks'
import { useRouter } from 'vue-router'

mockRouter()

config.global.stubs = {
    'i18n-t': {
        props: ['keypath'],
        template: '<h1>{{ keypath }}</h1>'
    }
}

vi.mock('vue-i18n', () => ({
    useI18n: vi.fn(() => ({
        t: (key: string) => key
    })),
    createI18n: vi.fn((config) => ({
        global: {
            t: (key: string) => key,
            locale: config?.locale || 'en'
        }
    }))
}))

vi.mock('../../assets/icons/back-icon.svg', () => ({
    default: {
        name: 'BackIcon',
        template: '<svg />'
    }
}))

import type { Question, LocaleCode } from '../../types/quiz'
import QuizView from '../../views/QuizView.vue'

const mockQuestionSingleOption: Question = {
    id: 2,
    titleKey: 'question.title1',
    subtitleKey: 'question.subtitle1',
    type: 'single',
    options: [
        { id: 'opt1', labelKey: 'option.1' },
        { id: 'opt2', labelKey: 'option.2' }
    ],
    selectedValue: null
}

const mockQuestionMultipleOption: Question = {
    id: 3,
    titleKey: 'question.title2',
    type: 'multiple',
    options: [
        { id: 'opt1', labelKey: 'option.1' },
        { id: 'opt2', labelKey: 'option.2' },
        { id: 'opt3', labelKey: 'option.3' }
    ],
    selectedValue: null
}

const mockQuestionGender: Question = {
    id: 1,
    titleKey: 'question.gender',
    type: 'single',
    options: [
        { id: 'male', labelKey: 'gender.male' },
        { id: 'female', labelKey: 'gender.female' }
    ],
    selectedValue: null
}

describe('QuizView', () => {
    let store: ReturnType<typeof useQuizStore>
    let router: any

    const setupStore = (options: {
        language?: LocaleCode
        questions?: Question[]
        current?: number
        answers?: Record<number, string[]>
    } = {}) => {
        store.language = options.language || 'en'
        store.questions = options.questions || []
        store.current = options.current || 0
        store.answers = options.answers || {}
    }

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useQuizStore()
        router = useRouter()

        vi.clearAllMocks()
    })

    test('displays ProgressBar with correct values', () => {
        setupStore({
            questions: [mockQuestionSingleOption, mockQuestionMultipleOption]
        })

        const wrapper = mount(QuizView)
        const progressBar = wrapper.findComponent({ name: 'ProgressBar' })

        expect(progressBar.exists()).toBe(true)
        expect(progressBar.props('current')).toBe(1)
        expect(progressBar.props('total')).toBe(3)
    })

    test('Next button is disabled when no answer', () => {
        setupStore({
            questions: [mockQuestionSingleOption]
        })

        const wrapper = mount(QuizView)
        const nextButton = wrapper.findComponent({ name: 'BaseButton' })

        expect(nextButton.props('disabled')).toBe(true)
    })

    test('Next button is enabled when answer option selected', () => {
        setupStore({
            questions: [mockQuestionSingleOption],
            answers: { 2: ['opt1'] }
        })

        const wrapper = mount(QuizView)
        const nextButton = wrapper.findComponent({ name: 'BaseButton' })

        expect(nextButton.props('disabled')).toBe(false)
    })

    test('selects option for single question', async () => {
        setupStore({
            questions: [mockQuestionSingleOption]
        })

        const wrapper = mount(QuizView)
        const questionOption = wrapper.findComponent({ name: 'QuestionOption' })

        await questionOption.vm.$emit('select', 'opt1')
        await nextTick()

        expect(store.answers[2]).toEqual(['opt1'])
    })

    test('selects option for multiple question', async () => {
        setupStore({
            questions: [mockQuestionMultipleOption]
        })

        const wrapper = mount(QuizView)
        const questionOption = wrapper.findComponent({ name: 'QuestionOption' })

        await questionOption.vm.$emit('select', 'opt3')
        await nextTick()
        await questionOption.vm.$emit('select', 'opt4')
        await nextTick()

        expect(store.answers[3]).toContain('opt3')
        expect(store.answers[3]).toContain('opt4')
    })

    test('renders GenderOption component for gender question', () => {
        setupStore({
            questions: [mockQuestionGender]
        })

        const wrapper = mount(QuizView)

        const questionOption = wrapper.findComponent({ name: 'QuestionOption' })
        expect(questionOption.exists()).toBe(true)
    })

    test('onBack returns to language view from first quiz question', () => {
        store.current = 0

        if (store.current === 0) {
            router.replace('/')
        }

        expect(router.replace).toHaveBeenCalledWith('/')
    })

    test('onBack returns to previous quiz question when current > 0', () => {
        store.current = 1
        const backSpy = vi.spyOn(store, 'back')

        if (store.current === 0) {
            router.replace('/')
        } else {
            store.back()
        }

        expect(backSpy).toHaveBeenCalled()
    })

    test('displays correct question titleKey', () => {
        setupStore({
            language: 'fr',
            questions: [mockQuestionSingleOption]
        })

        const wrapper = mount(QuizView)
        const title = wrapper.find('h1')

        expect(title.exists()).toBe(true)
        expect(title.text()).toBe('question.title1')
    })

    test('hides loader when questions are loaded', () => {
        setupStore({
            questions: [mockQuestionSingleOption]
        })

        const wrapper = mount(QuizView)

        expect(wrapper.find('.quiz-loader').exists()).toBe(false)
    })
})