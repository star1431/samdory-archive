<template>
    <nav class="side-nav">
        <OverlayScrollbarsComponent 
        :options="{scrollbars:{autoHide:'scroll'}}"
                defer>
            <div class="user-info-box">
                <div class="user-profile">
                    <div class="img-box">
                        <img class="user-img" :src="setUserImg" alt="유저 사진"/>
                    </div>
                    <div class="text-box">
                        <p class="nick-name"><span>{{ user?.nick ?? ''  }}</span> 님</p>
                        <p class="user-id">ID : <span>{{ user?.name ?? '' }}</span></p>
                    </div>
                </div>
                <div class="slot-bottom">
                    <button type="button" class="ui-button icon icon-right logout" @click="logout">
                        <span class="text">로그아웃</span>
                    </button>
                </div>
            </div>
            <div class="menu-list-box">
                <ul class="menu-lists">
                    <li v-for="(item, i) in menuLists" :key="i">
                        <template v-if="isAccordion(item)">
                            <UiAccordion :title="item.meta.title" :class="['menu', item.path.substring(1)]">
                                <template v-slot:inner>
                                    <ul class="2depth-list">
                                        <li v-for="(subItem, j) in item.children" :key="j">
                                            <router-link :to="`${item.path}/${subItem.path}`">{{ subItem.meta.title }}</router-link>
                                        </li>
                                    </ul>
                                </template>
                            </UiAccordion>
                        </template>
                        <template v-else-if="item.name !== 'Login'">
                            <router-link :to="item.path" :class="item.name">{{ item.meta.title }}</router-link>
                        </template>
                    </li>
                </ul>
            </div>
        </OverlayScrollbarsComponent>
    </nav>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { routes } from '@/router'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import UiAccordion from '@/components/UiAccordion.vue'

const store = useStore()
const router = useRouter()


// 유저정보
const user = computed(() => store.state.user)
const setUserImg = computed(() => {
    console.log('1111',user.value.role)
    // const roleCheck = user.value && user.value.role
    if(user.value) {
        // console.log('222', Array.isArray(user.value.role))
    }
    if (user.value && user.value.role === 'employee' || user.value.role === 'admin') {
        return require('@/assets/images/common/img_user_profile_sd.png')
    } else {
        return require('@/assets/images/common/img_user_profile_p.png')
    }
})

// 로그아웃
const logout = () => {
    store.dispatch('logout')
    
    if(document.querySelector('#app').classList.contains('login-animation')) {
        document.querySelector('#app').classList.remove('login-animation')
        document.querySelector('#app').classList.add('logout-animation')
    } else {
        document.querySelector('#app').classList.add('logout-animation')
    }

    router.push({ name: 'Login' })
}

// 라우터 메뉴
const menuLists = ref(routes.filter(route => route.meta.title))

// 2뎁스 아코디언 v-if
const isAccordion = (item) => {
    return item.children && item.children.length > 0
}

onMounted(() => {
    // console.log('유저 정보 :', user.value)
})
</script>

<style lang="scss" scoped>
</style>
