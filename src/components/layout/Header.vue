<template>
    <header class="header">
        <div class="view-inner" ui-size="normal">
            <!-- 로고영역 -->
            <h1 class="ui-logo logo-link beta-label">
                <router-link to="/">
                    <img class="logo" src="@/assets/images/common/img_logo_samdory_white.png" alt="SD">
                    <span>Archive</span>
                </router-link>
            </h1>
            <!--// 로고영역 -->

            <!-- 헤더 컨텐츠 etc -->
            <div class="inner-content flex-row-8">
                <div class="slot-left">
                    <button type="button" class="ui-button icon menu" @click="menuClick">
                        <span class="ally-hidden">메뉴</span>
                    </button>
                </div>
                <div class="slot-right">
                    <div class="ui-screen-toogle" v-if="false">
                        <label class="screen-control">
                            <input type="checkbox" v-model="screenCheck">
                            <i class="screen-icon"></i>
                            <span class="ally-hidden">{{ screenCheck ? '확대' : '축소' }}</span>
                        </label>
                    </div>
                    <div class="ui-switch theme">
                        <label class="switch-inner">
                            <input type="checkbox" v-model="switchCheck">
                            <i class="swich-icon"></i>
                            <span class="ally-hidden">[테마변경] 현재 {{ switchCheck ? '어두운 테마' : '밝은 테마' }} 입니다.</span>
                        </label>
                    </div>
                </div>
            </div>
            <!-- 헤더 컨텐츠 etc -->
        </div>
    </header>
    <template v-if="viewportNotPC && classWatch">
        <teleport to="main">
            <div class="dimmed type-inner" tabindex="-1" @click="menuClick"></div>
        </teleport>
    </template>
</template>

<script setup>
import { ref, reactive, watch, onMounted, inject } from 'vue'

// 메뉴버튼 클릭
const menuClick = () => {
    const appEl = document.querySelector('#app')
    if(appEl.classList.contains('lnb-control')) {
        appEl.classList.remove('lnb-control')
    } else {
        appEl.classList.add('lnb-control')
    }
}
// 확대축소 토글
const screenCheck = ref(false)


// 밤낮 스위치
const switchCheck = ref(false)
watch(switchCheck, (newValue) => {
    const appEl = document.querySelector('#app')
    if (newValue) {
        appEl.classList.add('dark-theme')
        localStorage.setItem('theme', 'dark')
        sessionStorage.setItem('themeSet', 'true')
    } else {
        appEl.classList.remove('dark-theme')
        localStorage.setItem('theme', 'light')
        sessionStorage.setItem('themeSet', 'true')
    }
})
// App.vue의 전달값 받아오기
const viewportNotPC = inject('viewportNotPC')
const classWatch = inject('classWatch')


onMounted(() => {

    const appEl = document.querySelector('#app')
    const savedTheme = localStorage.getItem('theme')
    const themeSet = sessionStorage.getItem('themeSet')
    if (themeSet) {
        if (savedTheme === 'dark') {
            switchCheck.value = true
            appEl.classList.add('dark-theme')
        } else {
            switchCheck.value = false
            appEl.classList.remove('dark-theme')
        }
    } else {
        // 세션 스토리지에 'themeSet'이 없으면 기본값을 설정
        localStorage.removeItem('theme')
        switchCheck.value = false
        appEl.classList.remove('dark-theme')
    }
})



// watch(viewportNotPC, (newValue) => {
//     console.log('[header.vue] viewportNotPC:', newValue)
// })
// watch(classWatch, (newValue) => {
//     console.log('[header.vue] classWatch:', newValue)
// })
</script>

<style scoped>
</style>
