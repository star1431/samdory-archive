<template>
    <header class="header">
        <div class="view-inner" ui-size="normal">
            <h1 class="ui-logo logo-link beta-label">
                <router-link to="/">
                    <img class="logo" src="@/assets/images/common/img_logo_samdory_white.png" alt="SD">
                    <span>Archive</span>
                </router-link>
            </h1>
            <div class="inner-content flex-row-8">
                <div class="slot-left">
                    <button type="button" class="ui-button icon-only menu">
                        <span class="ally-hidden">메뉴</span>
                    </button>
                </div>
                <div class="slot-right">

                </div>
            </div>
            <!-- <div class="menu flex-row-8">
                <router-link to="/">홈으로</router-link>
                <router-link to="/company">사내정보</router-link>
                <router-link to="/training">트레이닝</router-link>
                <router-link to="/rules">작업가이드</router-link>
                <router-link to="/resources">자료모음</router-link>
            </div> -->
        </div>
    </header>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

computed(() => {

})
onMounted(() => {

})
</script>

<style lang="scss" scoped>
</style>
