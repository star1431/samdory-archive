<template>
    <div :class="['container', pageClass]">
        <h1>RuleCode</h1>
        <p>코드 규칙</p>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const pageClass = ref(['rul', 'RuleCode'])

computed(() => {

})
onMounted(() => {

})
</script>

<style lang="scss" scoped>
</style>