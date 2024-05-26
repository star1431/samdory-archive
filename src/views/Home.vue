<template>
    <div :class="['container', pageClass]">
        <h1>Home</h1>
        <p>홈 메인 페이지</p>
        <button type="submit" @click="loginClick()">로그인</button>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const pageClass = ref(['Home'])

const username = ref('')
const password = ref('')
const error = ref(null)

const store = useStore()
const router = useRouter()

const loginClick = () => { router.push({ name: 'Login' }) }

computed(() => {

})
onMounted(() => {

})
watch(() => {

})
</script>

<style lang="scss" scoped>
</style>