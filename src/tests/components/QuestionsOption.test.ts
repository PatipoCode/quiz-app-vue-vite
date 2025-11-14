import { mount } from '../utils'
import { test, expect, describe } from 'vitest'
import QuestionOption from '../../components/QuestionOption.vue'
import { MULTI_SELECT_LIMIT } from '../../utils/constants'

const testOptions = [
    { id: '1', labelKey: 'test1' },
    { id: '2', labelKey: 'test2' },
    { id: '3', labelKey: 'test3' },
    { id: '4', labelKey: 'test4' }
]

describe('QuestionOption', () => {
    
    const createWrapper = (props = {}) => {
        return mount(QuestionOption, {
            props: {
                options: testOptions,
                ...props
            }
        })
    }

    test(`selected button has class 'options__btn--selected'`, () => {
        const wrapper = createWrapper({ type: 'single', selectedIds: ['1'] });
        const buttons = wrapper.findAll('button');

        expect(buttons[0].classes()).toContain('options__btn--selected');
    })

    test(`possible to select up to ${MULTI_SELECT_LIMIT} options maximum`, () => {
        const wrapper = createWrapper({
            type: 'multiple',
            selectedIds: ['1', '2', '4']
        });
        const buttons = wrapper.findAll('button');

        expect(buttons[0].classes()).toContain('options__btn--selected');
        expect(buttons[1].classes()).toContain('options__btn--selected');
        expect(buttons[2].classes()).not.toContain('options__btn--selected');
        expect(buttons[3].classes()).toContain('options__btn--selected');
    })

    test(`possible to select only one option`, () => {
        const wrapper = createWrapper({
            type: 'single',
            selectedIds: ['1']
        });
        const buttons = wrapper.findAll('button');

        expect(buttons[0].classes()).toContain('options__btn--selected');
        expect(buttons[1].classes()).not.toContain('options__btn--selected');
        expect(buttons[2].classes()).not.toContain('options__btn--selected');
        expect(buttons[3].classes()).not.toContain('options__btn--selected');
    })

    test(`button emits select on click`, async () => {
        const wrapper = createWrapper();
        const buttons = wrapper.findAll('button');
        await buttons[2].trigger('click');

        expect(wrapper.emitted('select')).toBeTruthy();
        expect(wrapper.emitted('select')?.[0]).toEqual(['3']);
    })
})
