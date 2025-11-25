import { vi } from 'vitest'

export const mockRouter = () => {
    vi.mock('vue-router', () => ({
        useRouter: () => ({
            push: vi.fn(),
            replace: vi.fn() 
        })
    }))
}