<template>
    <div :class="['container', pageClass]">
        <h1>RuleDefault</h1>
        <p>기본 규칙</p>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const pageClass = ref(['rul', 'RuleDefault'])

computed(() => {

})
onMounted(() => {

})
</script>

<style lang="scss" scoped>
</style>