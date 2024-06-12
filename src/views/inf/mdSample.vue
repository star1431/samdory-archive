<template>
    <div :class="['container', pageClass]">
        <div class="container-content">
            <PageTopSlot :title="title" :pagePath="pageClass" />

            <div class="section-area row">
                <div class="inner-col col-1 posts">
                    <div class="lottie-banner">
                        <LottieLoader :lottieData="lottieJson"/>
                    </div>
                    <PageMarkDown :loader="postMd" :scrollbarRef="scrollbarRef" />
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
import lottieJson from '@/assets/js/lottie/lottieinf.json'
import postMd from '@/posts/inf/sample.md' 

const title = ref('markdown 샘플')
const pageClass = ref(['inf', 'mdSample'])
const scrollbarRef = ref(null)

</script>

<style scoped>
</style>
