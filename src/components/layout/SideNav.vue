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
                                :class="['menu', item.path.substring(1), !checkAcc(item) ? 'not-acc' : '']"
                                :beforeActive="reflashAct(item)"
                                :notActive="!checkAcc(item)"
                                @click.prevent="notAccClick(!checkAcc(item))">
                                <template v-slot:inner>
                                    <ul class="list-2depth">
                                        <li v-for="(subItem, j) in item.children" :key="j">
                                            <router-link :to="`${item.path}/${subItem.path}`" @click="handleCloseMenu">
                                                <span class="text">{{ subItem.meta.title }}</span>
                                            </router-link>
                                        </li>
                                    </ul>
                                </template>
                            </UiAccordion>
                        </li>
                        <li v-else-if="item.name !== 'Login'">
                            <template v-if="checkAcc(item)">
                                <router-link :to="item.path" :class="[item.name]" @click="handleCloseMenu; underConstruction(item.name);">
                                    <span class="text">{{ item.meta.title }}</span>
                                </router-link>
                            </template>
                            <template v-else>
                                <a href="javascript:void(0)" :class="[item.name, 'not-acc']" @click="notAccClick(true)">
                                    <span class="text">{{ item.meta.title }}</span>
                                </a>
                            </template>
                        </li>
                    </template>
                </ul>
            </div>
            <!--// 메뉴 -->
        </OverlayScrollbarsComponent>
    </nav>
    <MessageBox v-model="alertModel" :item="alertItem"/>
</template>

<script setup>
import { ref, reactive, computed, onMounted, inject, watch } from 'vue'
import { routes } from '@/router'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import UiAccordion from '@/components/UiAccordion.vue'
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue" // 퍼펙트스크롤 급 답없음
import MessageBox from '@/components/popup/MessageBox.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()

// App.vue의 전달값 받아오기
const viewportNotPC = inject('viewportNotPC')
const classWatch = inject('classWatch')

// 유저정보 이미지 src
const user = computed(() => store.state.user)
const setUserImg = computed(() => {
    if(user?.value?.img) {
        return require('@/assets/images/profile/' + user?.value?.img)
    } else {
        return require('@/assets/images/profile/' + 'img_user_profile_p.png')
    }
})

// 로그아웃 페이지 전환
const logout = () => {
    store.dispatch('logout')
    const _app = document.querySelector('#app')
    if(_app.classList.contains('login-animation')) {
        _app.classList.replace('login-animation', 'logout-animation')
    } else {
        _app.classList.add('logout-animation')
    }
    if(viewportNotPC?.value && classWatch?.value && _app.classList.contains('lnb-control')) {
        _app.classList.remove('lnb-control')
    }
    router.push({ name: 'Login' })
}

// 라우터 메뉴 title기준 배열
const menuLists = ref(routes.filter(route => route.meta.title))


// 2뎁스 아코디언
const isAccordion = (item) => {
    return item.children && item.children.length > 0
}

const handleCloseMenu = () => {
    if(!viewportNotPC && !classWatch) return
    const _app = document.querySelector('#app')
    if(_app.classList.contains('lnb-control')) {
        _app.classList.remove('lnb-control')
    }
}

// 권한 여부 불리언 값 뱉음
const checkAcc = (item) => {
    const _acc = item.meta.roles || []
    if (_acc.length === 0 || _acc.includes(user.value?.role)) {
        return true
    }
    return false
}

// 현재 경로에 해당하는 아코디언을 활성화
const reflashAct = (item) => {
    if (isAccordion(item)) {
        return item.children.some(subItem => route.path.includes(`${item.path}/${subItem.path}`))
    } 
    return false
}

// 얼럿
const alertModel = ref(false)
const alertItem = ref({
    title: '접근불가 안내',
    message: `
        <div class="error-message-box">
            <p class="text">메뉴 권한이 없습니다.<br/>다른 사용자로 로그인 하시겠습니까?</p>
        </div>
    `,
    textAlign: 'center',
    innerHtml : true,
    cancelText: '취소',
    confirmText: '로그아웃',
    onCancel: () => {},
    onConfirm: () => {
        logout()
    },
})

// 사용자권한 접근불가 메뉴 클릭
const notAccClick = (Boolean) => {
    if(!Boolean) return
    alertModel.value = true
}
const underConstruction = (name) => {
    if(name !== 'Resources') return
}


onMounted(() => {
    // console.log('유저 정보 :', user.value)
})
</script>

<style scoped>
</style>