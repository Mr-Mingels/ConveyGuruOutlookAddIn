import { createRouter, createMemoryHistory } from 'vue-router'
import WelcomePage from '../pages/Welcome.vue'
import InboxFoldersPage from '../pages/InboxFolders.vue'
import EmailsPage from '../pages/Emails.vue'

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            component: WelcomePage
        },
        {
            path: '/inbox-folders',
            component: InboxFoldersPage
        },
        {
            path: '/emails',
            component: EmailsPage
        }
    ],
})

export default router
