<template>
    <div class="wrap" ui-layout="layoutLogin">
        <OverlayScrollbarsComponent 
            :options="{scrollbars:{autoHide:'scroll'}}"
            defer>
            <main class="main">
                <RouterView name="content" />
            </main>
        </OverlayScrollbarsComponent>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
// import Header from '@/components/layout/Header.vue'
// import Footer from '@/components/layout/Footer.vue'
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue"

computed(() => {

})
onMounted(() => {

})
</script>

<style lang="scss" scoped>
</style>
