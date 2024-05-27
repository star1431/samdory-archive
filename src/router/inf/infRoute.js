let routes = [
    {
        path: '/company',
        redirect: '/company/info',
        meta: {
            title: '사내정보',
            roles: ['employee']
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
                    roles: ['employee']
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
                    roles: ['employee']
                },
                components: Object.assign({
                    content: () => import(/* webpackChunkName: "inf" */ '@/views/inf/CompanyFile.vue'),
                }),
            },
        ]
    },
]
export default routes
