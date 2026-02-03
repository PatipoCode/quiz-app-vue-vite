import { vi } from 'vitest'

const routerInstance = {
    push: vi.fn(),
    replace: vi.fn()
}

export const mockRouter = () => {
    vi.mock('vue-router', () => ({
        useRouter: () => routerInstance
    }))
}