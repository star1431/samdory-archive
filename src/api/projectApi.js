// import axios from 'axios'
import projects from '@/mockup/projectData.json'

// 프로젝트 데이터를 가져오는 함수
export const fetchProjects = async () => {
    try {
        // const response = await axios.get('@/mockup/projectData.json')
        // return response.data
        return projects
    } catch (error) {
        console.error('[api.js || fetchProjects 에러] :', error)
        throw error
    }
}