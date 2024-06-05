let routes = [
	{
		path: '/training',
		redirect: '/training/project',
		meta: {
            title: '트레이닝',
            roles: ['admin', 'employee']
		},
		children: [
            {
                path: 'project',
                name: 'TrainingProject',
                meta: {
                    title: '프로젝트 개념',
                    layout: 'LayoutDefault',
                    side: true,
                    requiresAuth: true,
                    roles: ['admin', 'employee']
                },
                components: Object.assign({
                    content: () => import(/* webpackChunkName: "tri" */ '@/views/tri/TrainingProject.vue'),
                }),
            },
            {
                path: 'codeEditor',
                name: 'TrainingCode',
                meta: {
                    title: '코드 에디터',
                    layout: 'LayoutDefault',
                    side: true,
                    requiresAuth: true,
                    roles: ['admin', 'employee']
                },
                components: Object.assign({
                    content: () => import(/* webpackChunkName: "tri" */ '@/views/tri/TrainingCode.vue'),
                }),
            },
            {
                path: 'design',
                name: 'TrainingDesign',
                meta: {
                    title: '디자인 플랫폼',
                    layout: 'LayoutDefault',
                    side: true,
                    requiresAuth: true,
                    roles: ['admin', 'employee']
                },
                components: Object.assign({
                    content: () => import(/* webpackChunkName: "tri" */ '@/views/tri/TrainingDesign.vue'),
                }),
            },
        ]
	},
]

export default routes

