<template>
    <div :class="['container', pageClass]">
        <h1>TrainingCode</h1>
        <p>코드에디터 교육 페이지</p>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const pageClass = ref(['tri', 'TrainingCode'])

computed(() => {

})
onMounted(() => {

})
</script>
<style scoped>
</style>