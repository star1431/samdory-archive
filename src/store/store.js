import { createStore } from 'vuex'
import { fetchUsers } from '@/api/userApi.js'
import createPersistedState from 'vuex-persistedstate'
// import axios from 'axios'

export default createStore({
    state: {
        isAuthenticated: false,
        user: null,
        users: []
    },
    mutations: {
        setAuth(state, authData) {
            state.isAuthenticated = authData.isAuthenticated
            state.user = authData.user
        },
        setUsers(state, users) {
            state.users = users
        },
        logout(state) {
            state.isAuthenticated = false
            state.user = null
        }
    },
    actions: {
        async fetchUsers({ commit }) {
            try {
                const users = await fetchUsers()
                commit('setUsers', users)
            } catch (error) {
                console.error('[스토리지 index.js || fetchUsers 에러]', error)
            }
        },
        async login({ commit, state, dispatch }, credentials) {
            if (state.users.length === 0) {
                await dispatch('fetchUsers')
            }
            return new Promise((resolve, reject) => {
                const user = state.users.find(u => u.username === credentials.username && u.password === credentials.password)

                if (user) {
                    commit('setAuth', { isAuthenticated: true, user: { name: user.username, nick: user.nick, role: user.role } })
                    resolve()
                } else {
                    reject('잘못된 아이디 또는 비밀번호 입니다.')
                }
            });
        },
        /** 
         * http://samdory.synology.me/ 같은 도메인이지만
         * 파일스테이션은 포트 5000 할당이고, 웹스테이션은 다른포트? 같아보여서 같은 도메인 취급을 못받음.
         * CORS 정책에 걸려서 로그인 안되고, 되게끔할라면 관리자로 DSM 제어판에서 역방향프록시 설정을 해야되는데
         * 관리자 아니라서 패스 && 이 사이트에서 메뉴권한 설정도 빡셀것같아 패스.
         * */
        // async login({ commit }, credentials) {
        //     try {
        //         // 시놀로지 인증 API 호출
        //         const response = await axios.post('http://samdory.synology.me:5000/webapi/auth.cgi', {
        //             api: 'SYNO.API.Auth',
        //             method: 'login',
        //             version: 2,
        //             account: credentials.username,
        //             passwd: credentials.password,
        //             session: 'FileStation',
        //             format: 'sid'
        //         })
                
        //         if (response.data.success) {
        //             commit('setAuth', { isAuthenticated: true, user: { name: credentials.username } })
        //         } else {
        //             throw new Error('잘못된 사용자명 또는 비밀번호입니다.')
        //         }
        //     } catch (error) {
        //         throw new Error('잘못된 사용자명 또는 비밀번호입니다.')
        //     }
        // },
        logout({ commit }) {
            commit('logout')
        }
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated,
        user: state => state.user
    },
    // 새로고침 유지 플러그인
    // info : Vuex 상태를 로컬 스토리지에 저장하고, 이를 통해 페이지를 새로고침하거나 브라우저를 닫았다가 다시 열 때도 상태를 유지
    plugins: [createPersistedState({
        storage: window.sessionStorage, // 세션 스토리지 사용 (창을 아예 끌때 상태 초기화)
    })],

})
