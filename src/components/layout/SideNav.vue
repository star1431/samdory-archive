<template>
    <nav class="side-nav">
        <OverlayScrollbarsComponent :options="{scrollbars:{autoHide:'scroll'}}" defer>
            <!-- 유저정보 -->
            <div class="user-info-box">
                <div class="user-profile">
                    <div class="img-box">
                        <img class="user-img" :src="setUserImg" alt="유저 사진"/>
                    </div>
                    <div class="text-box">
                        <p class="nick-name"><span>{{ user?.nick ?? '로그아웃 중'  }}</span> 님</p>
                        <p class="user-id">ID : <span>{{ user?.name ?? '로그아웃 중' }}</span></p>
                    </div>
                </div>
                <div class="slot-bottom">
                    <button type="button" class="ui-button icon icon-right logout" @click="logout">
                        <span class="text">로그아웃</span>
                    </button>
                </div>
            </div>
            <!--// 유저정보 -->

            <!-- 메뉴 -->
            <div class="menu-list-box">
                <p class="list-info">Menu</p>
                <ul class="menu-lists">
                    <template v-for="(item, i) in menuLists" :key="i">
                        <li v-if="isAccordion(item)">
                            <UiAccordion 
                                :title="item.meta.title" 
                                :class="['menu', item.path.substring(1), !checkAcc(item) ? 'not-acc' : '']">
                                <template v-slot:inner>
                                    <ul class="list-2depth">
                                        <li v-for="(subItem, j) in item.children" :key="j">
                                            <router-link :to="`${item.path}/${subItem.path}`">
                                                <span class="text">{{ subItem.meta.title }}</span>
                                            </router-link>
                                        </li>
                                    </ul>
                                </template>
                            </UiAccordion>
                        </li>
                        <li v-else-if="item.name !== 'Login'">
                            <router-link :to="item.path" :class="[item.name, !checkAcc(item) ? 'not-acc' : '']">
                                <span class="text">{{ item.meta.title }}</span>
                            </router-link>
                        </li>
                    </template>
                </ul>
            </div>
            <!--// 메뉴 -->
        </OverlayScrollbarsComponent>
    </nav>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { routes } from '@/router'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import UiAccordion from '@/components/UiAccordion.vue'
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue"

const store = useStore()
const router = useRouter()

// 유저정보 이미지 src
const user = computed(() => store.state.user)
const setUserImg = computed(() => {
    if (user?.value?.role === 'admin') {
        return require('@/assets/images/common/img_user_profile_a.png')
    } else if (user?.value?.role === 'employee') {
        return require('@/assets/images/common/img_user_profile_sd.png')
    } else {
        return require('@/assets/images/common/img_user_profile_p.png')
    } 
})

// 로그아웃 페이지전환
const logout = () => {
    store.dispatch('logout')
    
    if(document.querySelector('#app').classList.contains('login-animation')) {
        document.querySelector('#app').classList.replace('login-animation', 'logout-animation')
    } else {
        document.querySelector('#app').classList.add('logout-animation')
    }

    router.push({ name: 'Login' })
}

// 라우터 메뉴
const menuLists = ref(routes.filter(route => route.meta.title))


// 2뎁스 아코디언
const isAccordion = (item) => {
    return item.children && item.children.length > 0
}

// 권한 체크 클래스
const checkAcc = (item) => {
    const _acc = item.meta.roles || []
    if (_acc.length === 0 || _acc.includes(user.value?.role)) {
        return true
    }
    return false
}

onMounted(() => {
    // console.log('유저 정보 :', user.value)
})
</script>

<style scoped>
</style>