<template>
    <div class="wrap" ui-layout="layoutDefault">
        <Header />
        <main class="main">
            <SideNav />
            <OverlayScrollbarsComponent 
                id="layoutDefault-scroll" 
                ref="scrollbarRef" 
                :options="{ scrollbars: { autoHide: 'scroll' } }" 
                @os-updated="scrollOnUpdated" 
                defer>
                <router-view name="content" />
                <Footer />
            </OverlayScrollbarsComponent>
        </main>
    </div>
</template>

<script setup>
import { ref, provide, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import SideNav from '@/components/layout/SideNav.vue'
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue" // OverlayScrollbar 도 퍼펙트스크롤 만큼 답없음

const scrollbarRef = ref(null)
provide('scrollbarRef', scrollbarRef)

const route = useRoute()
const router = useRouter()

const scrollToTop = () => {
    const scrollInstance = scrollbarRef.value?.osInstance()
    // console.log('레이아웃',scrollInstance, scrollbarRef)
    if(scrollInstance) {
        if (scrollInstance.elements().viewport.scrollTop !== 0) {
            scrollInstance.elements().viewport.scrollTo({top:0})
        } 
    }
}


onMounted(() => {
})

watch(() => route.fullPath, () => {
    nextTick(() => {
        scrollToTop()
    })
})
</script>

<style scoped>
</style>
