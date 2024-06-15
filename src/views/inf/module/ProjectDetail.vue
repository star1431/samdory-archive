<template>
    <div class="popup-wrap" role="document">
        <div class="popup-header">
            <div class="title-box">
                <span class="title">프로젝트 상세보기</span>
            </div>
        </div>
        <OverlayScrollbarsComponent :options="{ scrollbars: { autoHide: 'scroll' } }" defer>
            <div class="popup-content">
                <div class="project-info-area">
                    <div class="project-info-header">
                        <div class="title-box">
                            <span class="title">{{ item.name }}</span>
                        </div>
                    </div>
                    <div class="project-info-body">
                        <div :class="['preview-img-box', deviceClass]">
                            <div class="mockup-pc">
                                <template v-if="item.imgfile[0].pc !== null">
                                    <img class="pc" :src="getImageUrl(item.imgfile[0].pc)" alt="pc or tablet 이미지" />
                                </template>
                                <template v-else-if="item.imgfile[0].pc === null && item.dev.includes('pc') || item.dev.includes('tablet')">
                                    <div class="no-data-box">
                                        <span class="text">No Data</span>
                                    </div>
                                </template>
                            </div>
                            <div class="mockup-mobile">
                                <template v-if="item.imgfile[0].mb !== null">
                                    <img class="mobile" :src="getImageUrl(item.imgfile[0].mb)" alt="mobile 이미지" />
                                </template>
                                <template v-else-if="item.imgfile[0].mb === null && item.dev.includes('mobile')">
                                    <div class="no-data-box">
                                        <span class="text">No Data</span>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="info-group">
                            <div class="inner">
                                <ul class="info-list">
                                    <li class="item">
                                        <div class="item-name">
                                            <span class="name">시작년도</span>
                                        </div>
                                        <div class="item-content">
                                            <span class="text">{{ item.year }}</span>
                                        </div>
                                    </li>
                                    <li class="item">
                                        <div class="item-name">
                                            <span class="name">디바이스</span>
                                        </div>
                                        <div class="item-content">
                                            <span class="text">{{ item.dev.join(', ') }}</span>
                                        </div>
                                    </li>
                                    <li class="item">
                                        <div class="item-name">
                                            <span class="name">개발환경</span>
                                        </div>
                                        <div class="item-content">
                                            <span class="text">{{ item.stack.join(', ') }}</span>
                                        </div>
                                    </li>
                                    <li class="item">
                                        <div class="item-name">
                                            <span class="name">기업유형</span>
                                        </div>
                                        <div class="item-content">
                                            <span class="text">{{ item.enter.join(', ') }}</span>
                                        </div>
                                    </li>
                                    <li class="item">
                                        <div class="item-name">
                                            <span class="name">업무형태</span>
                                        </div>
                                        <div class="item-content">
                                            <span class="text">{{ item.project.join(', ') }}</span>
                                        </div>
                                    </li>
                                    <li class="item">
                                        <div class="item-name">
                                            <span class="name">사이트주소</span>
                                        </div>
                                        <div class="item-content">
                                            <span class="text">
                                                <a v-if="item.site[0].link1 !== null" class="item-link" :href="item.site[0].link1" target="_blank">사이트 이동</a>
                                                <span class="no-link" v-else>찾을 수 없음</span>
                                            </span>
                                        </div>
                                    </li>
                                    <li class="item size-full">
                                        <div class="item-name">
                                            <span class="name">업무내용</span>
                                        </div>
                                        <div class="item-content">
                                            <span class="text">{{ item.work.join(', ') }}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </OverlayScrollbarsComponent>
        <div class="popup-footer">
            <div class="c-confirm-button-box">
                <button type="button" class="ui-button sq-primary" @click="$emit('close')">확인</button>
            </div>
        </div>
        
        <button class="button-close" @click="$emit('close')">
            <span class="ally-hidden">팝업닫기</span>
        </button>
    </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue" 

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const deviceClass = computed(() => {
    if (props.item.dev.includes('pc') && props.item.dev.includes('mobile')) {
        return ''
    }
    if (props.item.dev.includes('pc') || props.item.dev.includes('tablet')) {
        return 'pc-only'
    }
    if (props.item.dev.includes('mobile')) {
        return 'mb-only'
    }
    return ''
})

const getImageUrl = (filename) => {
    console.log('filename', filename)
    if (!filename) return ''
    try {
        return require(`@/assets/images/project/${filename}`)
    } catch (error) {
        console.error(`이미지 없단다 : ${filename}`)
        return ''
    }
}
</script>

<style scoped>
</style>
