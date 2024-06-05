<template>
    <div :class="['container', pageClass]">
        <!-- 비주얼 -->
        <div class="login-visual">
            <img class="login-img" src="@/assets/images/common/img_login_visual.png" alt="">
        </div>
        <!--// 비주얼 -->
        <!-- 로그인 -->
        <div class="login-area">
            <div class="inner">
                <div class="text-box">
                    <h1 class="ui-logo beta-label">
                        <img class="logo" src="@/assets/images/common/img_logo_samdory_black.png" alt="SD">
                        <span>Archive</span>
                    </h1>
                </div>
                <form class="form-default" @submit.prevent="login">
                    <div class="form-field">
                        <div class="form-field-item">
                            <label for="userId">아이디</label>
                            <div class="input-box">
                                <UiField
                                    inputId="userId"
                                    v-model="userName"
                                    placeholder="아이디 입력"
                                    :error="idError"
                                />
                            </div>
                        </div>
                        <div class="form-field-item">
                            <label for="userPw">비밀번호</label>
                            <div class="input-box">
                                <UiField
                                    inputId="userPw"
                                    v-model="passWord"
                                    inputType="password"
                                    placeholder="비밀번호 입력"
                                    :error="pwError"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="field-bottom-slot">
                        <p class="error-text" v-if="glError">{{ glError }}</p>
                        <div class="ui-checkbox">
                            <label>
                                <input type="checkbox" v-model="saveId">
                                <span class="check-inner">아이디 저장</span>
                            </label>
                        </div>
                    </div>
                    <div class="field-footer">
                        <button type="submit" class="ui-button sq-primary">로그인</button>
                    </div>
                </form>
            </div>
        </div>
        <!--// 로그인 -->
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import UiField from '@/components/UiField.vue'

const pageClass = ref(['com', 'Login'])

const userName = ref('')
const passWord = ref('')
const glError = ref(null)
const idError = ref(null)
const pwError = ref(null)
const saveId = ref(false)

const store = useStore()
const router = useRouter()

// 로그인 서브밋
const login = async () => {
    glError.value = null
    idError.value = null
    pwError.value = null

    if (!userName.value) idError.value = '아이디를 입력하세요.'
    if (!passWord.value) pwError.value = '비밀번호를 입력하세요.'
    if (idError.value || pwError.value) return
    try {
        // 스토어
        await store.dispatch('login', { username: userName.value, password: passWord.value })
        // 로그인 성공 시 아이디 저장
        if (saveId.value) {
            localStorage.setItem('savedId', userName.value)
        } else {
            localStorage.removeItem('savedId')
        }
        if(document.querySelector('#app').classList.contains('logout-animation')) {
            document.querySelector('#app').classList.remove('logout-animation')
            document.querySelector('#app').classList.add('login-animation')
        } else {
            document.querySelector('#app').classList.add('login-animation')
        }
        router.push({ name: 'Home' })
    } catch (err) {
        glError.value = err
        idError.value = 'show'
        pwError.value = 'show'
    }
}

computed(() => {

})
onMounted(() => {
    // 아이디저장값 갖고오기
    const savedId = localStorage.getItem('savedId')
    console.log(savedId)
    if (savedId) {
        userName.value = savedId
        saveId.value = true
    }
})
</script>

<style scoped>
</style>