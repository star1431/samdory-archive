// import axios from 'axios'
import users from '@/mockup/usersData.json'

// 사용자 데이터를 가져오는 함수
export const fetchUsers = async () => {
    try {
        // const response = await axios.get('@/mockup/usersData.json')
        // return response.data
        return users
    } catch (error) {
        console.error('[userApi.js || fetchUsers 에러] :', error)
        throw error
    }
}