import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '../utils'
import { createPinia, setActivePinia } from 'pinia'
import { useQuizStore } from '../../store/quiz'
import { mockRouter } from '../mocks'
import { useRouter } from 'vue-router'
import { nextTick } from 'vue'
import type { VueWrapper } from '@vue/test-utils'

mockRouter()

vi.mock('vue-i18n', () => ({
    useI18n: vi.fn(() => ({
        t: (key: string) => key
    })),
    createI18n: vi.fn((config) => ({
        global: {
            t: (key: string) => key,
            locale: config?.locale || 'en'
        },
        install: () => { }
    }))
}))

vi.mock('../../assets/icons/download.svg', () => ({
    default: {
        name: 'DownloadIcon',
        template: '<svg />'
    }
}))

vi.mock('../../composables/useExportQuizAnswers', () => ({
    useExportQuizAnswers: () => ({
        downloadAnswersAsCsv: vi.fn()
    })
}))

import FinalView from '../../views/FinalView.vue'

describe('FinalView', () => {
    let wrapper: VueWrapper
    let store: ReturnType<typeof useQuizStore>
    let router: any

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useQuizStore()
        router = useRouter()
        vi.clearAllMocks()

        wrapper = mount(FinalView)
    })

    test('renders title with correct text', () => {
        const title = wrapper.find('.title')

        expect(title.exists()).toBe(true)
        expect(title.text()).toBe('final.title')
    })

    test('renders subtitle with correct text', () => {
        const subtitle = wrapper.find('.subtitle')

        expect(subtitle.exists()).toBe(true)
        expect(subtitle.text()).toBe('final.subtitle')
    })

    test('renders checkmark badge image', () => {
        const badge = wrapper.find('.final-screen__badge')

        expect(badge.exists()).toBe(true)
        expect(badge.attributes('src')).toContain('checkmark-green.png')
    })

    test('renders download button with text', () => {
        const downloadButton = wrapper.find('.final-screen__download')
        const downloadLabel = wrapper.find('.final-screen__download-label')

        expect(downloadButton.exists()).toBe(true)
        expect(downloadLabel.exists()).toBe(true)
        expect(downloadLabel.text()).toBe('final.download')
    })

    test('renders retake button', () => {
        expect(wrapper.findComponent({ name: 'BaseButton' }).exists()).toBe(true)
    })

    test('retake button resets quiz', async () => {
        const retakeSpy = vi.spyOn(store, 'retakeQuiz')
        const retakeButton = wrapper.findComponent({ name: 'BaseButton' })

        await retakeButton.vm.$emit('click')
        await nextTick()

        expect(retakeSpy).toHaveBeenCalled()
    })
})