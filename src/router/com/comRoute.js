let routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: '홈',
            layout: 'LayoutDefault',
            side: false,
            requiresAuth: true
        },
        components: Object.assign({
            content: () => import(/* webpackChunkName: "com" */ '@/views/com/Home.vue'),
        }),
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '로그인',
            layout: 'LayoutLogin',
            side: false,
            requiresAuth: false
        },
        components: Object.assign({
            content: () => import(/* webpackChunkName: "com" */ '@/views/com/Login.vue'),
        }),
    },
]

export default routes
