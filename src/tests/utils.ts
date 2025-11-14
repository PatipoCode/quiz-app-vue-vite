import { mount as vueMount } from '@vue/test-utils'
import i18n from '../i18n/index'

export function mount(component: any, options: any = {}) {
    return vueMount(component, {
        global: {
            plugins: [i18n],
            ...options.global
        },
        ...options
    })
}