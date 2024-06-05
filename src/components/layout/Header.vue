<template>
    <header class="header">
        <div class="view-inner" ui-size="normal">
            <!-- 로고영역 -->
            <h1 class="ui-logo logo-link beta-label">
                <router-link to="/">
                    <img class="logo" src="@/assets/images/common/img_logo_samdory_white.png" alt="SD">
                    <span>Archive</span>
                </router-link>
            </h1>
            <!--// 로고영역 -->

            <!-- 헤더 컨텐츠 etc -->
            <div class="inner-content flex-row-8">
                <div class="slot-left">
                    <button type="button" class="ui-button icon menu" @click="menuClick">
                        <span class="ally-hidden">메뉴</span>
                    </button>
                </div>
                <div class="slot-right">
                    <div class="ui-switch">
                        <label class="switch-inner">
                            <input type="checkbox" v-model="switchCheck">
                            <i class="swich-icon"></i>
                            <span class="ally-hidden">테마변경 스위치</span>
                        </label>
                    </div>
                </div>
            </div>
            <!-- 헤더 컨텐츠 etc -->
        </div>
    </header>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// 메뉴버튼 클릭
const menuClick = () => {
    const _app = document.querySelector('#app')
    if(_app.classList.contains('lnb-close')) {
        _app.classList.remove('lnb-close')
    } else {
        _app.classList.add('lnb-close')
    }
}

// 밤낮 스위치
const switchCheck = ref(false)

computed(() => {

})
onMounted(() => {

})
</script>

<style scoped>
</style>
