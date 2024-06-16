<template>
    <div :class="['container', pageClass]">
        <div class="container-content">
            <PageTopSlot :title="title" :pagePath="pageClass" />

            <div class="section-area row">
                <div class="inner-col col-1 type-bg">
                    <div class="home-card-info">
                        <div class="text-box">
                            <p class="title">SD Archive 에 오신 것을 환영합니다 !</p>
                            <p class="text">메뉴를 통해서 최신 정보와 자료 등 확인해주세요.</p>
                        </div>
                        <div class="slot-right">
                            <LottieLoader :lottieData="lottieJson" :startFrame="0" :endFrame="110"/>
                        </div>
                    </div>
                </div>
                
                <div class="inner-col col-1-3 type-bg">
                    <div class="home-card-small samdory">
                        <a href="http://samdory.synology.me/samdory/#/" target="_blank" class="text-box type-link">
                            <p class="title">홈페이지 리뉴얼</p>
                            <p class="text underline">베타버전 미리보기</p>
                        </a>
                    </div>
                </div>
                <div class="inner-col col-1-3 type-bg">
                    <div class="home-card-small ftp">
                        <a href="http://samdory.synology.me:5000/" target="_blank" class="text-box type-link">
                            <p class="title">FTP 사용량</p>
                            <p class="text"><span class="acc">0.18TB</span> / 2.68TB</p>
                        </a>
                    </div>
                </div>
                <div class="inner-col col-1-3 type-bg">
                    <div class="home-card-small project">
                        <div class="text-box">
                            <p class="title">Project 수행</p>
                            <p class="text"><span class="acc">{{totalData.length}}</span> 건</p>
                        </div>
                    </div>
                </div>
                <div class="inner-col col-1-2 chart">
                    <ProjectChart :showEnter="true" />
                </div>
                <div class="inner-col col-1-2 chart">
                    <ProjectChart :showStack="true" />
                </div>
                
                <div class="inner-col col-1 chart">
                    <ProjectChart :showYear="true" />
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
// import { useStore } from 'vuex'
import PageTopSlot from '@/components/PageTopSlot.vue'
import LottieLoader from '@/components/LottieLoader.vue'
import lottieJson from '@/assets/js/lottie/lottieCom.json'
import ProjectChart from '@/components/ProjectChart.vue'
import { fetchProjects } from '@/api/projectApi.js'

const title = ref('홈 화면')
const pageClass = ref(['com', 'Home'])


// 유저프로필넣으려다가 lnb도 있으니 제거
// const store = useStore()
// const user = computed(() => store.state.user)
// const setUserImg = computed(() => {
//     if(user?.value?.img) {
//         return require('@/assets/images/profile/' + user?.value?.img)
//     } else {
//         return require('@/assets/images/profile/' + 'img_user_profile_p.png')
//     }
// })
// const setUserPos = computed(() => {
//     if(user?.value?.pos) {
//         if(user?.value?.pos === 'pub') return 'Web Publisher';
//         if(user?.value?.pos === 'design') return 'Web Designer';
//         else {
//             return user?.value?.pos
//         }
//     } else {
//         return 'Undefined'
//     }
// })
// const setUserRole = computed(() => {
//     if(user?.value?.role) {
//         if(user?.value?.role === 'employee') return '정직원';
//         if(user?.value?.role === 'freelancer') return '파트너';
//         else {
//             return user?.value?.role
//         }
//     } else {
//         return 'Null'
//     }
// })

const totalData = reactive([])
onMounted(async () => {
    try {
        const projects = await fetchProjects()
        totalData.splice(0, totalData.length, ...projects)
    } catch (error) {
        console.error('[Home.vue || fetchProjects 에러] :', error)
    }
})


computed(() => {

})
onMounted(() => {

})
</script>

<style scoped>
</style>