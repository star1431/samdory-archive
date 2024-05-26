<template>
    <div :class="['container', pageClass]">

        <h2>로그인테스트</h2>
        <form @submit.prevent="login">
            <input v-model="username" type="text" placeholder="사용자명" required />
            <input v-model="password" type="password" placeholder="비밀번호" required />
            <button type="submit">로그인</button>
        </form>
        <p v-if="error">{{ error }}</p>
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

const login = async () => {
    if (!username.value || !password.value) {
        error.value = '아이디와 비밀번호를 입력하세요.'
        return
    }
    try {
        await store.dispatch('login', { username: username.value, password: password.value })
        router.push({ name: 'Home' })
    } catch (err) {
        error.value = err
    }
}

computed(() => {

})
onMounted(() => {

})
watch(() => {

})
</script>

<style lang="scss" scoped>
</style>