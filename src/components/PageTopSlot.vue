<template>
    <div class="page-top-slot">
        <h2 class="fs-hxl theme-t">{{ title }}</h2>
        <p class="fs-m theme"><span>{{ returnData }}</span></p>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: '타이틀없음'
    },
    pagePath: {
        type: Array,
        default: () => []
    }
})
const returnData = computed(() => {
    return `views > ${props.pagePath.join(' > ') + '.vue'}`
})
</script>

<style scoped>
</style>
