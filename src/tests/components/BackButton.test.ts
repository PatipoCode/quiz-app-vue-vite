import { describe, test, vi, expect } from 'vitest'
import { mount } from '../utils'
import BackButton from '../../components/BackButton.vue'


vi.mock('../../assets/icons/back-icon.svg', () => ({
    default: {
        name: 'TestBackIcon',
        template: '<svg></svg>'
    }
})) 

describe('BackButton', () => {
    test('renders icon', () => {
        const wrapper = mount(BackButton);

        expect(wrapper.find('svg').exists()).toBe(true);
    })
})