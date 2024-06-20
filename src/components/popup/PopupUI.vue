<template>
    <teleport :to="teleportTo">
        <transition name="popup-effect" appear>
            <div v-if="modelValue" :class="['popup', customClass]" ref="refPopup" role="dialog"  tabindex="0"> 
                <slot></slot>
                <div class="dimmed" @click="closePopup"></div>
            </div>
        </transition>
    </teleport>
</template>

<script setup>
import { defineProps, defineEmits, ref, nextTick, watch } from 'vue'
const props = defineProps({
    customClass: {
        type: [String, Array],
        default: ''
    },
    modelValue: {
        type: Boolean,
        default: false
    }
})

// 부모에서 v-model 양방향 바인딩
const emits = defineEmits(['update:modelValue', 'close']);

/**
 * teleportTo 처음에 body인 이유
 * Failed to execute 'insertBefore' on 'Node' 에러 나타남. (vue기능인 teleport랑 transition 동시에 쓰면 이런듯..?)
 * 라우터 이동시 레이아웃이 변경되었을 때 vue 자체의 #app 동적 변경되어 에러 터짐.
 */
const teleportTo = ref('body')
const refPopup = ref(null)
const prev = ref(null)

// 팝업 open시 텔레포트 및 포커스 조정
watch(() => props.modelValue, (newVal) => {
    // open : 팝업에 포커스 이동
    if (newVal === true) {
        prev.value = document.activeElement // 기존 포커스 저장
        teleportTo.value = '#app' // #app으로 텔레포트 조정 (dom업데이트 전 위치 바로 바꾸기)
        nextTick(() => {
            refPopup.value.focus()
        })
    } else {
        // close : 기존 포커스로 이동
        nextTick(() => {
            teleportTo.value = 'body'
            prev.value.focus()
        })
    }
})


// 딤드
const closePopup = () => {
    emits('update:modelValue', false)
    emits('close')
}
</script>

<style scoped>
</style>
