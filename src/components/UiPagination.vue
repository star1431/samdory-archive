<template>
    <div class="ui-pagination">
        <span class="ally-hidden">
            총 페이지는 {{ totalPage }} 이며,
            현재 페이지는 {{ modelValue }} 입니다.
        </span>
        <div class="button-group">
            <button class="button-prev" type="button" @click="preEv" :disabled="modelValue === 1">
                <span class="ally-hidden">이전</span>
            </button>
            <div class="paging">
                <button 
                    class="button-number"
                    type="button"
                    v-for="page in numberControl" 
                    :key="page" 
                    @click="goToPage(page)"
                    :class="{ active: page === modelValue }">
                    <span class="text">{{ page }}</span>
                </button>
            </div>
            <button class="button-next" type="button" @click="nextEv" :disabled="modelValue === totalPage">
                <span class="ally-hidden">다음</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
    totalPage: {
        type: Number,
        required: true
    },
    modelValue: {
        type: Number,
        required: true
    }
})

const emits = defineEmits(['update:modelValue']) // 현재 대상 v-model 의 값 (currentPage)

// 넘버 제어
const numberControl = computed(() => {
    const total = props.totalPage                   // 전체 넘버
    const current = props.modelValue                // 현재 넘버
    const viewCnt = 2                               // 선택 값 기준 중심에서 양쪽 갯수
    const range = []                                // 번호추가 배열
    let start = Math.max(1, current - viewCnt)      // 시작넘버 값
    let end = Math.min(total, current + viewCnt)    // 마지막넘버 값

    // 현재 넘버가 viewCnt 이하일 때
    if (current <= viewCnt) {
        end = Math.min(total, 5)                    // total값이랑 5 중 제일 작은 수 할당 (화면 보이는 숫자갯수 최대5개 설정임)
    } else if (current > total - viewCnt) {         // 현재 넘버가 (전체 넘버 - viewCnt)보다 작으면
        start = Math.max(1, total - 4)              // 시작 넘버를 최대 (total - 4)로 설정
    }

    // 이제 담기
    for (let i = start; i <= end; i++) {
        range.push(i)
    }

    return range
})

const preEv = () => {
    if (props.modelValue > 1) {
        emits('update:modelValue', props.modelValue - 1)  // 이전 (-1)
    }
}

const nextEv = () => {
    if (props.modelValue < props.totalPage) {
        emits('update:modelValue', props.modelValue + 1) // 다음 (+1)
    }
}

const goToPage = (page) => {
    emits('update:modelValue', page) // 그 페이지 이동
}
</script>

<style scoped>
</style>
