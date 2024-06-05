<template>
    <div :class="['container', pageClass]">
        <h1>TrainingProject</h1>
        <p>프로젝트 교육 페이지</p>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const pageClass = ref(['tri', 'TrainingProject'])

computed(() => {

})
onMounted(() => {

})
</script>
<style scoped>
</style>