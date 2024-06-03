<template>
    <div :class="['container', pageClass]">
        <h1>TrainingDesign</h1>
        <p>디자인 교육 페이지</p>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const pageClass = ref(['tri', 'TrainingDesign'])

computed(() => {

})
onMounted(() => {

})
</script>
<style lang="scss" scoped>
</style>