let routes = [
    {
        path: '/company',
        redirect: '/company/info',
        meta: {
            title: '사내정보',
            roles: ['admin', 'employee']
        },
        children: [
            {
                path: 'info',
                name: 'CompanyInfo',
                meta: {
                    title: '안내사항',
                    layout: 'LayoutDefault',
                    side: true,
                    requiresAuth: true,
                    roles: ['admin', 'employee']
                },
                components: Object.assign({
                    content: () => import(/* webpackChunkName: "inf" */ '@/views/inf/CompanyInfo.vue'),
                }),
            },
            {
                path: 'file-station',
                name: 'CompanyFile',
                meta: {
                    title: '파일서버',
                    layout: 'LayoutDefault',
                    side: true,
                    requiresAuth: true,
                    roles: ['admin', 'employee']
                },
                components: Object.assign({
                    content: () => import(/* webpackChunkName: "inf" */ '@/views/inf/CompanyFile.vue'),
                }),
            },
            {
                path: 'project',
                name: 'CompanyProject',
                meta: {
                    title: '프로젝트 통계',
                    layout: 'LayoutDefault',
                    side: true,
                    requiresAuth: true,
                    roles: ['admin', 'employee']
                },
                components: Object.assign({
                    content: () => import(/* webpackChunkName: "inf" */ '@/views/inf/CompanyProject.vue'),
                }),
            },
            // {
            //     path: 'mdSample',
            //     name: 'mdSample',
            //     meta: {
            //         title: 'post.md 샘플',
            //         layout: 'LayoutDefault',
            //         side: true,
            //         requiresAuth: true,
            //         roles: ['admin', 'employee']
            //     },
            //     components: Object.assign({
            //         content: () => import(/* webpackChunkName: "inf" */ '@/views/inf/mdSample.vue'),
            //     }),
            // },
        ]
    },
]
export default routes
