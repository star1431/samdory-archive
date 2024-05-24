import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: '홈',
            layout: 'layoutDefault'
        },
        components: Object.assign({
			content: () =>
			import(/* webpackChunkName: 'm' */ "@/views/Home.vue"),
		}),
    },
    {
        path: '/company-info',
        name: 'CompanyInfo',
        meta: {
            title: '회사숙지',
            layout: 'layoutDefault'
        },
        components: Object.assign({
			content: () =>
			import(/* webpackChunkName: 'm' */ "@/views/CompanyInfo.vue"),
		}),
    },
    {
        path: '/training',
        name: 'Training',
        meta: {
            title: '트레이닝',
            layout: 'layoutDefault'
        },
        components: Object.assign({
			content: () =>
			import(/* webpackChunkName: 'm' */ "@/views/Training.vue"),
		}),
    },
    {
        path: '/work-rules',
        name: 'WorkRules',
        meta: {
            title: '작업규칙',
            layout: 'layoutDefault'
        },
        components: Object.assign({
			content: () =>
			import(/* webpackChunkName: 'm' */ "@/views/WorkRules.vue"),
		}),
    },
    {
        path: '/resources',
        name: 'Resources',
        meta: {
            title: '자료모음',
            layout: 'layoutDefault'
        },
        components: Object.assign({
			content: () =>
			import(/* webpackChunkName: 'm' */ "@/views/Resources.vue"),
		}),
    },
]

const router = createRouter({
	history: createWebHistory(),
	scrollBehavior() {
		return { top: 0 }
	},
	routes,
})

router.beforeEach(async (to, _from, next) => {
	next()
})

export default router