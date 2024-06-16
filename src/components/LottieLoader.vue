<!-- 로티 애니메이션 파일 : https://lottiefiles.com/featured -->
<template>
    <div class="lottie-box" ref="animationContainer"></div>
</template>

<script setup>
import { ref, defineProps, onMounted, onBeforeUnmount } from 'vue'
import lottie from 'lottie-web'

const props = defineProps({
    lottieData: {
    type: Object,
    required: true
    },
    loop: {
        type: Boolean,
        default: true
    },
    autoplay: {
        type: Boolean,
        default: true
    },
    startFrame: {
        type: Number,
        default: 0
    },
    endFrame: {
        type: Number,
        default: null
    }
})

const animationContainer = ref(null)
let animationInstance = null

onMounted(() => {
    animationInstance = lottie.loadAnimation({
        container: animationContainer.value,
        renderer: 'svg',
        loop: props.loop,
        autoplay: props.autoplay,
        animationData: props.lottieData
    })
    if (props.endFrame !== null) {
        animationInstance.playSegments([props.startFrame, props.endFrame], true)
    }
})

// login <-> home 페이지 트랜지션 훅사이 파괴되서 주석처리
// onBeforeUnmount(() => {
//     if (animationInstance) {
//         animationInstance.destroy()
//     }
// })
</script>

<style scoped>
</style>
