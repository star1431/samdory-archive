<template>
    
    <div class="wrap" ui-layout="layoutDefault">
        <Header/>
        <OverlayScrollbarsComponent 
            :options="{scrollbars:{autoHide:'scroll'}}"
            defer>
            <main class="main">
                <router-view name="content" />
            </main>
            <Footer/>
        </OverlayScrollbarsComponent>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue"
const router = useRoute()


computed(() => {

})
onMounted(() => {
    console.log('LayoutDefault 마운트')
})
watch(() => router.meta, (newMeta) => {
    console.log('메타확인:', newMeta)
})
</script>

<style lang="scss" scoped>
</style>
