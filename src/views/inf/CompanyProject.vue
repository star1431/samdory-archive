<template>
    <div :class="['container', pageClass]">
        <div class="container-content">
            <PageTopSlot :title="title" :pagePath="pageClass" />

            <div class="section-area row">
                <div class="inner-col col-1">
                    <div class=""></div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import PageTopSlot from '@/components/PageTopSlot.vue'

const title = ref('프로젝트 통계')
const pageClass = ref(['inf', 'CompanyProject'])

computed(() => {

})
onMounted(() => {

})
</script>

<style scoped>
</style>