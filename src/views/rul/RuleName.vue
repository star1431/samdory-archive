<template>
    <div :class="['container', pageClass]">
        <h1>RuleName</h1>
        <p>네이밍 규칙</p>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const pageClass = ref(['rul', 'RuleName'])

computed(() => {

})
onMounted(() => {

})
</script>

<style lang="scss" scoped>
</style>