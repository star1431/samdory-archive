// import axios from 'axios'
import users from '@/mockup/users.json'

// 사용자 데이터를 가져오는 함수
export const fetchUsers = async () => {
    try {
        // const response = await axios.get('@/mockup/users.json')
        // return response.data
        return users
    } catch (error) {
        console.error('[userApi.js || fetchUsers 에러] :', error)
        throw error
    }
}