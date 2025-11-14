import { mount } from '../utils'
import { test, expect, describe } from 'vitest'
import ProgressBar from '../../components/ProgressBar.vue'

describe('ProgressBar', () => {

    const createWrapper = (props = {}) => {
        return mount(ProgressBar, {
            props: {
                current: 0,
                total: 5,
                ...props
            }
        })
    }

    test('shows current step', () => {
        const wrapper = createWrapper();

        expect(wrapper.find('.progress-bar__current').text()).toBe('1');
    })

    test('shows correct percentage works', () => {
        const wrapper = createWrapper({ current: 1 });
        const progressBar = wrapper.find('.progress-bar__fill');

        expect(progressBar.attributes('style')).toContain('width: 40%');
    })
})