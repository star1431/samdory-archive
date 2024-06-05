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
                    <slot name="inner"></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const isActive = ref(false)
const accordionBody = ref(null)

const props = defineProps({
    title: {
        type: String,
        default: '타이틀없음'
    },
})
const toggleAccordion = () => {
    isActive.value = !isActive.value
}

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
</script>

<style scoped>
</style>
