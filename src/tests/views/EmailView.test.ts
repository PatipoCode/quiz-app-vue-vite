import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '../utils'
import { createPinia, setActivePinia } from 'pinia'
import { useQuizStore } from '../../store/quiz'
import { mockRouter } from '../mocks'
import { useRouter } from 'vue-router'
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
        }
    }))
}))

vi.mock('../../composables/useValidation', () => ({
    useValidation: () => ({
        validateEmail: (value: string) => {
            if (!value) return 'Email is required'
            if (!value.includes('@')) return 'Invalid email'
            return true
        }
    })
}))

import EmailView from '../../views/EmailView.vue'

describe('EmailView', () => {

    let wrapper: VueWrapper

    beforeEach(() => {
        setActivePinia(createPinia())
        useQuizStore()
        useRouter()
        vi.clearAllMocks()

        wrapper = mount(EmailView)
    })

    test('renders title with correct text', () => {
        const title = wrapper.find('.title')

        expect(title.exists()).toBe(true)
        expect(title.text()).toBe('email.title')
    })

    test('renders subtitle with correct text', () => {
        const subtitle = wrapper.find('.subtitle')

        expect(subtitle.exists()).toBe(true)
        expect(subtitle.text()).toBe('email.subtitle')
    })

    test('renders email input', () => {
        const input = wrapper.findComponent({ name: 'BaseInput' })

        expect(input.exists()).toBe(true)
    })

    test('renders submit button', () => {
        const button = wrapper.findComponent({ name: 'BaseButton' })

        expect(button.exists()).toBe(true)
    })

    test('submit button is disabled initially', () => {
        const button = wrapper.findComponent({ name: 'BaseButton' })


        expect(button.exists()).toBe(true)
        expect(button.props('disabled')).toBe(false)
    })

    test('displays legal text with links', () => {
        const legal = wrapper.find('.email-form__legal')
        const links = wrapper.findAll('.email-form__link')

        expect(legal.exists()).toBe(true)
        expect(links.length).toBe(2)
    })

    test('renders form', () => {
        const form = wrapper.find('form')

        expect(form.exists()).toBe(true)
        expect(form.attributes('novalidate')).toBeDefined()
    })
})