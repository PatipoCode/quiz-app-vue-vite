import { mount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'
import BaseInput from '../../components/BaseInput.vue'

describe('BaseInput', () => {

    const createWrapper = (props = {}) => {
        return mount(BaseInput, {
            props: {
                modelValue: '',
                ...props
            }
        })
    }

    test('input emits update when typing text', () => {
        const wrapper = createWrapper();
        const input = wrapper.find('input');
        input.setValue('new text');

        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new text']);
    })

    test('input is disabled when prop `disabled` is true', () => {
        const wrapper = createWrapper({ disabled: true });

        const input = wrapper.find('input');
        expect(input.attributes('disabled')).toBeDefined();
    })
})