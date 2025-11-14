import { describe, test, expect, beforeEach } from 'vitest'
import { mount } from '../utils'
import { defineComponent } from 'vue'
import { useValidation } from '../../composables/useValidation'

describe('useValidation', () => {

    let validation: any

    beforeEach(() => {
        const Component = defineComponent({
            setup() {
                validation = useValidation();
                return {};
            },
            template: '<div></div>'
        })
        mount(Component);
    })

    test('empty email returns error', () => {
        expect(validation.validateEmail('')).toBe('Email is required');
    })

    test('correct email returns true', () => {
        expect(validation.validateEmail('test@example.com')).toBe(true);
    })

    test('invalid email without @', () => {
        expect(validation.validateEmail('testexample.com')).toBe('Please provide a valid email address');
    })

    test('email starting with @', () => {
        expect(validation.validateEmail('@example.com')).toBe('Please provide a valid email address');
    })

    test('invalid email without domain', () => {
        expect(validation.validateEmail('test@')).toBe('Please provide a valid email address');
    })

    test('email with spaces inside', () => {
        expect(validation.validateEmail('test @example.com')).toBe('Please provide a valid email address');
    })
})