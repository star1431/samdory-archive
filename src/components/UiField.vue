<template>
    <div class="ui-field">
        <div 
            :class="['input-item', focusState, disabled ? 'is-disabled' : null, readonly ? 'is-readonly' : null, props.error ? 'is-error' : null ]"
            @focus="inputFocus" 
            @blur="inputBlur">
            <input 
                class="ui-input"
                :id="inputId" 
                v-model="inputValue" 
                :type="inputType" 
                :placeholder="placeholder" 
                :title="title" 
                :disabled="disabled"
                :readonly="readonly"
                @focus="inputFocus" 
                @blur="inputBlur"
                @input="inputEv"/>
            <button class="btn-value-clear" type="button" v-if="clearShow" @click="clearInput">
                <i class="xi-close-circle xi-x"></i>
                <span class="ally-hidden">입력값 지우기</span>
            </button>
        </div>
        <p class="error-text" v-if="props.error && props.error !== 'show'">{{ props.error }}</p>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
    inputId: {
        type: String,
        required: true
    },
    modelValue: {
        type: String,
        required: true
    },
    inputType: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    error: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    readonly: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['update:modelValue'])
const inputValue = ref(props.modelValue)
const clearShow = ref(false)
const focusState = ref('')

// 클리어 버튼
const clearInput = (e) => {
    e.stopPropagation()
    inputValue.value = ''
    emits('update:modelValue', inputValue.value)
}

// 입력 전달 받음
watch(inputValue, (newValue) => {
    emits('update:modelValue', newValue)
})

// 페이지 내 마운트시 벨류값 꽂을때 감시
watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue
})

const inputFocus = () => {
    if(props.disabled && props.readonly) return
    focusState.value = 'is-focus'
    if(inputValue.value !== '') clearShow.value = true
}
const inputBlur = (e) => {
    if (e.relatedTarget && e.relatedTarget.classList.contains('btn-value-clear')) {
        setTimeout(() => {
            clearShow.value = false
        }, 150)
    } else {
        clearShow.value = false
    }
    focusState.value = ''
}
const inputEv = () => {
    if(inputValue.value !== '') clearShow.value = true
}
</script>

<style scoped>
</style>
