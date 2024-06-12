<template>
    <div :class="['container', pageClass]">
        <div class="container-content">
            <PageTopSlot :title="title" :pagePath="pageClass" />

            <div class="section-area row">
                <div class="inner-col col-1"></div>
                
                <div class="inner-col col-1-2 chart">
                    <ProjectChart :showEnter="true" />
                </div>
                <div class="inner-col col-1-2 chart">
                    <ProjectChart :showStack="true" />
                </div>
                <div class="inner-col col-1 chart">
                    <ProjectChart :showYear="true" />
                </div>

                <div class="inner-col col-2-3"></div>
                <div class="inner-col col-1-3"></div>

                <div class="inner-col col-1-3"></div>
                <div class="inner-col col-1-3"></div>
                <div class="inner-col col-1-3"></div>

                <div class="inner-col col-1-2"></div>
                <div class="inner-col col-1-2"></div>

                <div class="inner-col col-1-4"></div>
                <div class="inner-col col-1-4"></div>
                <div class="inner-col col-1-4"></div>
                <div class="inner-col col-1-4"></div>

                <div class="inner-col col-1-4"></div>
                <div class="inner-col col-3-4"></div>
            </div>
            <div class="section-area row">
                <div class="inner-col col-1"></div>

                <div class="inner-col col-2-3"></div>
                <div class="inner-col col-1-3"></div>

                <div class="inner-col col-1-3"></div>
                <div class="inner-col col-1-3"></div>
                <div class="inner-col col-1-3"></div>

                <div class="inner-col col-1-2"></div>
                <div class="inner-col col-1-2"></div>

                <div class="inner-col col-1-4"></div>
                <div class="inner-col col-1-4"></div>
                <div class="inner-col col-1-4"></div>
                <div class="inner-col col-1-4"></div>

                <div class="inner-col col-1-4"></div>
                <div class="inner-col col-3-4"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import PageTopSlot from '@/components/PageTopSlot.vue'
import ProjectChart from '@/components/ProjectChart.vue'

const title = ref('홈 화면')
const pageClass = ref(['com', 'Home'])

computed(() => {

})
onMounted(() => {

})
</script>

<style scoped>
</style>