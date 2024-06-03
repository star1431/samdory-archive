<template>
    <div :class="['container', pageClass]">
        <h1>Resources</h1>
        <p>자료모음 페이지</p>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const pageClass = ref(['res', 'Resources'])

// const logout = () => {
//     store.dispatch('logout')
//     router.push({ name: 'Login' })
// }

computed(() => {

})
onMounted(() => {

})
</script>

<style lang="scss" scoped>
</style>