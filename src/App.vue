<template>
    <Transition name="slide-fade">
        <component :is="layoutComponent">
            <router-view />
        </component>
    </Transition>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch, onBeforeUnmount, provide } from 'vue'
import { useRoute } from 'vue-router'
import LayoutDefault from '@/components/layout/LayoutDefault.vue'
import LayoutLogin from '@/components/layout/LayoutLogin.vue'

// 컴포넌트 목록
const layoutComponents = {
    LayoutDefault,
    LayoutLogin
}
const route = useRoute()
const gitHubURL = window.location.href.includes('github.io')

// 현재 라우트의 메타에서 레이아웃 정보를 가져옴
const layoutComponent = computed(() => {
    const matched = route.matched.find(m => m.meta && m.meta.layout)
    if (matched && matched.meta.layout) {
        const layoutName = matched.meta.layout
        return layoutComponents[layoutName] || 'LayoutDefault'
    }
    return 'LayoutDefault'
})

/** 반응형 작업 - start  ***************************************************************** */
// 이전 뷰트 너비 
let preView = window.innerWidth

// 뷰포트 크기에 따라 전달할 불리언 값
const viewportNotPC = ref(window.innerWidth <= 999)

// 초기 및 리사이즈 감지
/**
 *  현재 1000이상일떄 lnb-control은 사이드바 축소고..
 *  1000미만 lnb-control은 사이드바 보이는 괴랄적인 형태임.
 */
const handleResize = () => {
    const _app = document.querySelector('#app')
    const nextView = window.innerWidth

    // 이전너비 999 초과 & 현재너비 999 이하 & 클래스 있는 경우
    if (preView > 999 && nextView <= 999 && _app.classList.contains('lnb-control')) {
        _app.classList.remove('lnb-control')
    } else if (preView <= 999 && nextView > 999 && _app.classList.contains('lnb-control'))  {
        // 이전너비 999 미만 & 현재너비 999 초과 & 클래스 있는 경우
        _app.classList.remove('lnb-control')
    }
    viewportNotPC.value = nextView <= 999
    preView = nextView
}

// 그냥 여기서 lnb-control 유무 전달할 불리언 값
const classWatch = ref(null)

// 클래스 감지
const APPclassWatch = () => {
    const _app = document.querySelector('#app')
    if (!_app) return
    const observer = new MutationObserver(() => {
        classWatch.value = _app.classList.contains('lnb-control')
    })
    observer.observe(_app, { attributes: true, attributeFilter: ['class'] })
    // 초기 상태 설정
    classWatch.value = _app.classList.contains('lnb-control')

    // 컴포넌트가 언마운트될 때 observer 해제
    onBeforeUnmount(() => {
        observer.disconnect()
    })
}

// 마운트
onMounted(() => {
    window.addEventListener('resize', handleResize)
    // 이벤트 아니여도 실행
    handleResize()
    APPclassWatch()
})

// 컴포넌트가 언마운트될 때 이벤트 리스너 제거
onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
})

// watch(viewportNotPC, (newValue) => {
//     console.log('[App.vue] viewportNotPC:', newValue)
// })
// watch(classWatch, (newValue) => {
//     console.log('[App.vue] classWatch:', newValue)
// })
/** 반응형 작업 - end  ***************************************************************** */

// provide로 App.vue 내 돌아가는 모든 하위컴포넌트에 전달
provide('viewportNotPC', viewportNotPC)
provide('classWatch', classWatch)
provide('gitHubURL', gitHubURL)  // 개인포폴용 표시

</script>

<style scoped>
</style>
