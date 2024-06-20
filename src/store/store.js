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
                    commit('setAuth', { isAuthenticated: true, user: { name: user.username, nick: user.nick, role: user.role, img: user.profileImg } })
                    resolve()
                } else {
                    reject('잘못된 아이디 또는 비밀번호 입니다.')
                }
            });
        },
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
