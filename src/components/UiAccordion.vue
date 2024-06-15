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
    },
    notActive: {
        type: Boolean,
        default: false
    }
})

const isActive = ref(props.beforeActive)
const notActive = ref(props.notActive)
const accordionBody = ref(null)

const toggleAccordion = () => {
    if(notActive.value) return
    isActive.value = !isActive.value
}

// 트랜지션 hock
const accBeforeEnt = () => {
    const el = accordionBody.value
    el.style.maxHeight = '0px'
}
const accEnt = () => {
    const el = accordionBody.value
    el.style.maxHeight = el.scrollHeight + 'px'
    el.style.transition = 'max-height 0.3s'
}
const accLeave = () => {
    const el = accordionBody.value
    setTimeout(() => {
        el.style.transition = 'max-height 0.3s'
        el.style.maxHeight = '0px'
    }, 10) // 떠날때 100번중 1번 꼴 안되서 딜레이
}

// 마운트시 부모에서 디폴트로 열고 있어야 할 때
onMounted(() => {
    if (props.beforeActive) {
        const el = accordionBody.value
        if (el) {
            el.style.maxHeight = el.scrollHeight + 'px'
            el.style.transition = 'max-height 0.3s'
            setTimeout(() => { // 간혹 마운트 후에도 제대로 안될 경우 딜레이 후 똑같이 진행
                el.style.maxHeight =  el.scrollHeight + 'px'
                el.style.transition = 'max-height 0.3s'
            }, 400)
        }
    }
})
</script>

<style scoped>
</style>
