<template>
    <div :class="['container', pageClass]">
        <h1>CompanyInfo</h1>
        <p>안내사항 페이지</p>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const pageClass = ref(['inf', 'CompanyInfo'])

computed(() => {

})
onMounted(() => {

})
</script>

<style lang="scss" scoped>
</style>