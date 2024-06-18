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
import lottieJson from '@/assets/js/lottie/lottieRul.json'
import postMd from '@/posts/rul/기본규칙.md' 


const title = ref('기본 규칙')
const pageClass = ref(['rul', 'RuleDefault'])

</script>

<style scoped>
</style>