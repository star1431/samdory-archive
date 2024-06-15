<template>
    <teleport to="#app">
        <transition name="popup-effect" appear>
            <div :class="['popup', customClass]" v-if="modelValue" ref="refPopup" role="dialog"  tabindex="0"> 
                <slot></slot>
                <div class="dimmed" @click="$emit('update:modelValue', false)"></div>
            </div>
        </transition>
    </teleport>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, nextTick, watch  } from 'vue'

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

const refPopup = ref(null)

// 웹접근성 팝업 open시 focus 강제
watch(() => props.modelValue, (newVal) => {
    if (newVal) {
        // 팝업이 열릴 때 포커스를 이동
        nextTick(() => {
            refPopup.value.focus()
        })
    }
})

const emits = defineEmits(['update:modelValue']) // 부모에서 v-model 양방향 바인딩
</script>

<style scoped>
</style>
