<template>
    <teleport to="#app">
        <transition name="fullPopup" appear>
            <div class="popup" role="dialog" ui-type="popupDetail">
                <div class="popup-wrap full" role="document">
                    <div class="popup-header">
                        <div class="title-box">
                            <span class="title">프로젝트 상세보기</span>
                        </div>
                    </div>
                    <OverlayScrollbarsComponent 
                        id="layoutDefault-scroll" 
                        :options="{ scrollbars: { autoHide: 'scroll' } }" 
                        defer>
                        <div class="popup-content">
                            <div class="project-info-area">
                                <div class="project-info-header">
                                    <div class="title-box">
                                        <span class="title">{{ item.name }}</span>
                                    </div>
                                </div>
                                <div class="project-info-body">
                                    <div class="preview-img-box">
                                        <div class="mockup-pc">
                                            <img class="pc" src="@/assets/images/project/work_01shinhanbank_detail01.png" alt="123" />
                                        </div>
                                        <div class="mockup-mobile">
                                            <img class="mobile" src="@/assets/images/project/work_01shinhanbank_detail_m01.png" alt="456" />
                                        </div>
                                    </div>
                                    <div class="info-group">
                                        <p><strong>시작년도 :</strong> {{ item.year }}</p>
                                        <p><strong>디바이스 :</strong> {{ item.dev.join(', ') }}</p>
                                        <p><strong>개발환경 :</strong> {{ item.stack.join(', ') }}</p>
                                        <p><strong>기업유형 :</strong> {{ item.enter.join(', ') }}</p>
                                        <p><strong>업무형태 :</strong> {{ item.project.join(', ') }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </OverlayScrollbarsComponent>
                    <div class="popup-footer">
                        <div class="c-confirm-button-box">
                            <button type="button" class="ui-button sq-primary" @click="closePopup">확인</button>
                        </div>
                    </div>
                    
                    <button class="button-close" @click="closePopup">
                        <span class="ally-hidden">팝업닫기</span>
                    </button>
                </div>
                <div class="dimmed" @click="closePopup"></div>
            </div>
        </transition>
    </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue" 

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const emits = defineEmits(['close'])

const closePopup = () => {
    emits('close')
}
</script>