<template>
    <div :class="['container', pageClass]">
        <div class="container-content">
            <PageTopSlot :title="title" :pagePath="pageClass" />

            <div class="section-area row">
                <div class="inner-col col-1 posts">
                    <div class="lottie-banner">
                        <LottieLoader :lottieData="lottieJson"/>
                    </div>
                    <PageMarkDown :loader="postMd"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import PageTopSlot from '@/components/PageTopSlot.vue'
import PageMarkDown from '@/components/PageMarkDown.vue'
import LottieLoader from '@/components/LottieLoader.vue'
import lottieJson from '@/assets/js/lottie/lottieTri.json'
import postMd from '@/posts/tri/프로젝트개념.md' 

const title = ref('프로젝트 개념')
const pageClass = ref(['tri', 'TrainingProject'])

</script>

<style scoped>
</style>
