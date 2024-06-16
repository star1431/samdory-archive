<template>
    <PopupUI :customClass="'alert'" :modelValue="modelControl"  @update:modelValue="newBinding">
        <div class="popup-wrap" role="document">
            <div class="popup-header">
                <div class="title-box">
                    <span class="title">{{ item.title }}</span>
                </div>
            </div>
            <OverlayScrollbarsComponent :options="{ scrollbars: { autoHide: 'scroll' } }" defer>
                <div class="popup-content">
                    <template v-if="item.innerHtml">
                        <div :class="['alert-inner', item.textAlign ? item.textAlign : '']" v-html="item.message"></div>
                    </template>
                    <template v-else>
                        <div :class="['alert-inner', item.textAlign ? item.textAlign : '']">
                            <p class="alert-text">{{ item.message }}</p>
                        </div>
                    </template>
                </div>
            </OverlayScrollbarsComponent>
            <div class="popup-footer">
                <div class="c-confirm-button-box">
                    <button type="button" class="ui-button sq-cancel size-small" v-if="item.cancelText && item.cancelText !== ''" @click="handleCancel">
                        {{ item.cancelText }}
                    </button>
                    <button type="button" class="ui-button sq-primary size-small"  v-if="item.confirmText && item.confirmText !== ''" @click="handleConfirm">
                        {{ item.confirmText }}
                    </button>
                </div>
            </div>
            <button class="button-close" @click="handleClose">
                <span class="ally-hidden">팝업닫기</span>
            </button>
        </div>
    </PopupUI>
</template>

<script setup>
import { defineProps, defineEmits, computed, onMounted } from 'vue'
import PopupUI from './PopupUI.vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'

/** ******************************************************************
* MessageBox 사용 방법
* 부모 마크업 : <MessageBox v-model="alertModel" :item="alertItem"/>
* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
* 스크립트 셋업
    import MessageBox from '@/components/popup/MessageBox.vue'
    const alertModel = ref(false)
    const alertItem = ref({
        title: '팝업타이틀',
        message: '팝업내용 \n 줄바꿈',
        textAlign : 'center'
        innerHtml : false,
        cancelText: '취소',
        confirmText: '확인',
        onCancel: () => {},
        onConfirm: () => {},
    })
* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
* item 오브젝트
* title       : 팝업헤더 타이틀
* message     : 백틱(`) 이면 v-html , 아니면 그냥 텍스트
* textAlign   : 텍스트 정렬 (기본 : 왼쪽 / center , right , left)
* innerHtml   : 메세지 내용 html 바인딩여부
* cancelText  : 취소버튼 (빈값이면 버튼없음)
* confirmText : 확인버튼 (빈값이면 버튼없음)
* onCancel    : () => {} 취소 클릭시 이벤트 실행
* onConfirm   : () => {} 확인 클릭시 이벤트 실행
*
* 취소든 확인이든 클릭하면 얼럿 닫힘 
    - 대신 .then() 사용해서 객체 안에 있는 것들 처리 끝난 후 닫힘
****************************************************************** */

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    modelValue: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue']) // 부모에서 v-model 양방향 바인딩

// [부모 <-> 메세지박스] 모델 양방향 바인딩
const modelControl = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
})

// [ 팝업UI <-> 메세지박스 <- 부모] 모델 값 전달
const newBinding = (value) => {
    emit('update:modelValue', value)
}

// 팝업 닫기
const handleClose = () => {
    emit('update:modelValue', false)
}

// 확인 처리
const handleConfirm = () => {
    if (props.item.onConfirm) {
        // 부모에서 객체 안에 비동기처리 중인지 아닌지 알수 없으니 resolve
        Promise.resolve(props.item.onConfirm()).then(() => {
            handleClose()
        }).catch((error) => {
            console.error('메세지박스 에러남 (confirm):', error)
        })
    } else {
        handleClose()
    }
}

// 취소 처리
const handleCancel = () => {
    if (props.item.onCancel) {
        // 부모에서 객체 안에 비동기처리 중인지 아닌지 알수 없으니 resolve
        Promise.resolve(props.item.onCancel()).then(() => {
            handleClose()
        }).catch((error) => {
            console.error('메세지박스 에러남 (cancel):', error)
        })
    } else {
        handleClose()
    }
}


onMounted(() => {
})
</script>

<style scoped>
</style>
