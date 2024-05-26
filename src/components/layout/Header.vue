<template>
    <header class="header">
        <div class="view-inner" ui-size="normal">
            <h1 class="logo">
                <span class="ally-hidden">사이트 로고</span>
                <img src="@/assets/images/common/img_logo_samdory.png" alt="SAMDORY LOGO" v-if="false">
            </h1>
            <div>
                <h2 class="fs-xxl">테스트</h2>
            </div>
            <div class="menu">
                <router-link to="/">홈으로</router-link>
                <router-link to="/company-info">숙지사항</router-link>
                <router-link to="/training">트레이닝</router-link>
                <router-link to="/work-rules">작업규칙</router-link>
                <router-link to="/resources">자료모음</router-link>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
console.log(router)

computed(() => {

})
onMounted(() => {

})
watch(() => {

})
</script>

<style lang="scss" scoped>
</style>
