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
})

onBeforeUnmount(() => {
if (animationInstance) {
    animationInstance.destroy()
}
})
</script>

<style scoped>
</style>
