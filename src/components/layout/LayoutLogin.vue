<template>
    <div class="wrap" ui-layout="layoutLogin">
        <main class="main">
            <OverlayScrollbarsComponent id="layoutLogin-scroll" :options="{scrollbars:{autoHide:'scroll'}}" defer>
                <RouterView name="content" />
            </OverlayScrollbarsComponent>
        </main>
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

<style scoped>
</style>
