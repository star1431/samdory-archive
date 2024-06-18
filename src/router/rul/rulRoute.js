let routes = [
	{
		path: '/rules',
		redirect: '/rules/default',
		meta: {
            title: '작업 가이드',
            // roles: ['employee', 'freelancer']
		},
		children: [
            {
                path: 'default',
                name: 'RuleDefault',
                meta: {
                    title: '기본 규칙',
                    layout: 'LayoutDefault',
                    side: true,
                    requiresAuth: true,
                    // roles: ['employee', 'freelancer']
                },
                components: Object.assign({
                    content: () => import(/* webpackChunkName: "rul" */ '@/views/rul/RuleDefault.vue'),
                }),
            },
            {
                path: 'code',
                name: 'RuleCode',
                meta: {
                    title: '코드 규칙',
                    layout: 'LayoutDefault',
                    side: true,
                    requiresAuth: true,
                    // roles: ['employee', 'freelancer']
                },
                components: Object.assign({
                    content: () => import(/* webpackChunkName: "rul" */ '@/views/rul/RuleCode.vue'),
                }),
            },
            {
                path: 'naming',
                name: 'RuleName',
                meta: {
                    title: '네임 규칙',
                    layout: 'LayoutDefault',
                    side: true,
                    requiresAuth: true,
                    // roles: ['employee', 'freelancer']
                },
                components: Object.assign({
                    content: () => import(/* webpackChunkName: "rul" */ '@/views/rul/RuleName.vue'),
                }),
            },
            {
                path: 'Ally',
                name: 'RuleAlly',
                meta: {
                    title: '웹 접근성 가이드',
                    layout: 'LayoutDefault',
                    side: true,
                    requiresAuth: true,
                    // roles: ['employee', 'freelancer']
                },
                components: Object.assign({
                    content: () => import(/* webpackChunkName: "rul" */ '@/views/rul/RuleAlly.vue'),
                }),
            },
            {
                path: 'WAI-ARIA',
                name: 'RuleAria',
                meta: {
                    title: 'WAI-ARIA 가이드',
                    layout: 'LayoutDefault',
                    side: true,
                    requiresAuth: true,
                    // roles: ['employee', 'freelancer']
                },
                components: Object.assign({
                    content: () => import(/* webpackChunkName: "rul" */ '@/views/rul/RuleAria.vue'),
                }),
            },
        ]
	},
]

export default routes

