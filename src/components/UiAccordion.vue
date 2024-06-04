<template>
    <div :class="['ui-accordion', { 'is-active': isActive }]">
        <div class="accordion-header">
            <button class="toggle-button" type="button" @click="toggleAccordion">
                <span class="title">{{ title }}</span>
            </button>
        </div>
        <div class="accordion-body" ref="accordionBody">
            <div class="inner">
                <slot name="inner"></slot>
            </div>
        </div>
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
    const _bodyEl = accordionBody.value
    if (isActive.value) {
        _bodyEl.style.maxHeight = _bodyEl.scrollHeight + 'px'
    } else {
        _bodyEl.style.maxHeight = null
    }
}
</script>

<style scoped>
</style>
