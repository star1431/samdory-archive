let routes = [
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
            content: () => import(/* webpackChunkName: "res" */ '@/views/res/Resources.vue'),
        }),
    },
]

export default routes
