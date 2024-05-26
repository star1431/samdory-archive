<template>
    <div :class="['container', pageClass]">
        <h1>Resources</h1>
        <p>자료모음 페이지</p>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'

const pageClass = ref(['Resources'])

// const logout = () => {
//     store.dispatch('logout')
//     router.push({ name: 'Login' })
// }

computed(() => {

})
onMounted(() => {

})
watch(() => {

})
</script>

<style lang="scss" scoped>
</style>