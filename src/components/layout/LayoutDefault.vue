<template>
    
    <div class="wrap" ui-layout="layoutDefault">
        <Header/>
            <main class="main">
                <SideNav />
                <OverlayScrollbarsComponent :options="{scrollbars:{autoHide:'scroll'}}" defer>
                    <router-view name="content" />
                    <Footer v-if="false"/>
                </OverlayScrollbarsComponent>
            </main>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import SideNav from '@/components/layout/SideNav.vue'
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue"
const router = useRoute()

computed(() => {

})
onMounted(() => {
})
watch(() => router.meta, (newMeta) => {
    // console.log('메타확인:', newMeta)
})
</script>

<style scoped>
</style>
