<template>
    <div class="wrap" ui-layout="layoutDefault">
        <Header/>
        <main class="main">
            <RouterView name="content" />
        </main>
        <Footer/>
    </div>
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router'
import { ref, reactive, computed, onMounted, watch } from 'vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

computed(() => {

})
onMounted(() => {

})
watch(() => {

})
</script>

<style lang="scss" scoped>
</style>
