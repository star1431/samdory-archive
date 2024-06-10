<template>
    <div :class="['ui-accordion', { 'is-active': isActive }]">
        <div class="accordion-header">
            <button class="toggle-button" type="button" @click="toggleAccordion">
                <span class="title">{{ title }}</span>
            </button>
        </div>
        <transition @before-enter="accBeforeEnt" @enter="accEnt" @leave="accLeave">
            <div class="accordion-body" ref="accordionBody" v-show="isActive">
                <div class="inner">
                    <!-- 커스텀슬롯 -->
                    <slot name="inner"></slot>
                    <!-- // 커스텀슬롯 -->
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, onMounted } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: '타이틀없음'
    },
    beforeActive: {
        type: Boolean,
        default: false
    }
})

const isActive = ref(props.beforeActive)
const accordionBody = ref(null)

const toggleAccordion = () => {
    isActive.value = !isActive.value
}

// 트랜지션 hock
const accBeforeEnt = (el) => {
    el.style.maxHeight = '0'
}
const accEnt = (el) => {
    el.style.maxHeight = el.scrollHeight + 'px'
    el.style.transition = 'max-height 0.2s'
}
const accLeave = (el) => {
    el.style.maxHeight = '0'
    el.style.transition = 'max-height 0.2s'
}

// 마운트시 부모에서 디폴트로 열고 있어야 할 때
onMounted(() => {
    if (props.beforeActive) {
        const el = accordionBody.value
        if (el) {
            el.style.maxHeight = el.scrollHeight + 'px'
            el.style.transition = 'max-height 0.2s'
            setTimeout(() => {
                el.style.maxHeight =  el.scrollHeight + 'px'
                el.style.transition = 'max-height 0.2s'
            }, 200)
        }
    }
})
</script>

<style scoped>
</style>
