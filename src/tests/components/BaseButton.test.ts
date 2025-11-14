import { mount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'
import BaseButton from '../../components/BaseButton.vue'

describe('BaseButton', () => {

    const createWrapper = (props = {}) => {
        return mount(BaseButton, {
            props: {
                title: 'Test title',
                ...props
            }
        })
    }

    test('button emits click', () => {
        const wrapper = createWrapper();
        wrapper.find('button').trigger('click');

        expect(wrapper.emitted('click')).toBeTruthy();
    })

    test('disabled button has disabled class', () => {
        const wrapper = createWrapper({ disabled: true });
        expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    })
})