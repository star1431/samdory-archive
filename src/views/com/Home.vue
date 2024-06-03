<template>
    <div :class="['container', pageClass]">
        <h1>Home</h1>
        <p>홈 메인 페이지</p>
        <!-- <img src="@/assets/images/common/img_login_visual.png" alt=""> -->
        <button type="submit" @click="loginClick()">로그인</button>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const pageClass = ref(['com', 'Home'])

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
</script>

<style lang="scss" scoped>
</style>