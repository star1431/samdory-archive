<template>
    <div :class="['container', pageClass]">
        <div class="container-content">
            <PageTopSlot :title="title" :pagePath="pageClass" />

            <div class="section-area row">
                <div class="inner-col col-1"></div>

                <div class="inner-col col-2-3"></div>
                <div class="inner-col col-1-3"></div>

                <div class="inner-col col-1-3"></div>
                <div class="inner-col col-1-3"></div>
                <div class="inner-col col-1-3"></div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import PageTopSlot from '@/components/PageTopSlot.vue'

const title = ref('자료모음')
const pageClass = ref(['res', 'Resources'])

// const logout = () => {
//     store.dispatch('logout')
//     router.push({ name: 'Login' })
// }

computed(() => {

})
onMounted(() => {

})
</script>

<style scoped>
</style>