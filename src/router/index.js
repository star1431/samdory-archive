
/* 로컬용 */
// import { createRouter, createWebHistory } from 'vue-router'
// const router = createRouter({
// 	history: createWebHistory(),
// 	scrollBehavior() {
// 		return { top: 0 }
// 	},
// 	routes,
// })

/* 서버용 */
import { createRouter, createWebHashHistory } from 'vue-router'
/* 스토리지 */
import store from '@/store/store'

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: '홈',
            layout: 'LayoutDefault',
            side: false,
            requiresAuth: false
        },
        components: Object.assign({
			content: () => import(/* webpackChunkName: 'm' */ "@/views/Home.vue"),
		}),
    },
    {
        path: '/company-info',
        name: 'CompanyInfo',
        meta: {
            title: '숙지사항',
            layout: 'LayoutDefault',
            side: true,
            requiresAuth: true,
            roles: ['employee'] 
        },
        components: Object.assign({
			content: () => import(/* webpackChunkName: 'm' */ "@/views/CompanyInfo.vue"),
		}),
    },
    {
        path: '/training',
        name: 'Training',
        meta: {
            title: '트레이닝',
            layout: 'LayoutDefault',
            side: true,
            requiresAuth: true,
            roles: ['employee'] 
        },
        components: Object.assign({
			content: () => import(/* webpackChunkName: 'm' */ "@/views/Training.vue"),
		}),
    },
    {
        path: '/work-rules',
        name: 'WorkRules',
        meta: {
            title: '작업규칙',
            layout: 'LayoutDefault',
            side: true,
            requiresAuth: true,
            roles: ['employee', 'freelancer'] 
        },
        components: Object.assign({
			content: () => import(/* webpackChunkName: 'm' */ "@/views/WorkRules.vue"),
		}),
    },
    {
        path: '/resources',
        name: 'Resources',
        meta: {
            title: '자료모음',
            layout: 'LayoutDefault',
            side: false,
            requiresAuth: false
        },
        components: Object.assign({
			content: () => import(/* webpackChunkName: 'm' */ "@/views/Resources.vue"),
		}),
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '로그인',
            layout: 'LayoutDefault',
            side: false,
            requiresAuth: false
        },
        components: Object.assign({
			content: () => import(/* webpackChunkName: 'm' */ "@/views/Login.vue"),
		}),
    },
]

/* 서버용 */
const router = createRouter({
    history: createWebHashHistory('/samdory-archive/'),
    mode: 'hash',
	scrollBehavior() {
		return { top: 0 }
	},
	routes,
})

router.beforeEach(async (to, from, next) => {
    console.log('상태:', store.getters.isAuthenticated) // 상태 확인
    console.log('유저:', store.getters.user) // 유저
    if(store.getters.user) console.log('권한:', store.getters.user.role) // 권한
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isAuthenticated) {
            console.log('[메인이동] : 어떤url로 들어오든 로그인 안했음')
            return next({ name: 'Home' })
        } else {
            const userRole = store.getters.user ? store.getters.user.role : null // 사용자 역할 가져오기
            const requiredRoles = to.meta.roles
            if (requiredRoles && (!userRole || !requiredRoles.includes(userRole))) {
                console.log('[메인이동] : 로그인했지만 접근권한 없음')
                return next({ name: 'Home' })
            } else {
                return next()
            }
        }
    } else {
        return next()
    }
})

export default router

