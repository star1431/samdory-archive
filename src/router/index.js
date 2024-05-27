
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
/* 페이지 */
import com from '@/router/com/comRoute'
import inf from '@/router/inf/infRoute'
import tri from '@/router/tri/triRoute'
import rul from '@/router/rul/rulRoute'
import res from '@/router/res/resRoute'
/* 스토리지 */
import store from '@/store/store'

let routes = []
//1
routes = routes.concat(com, inf, tri, rul, res)

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

    console.log('Navigating to:', to)
    console.log('Components:', to.matched.map(record => record.components))

    // if (to.matched.some(record => record.meta.requiresAuth)) {
    //     if (!store.getters.isAuthenticated) {
    //         console.log('[메인이동] : 어떤url로 들어오든 로그인 안했음')
    //         return next({ name: 'Home' })
    //     } else {
    //         const userRole = store.getters.user ? store.getters.user.role : null // 사용자 역할 가져오기
    //         const requiredRoles = to.meta.roles
    //         if (requiredRoles && (!userRole || !requiredRoles.includes(userRole))) {
    //             console.log('[메인이동] : 로그인했지만 접근권한 없음')
    //             return next({ name: 'Home' })
    //         } else {
    //             return next()
    //         }
    //     }
    // } else {
    //     return next()
    // }
    next()
})

export default router

