import { mount } from '../utils'
import { test, expect, describe, vi } from 'vitest'

vi.mock('../../utils/constants', () => ({
    iconUrl: () => '/test-icon.svg',
    GENDER_IMG_BY_LABEL: {
        'gender.female.test': '/test-female.svg',
        'gender.male.test': '/test-male.svg',
        'gender.othe.testr': '/test-other.svg'
    }
}))

import GenderOption from '../../components/GenderOption.vue'

const testOptions = [
    { id: '1', labelKey: 'gender.female.test' },
    { id: '2', labelKey: 'gender.male.test' },
    { id: '3', labelKey: 'gender.other.test' }
]

describe('GenderOption', () => {
    
    const createWrapper = (props = {}) => {
        return mount(GenderOption, {
            props: {
                option: testOptions[0],
                ...props
            }
        })
    }

    test('renders image', () => {
        const wrapper = createWrapper();

        expect(wrapper.find('img').exists()).toBe(true);
        expect(wrapper.find('img').classes()).toContain('options__tile-emoji');
    })

    test('renders label text', () => {
        const wrapper = createWrapper({ option: testOptions[1] });

        const label = wrapper.find('.options__tile-label');
        expect(label.exists()).toBe(true);
    })
})