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
            <transition
                @before-enter="btnBefEnt"
                @enter="btnEnt"
                @leave="btnLeave">
                <button class="btn-value-clear" type="button" v-show="clearShow" @click="clearInput" @focus="btnFocus" @blur="btnBlur">
                    <i class="xi-close-circle xi-x"></i>
                    <span class="ally-hidden">입력값 지우기</span>
                </button>
            </transition>
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
const clearFocused = ref(false)

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

// [input] 이벤트
const inputFocus = () => {
    if (props.disabled || props.readonly) return
    focusState.value = 'is-focus'
    if (inputValue.value !== '') {
        setTimeout(() => {
            clearShow.value = true
        }, 50) // 버튼 인터렉션 이슈 추가
    }
}
const inputBlur = (e) => {
    setTimeout(() => {
        if (!clearFocused.value) {
            clearShow.value = false
        }
    }, 150) // 버튼 탭포커스 이슈 추가
    focusState.value = ''
}
const inputEv = () => {
    if (inputValue.value !== '') clearShow.value = true
}

// [clearBtn] 포커스 이벤트
const btnFocus = () => {
    clearFocused.value = true
}

const btnBlur = () => {
    clearFocused.value = false
    setTimeout(() => {
        if (!document.activeElement.classList.contains('btn-value-clear')) {
            clearShow.value = false
        }
    }, 150)
}

// [clearBtn] 트랜지션훅
const btnBefEnt = (el) => {
    el.style.transform = 'scale(0)'
    el.style.opacity = 0
}
const btnEnt = (el, done) => {
    el.offsetHeight // 트리거 리플로우
    el.style.transition = 'transform 0.2s, opacity 0.2s'
    el.style.transform = 'scale(1)'
    el.style.opacity = 1
    done()
}
const btnLeave = (el, done) => {
    el.style.transition = 'transform 0.2s, opacity 0.2s'
    el.style.transform = 'scale(0)'
    el.style.opacity = 0
    setTimeout(() => {
        done()
    }, 200) // 이렇게까지 해야되나..
}
</script>

<style scoped>
</style>
