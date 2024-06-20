<template>
    <div class="wrap" ui-layout="layoutDefault">
        <Header />
        <main class="main">
            <SideNav />
            <OverlayScrollbarsComponent 
                id="layoutDefault-scroll" 
                ref="scrollbarRef" 
                :options="{ scrollbars: { autoHide: 'scroll' } }" 
                @os-updated="quickSlotHandle"
                @os-scroll="quickSlotHandle"
                defer>
                <router-view name="content"/>
                
                <Transition name="quick-slot">
                    <div class="quick-slot"  
                        v-if="isFooterVisible"
                        :style="`--bottomVal : ${bottomVal / 10}rem`">
                        <div class="slot">
                            <button class="ui-button icon scroll-top md" @click="scrollToTop('click')">
                                <span class="ally-hidden">스크롤 위로 이동</span>
                            </button>
                        </div>
                    </div>
                </Transition>
                <Footer ref="footerRef"/>
            </OverlayScrollbarsComponent>
        </main>
    </div>
</template>

<script setup>
import { ref, provide, onMounted, watch, nextTick, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import SideNav from '@/components/layout/SideNav.vue'
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue" // OverlayScrollbar 도 퍼펙트스크롤 만큼 답없음

const scrollbarRef = ref(null)
const footerRef = ref(null)
const bottomVal = ref(0)
const isFooterVisible = ref(false)
provide('scrollbarRef', scrollbarRef)

const route = useRoute()

const scrollToTop = (hendle) => {
    const scrollInstance = scrollbarRef.value?.osInstance()
    // console.log('레이아웃',scrollInstance, scrollbarRef)
    if(hendle === 'click') {
        if(scrollInstance) {
            if (scrollInstance.elements().viewport.scrollTop !== 0) {
                scrollInstance.elements().viewport.scrollTo({top:0, behavior: 'smooth'})
            } 
        }
    } else {
        if(scrollInstance) {
            if (scrollInstance.elements().viewport.scrollTop !== 0) {
                scrollInstance.elements().viewport.scrollTo({top:0})
            } 
        }
    }
}
const quickSlotHandle = () => {
    const scrollInstance = scrollbarRef.value?.osInstance()
    // os-init은 os인스턴스가 안받아짐 업데이트로 씀.
    if (scrollInstance && footerRef.value) {
        // 변수설정
        const viewPort = scrollInstance.elements().viewport             // 스크롤바 뷰포트
        const viewPortRect = viewPort.getBoundingClientRect()           // 스크롤바 rect 정보
        const footerRect = footerRef.value.$el.getBoundingClientRect()  // 푸터 rect 정보
        const isFooterView = (footerRect.top - viewPortRect.top)        // 푸터 위치값

        if(Math.floor(isFooterView) < Math.floor(viewPortRect.height)) {
            bottomVal.value =  Math.floor(viewPortRect.height) - Math.floor(isFooterView) 
        } else {
            bottomVal.value = 0
        }

        if(viewPort.scrollTop >= 10) {
            isFooterVisible.value = true
        } else {
            isFooterVisible.value = false
        }
    }
}

onMounted(() => {
    quickSlotHandle()
})


watch(() => route.fullPath, () => {
    nextTick(() => {
        scrollToTop()
    })
})
</script>

<style scoped>
</style>
