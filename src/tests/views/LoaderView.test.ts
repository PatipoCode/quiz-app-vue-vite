import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '../utils'
import { mockRouter } from '../mocks'
import { useRouter } from 'vue-router'

mockRouter()

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

import LoaderView from '../../views/LoaderView.vue'
import type { VueWrapper } from '@vue/test-utils'

describe('LoaderView', () => {
    let wrapper: VueWrapper
    let router: any

    beforeEach(() => {
        router = useRouter()
        vi.clearAllMocks()
        wrapper = mount(LoaderView)
    })

    test('renders loader component', () => {
        expect(wrapper.find('.loader').exists()).toBe(true)
    })

    test('displays SVG circle', () => {
        const svg = wrapper.find('svg')
        expect(svg.exists()).toBe(true)
    })

    test('displays percentage text', () => {
        const text = wrapper.find('.loader__percent')
        expect(text.exists()).toBe(true)
    })

    test('displays hint message', () => {
        const hint = wrapper.find('.hint')
        expect(hint.exists()).toBe(true)
        expect(hint.text()).toBe('loader.hint')
    })

    test('initial value is 0', () => {
        const percentText = wrapper.find('.loader__percent')
        expect(percentText.text()).toBe('0%')
    })
})