import { createRouter, createWebHashHistory } from 'vue-router'
import { useQuizStore } from '../store/quiz'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', name: 'language', component: () => import('../views/LanguageView.vue') },
        { path: '/quiz', name: 'quiz', component: () => import('../views/QuizView.vue') },
        { path: '/loader', name: 'loader', component: () => import('../views/LoaderView.vue') },
        { path: '/email', name: 'email', component: () => import('../views/EmailView.vue') },
        { path: '/final', name: 'final', component: () => import('../views/FinalView.vue') },
        { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
    scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
})

router.beforeEach(async (to) => {
    const quiz = useQuizStore()
    quiz.initFromStorage()

    if (to.name !== 'language' && !quiz.language) return { name: 'language' }

    if (to.name === 'final' && !quiz.email.trim()) {
        return { name: 'email' }
    }

    return true
})

export default router
