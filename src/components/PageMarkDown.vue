<template>
    <div class="markdown-area">
        <!-- 포스트 제목 영역 -->
        <div class="markdown-header">
            <div class="slot-top">
                <span class="tag">update :  {{ metterUpdate }}</span>
            </div>
            <div class="title-box">
                <span class="title">{{ metterTitle }}</span>
            </div>
        </div>
        <!--// 포스트 제목 영역 -->

        <!-- 포스트 내용 영역 -->
        <div class="markdown-body">
            <!-- 목차 -->
            <div :class="['side-box', {'is-open':isToc}]">
                <div class="nav-layer">
                    <div class="layer-top">
                        <button class="toc-toggle" type="button" @click="toggleToc">
                            <span class="ally-hidden">목차 토글버튼</span>
                        </button>
                    </div>
                    <transition name="toc-slide">
                        <div v-if="isToc" class="layer-inner">
                            <span class="layer-title">목차</span>
                            <OverlayScrollbarsComponent :options="{ scrollbars: { autoHide: 'scroll' } }" defer>
                                <nav class="toc" v-if="toc.length">
                                    <ul>
                                        <template v-for="item in toc" :key="item.slug">
                                        <li v-if="item.level < 4" :class="`level-${item.level}`">
                                            <a href="javascript:void(0);" @click.prevent="scrollToElement(item.slug)">{{ item.text }}</a>
                                        </li>
                                        </template>
                                    </ul>
                                </nav>
                            </OverlayScrollbarsComponent>
                            <button class="toc-close" type="button" @click="toggleToc">
                                <span class="ally-hidden">목차 닫기</span>
                            </button>
                        </div>
                    </transition>
                </div>
            </div>
            <!--// 목차 -->

            <div class="inner" v-html="markdownHtml"></div>
        </div>
        <!--// 포스트 내용 영역 -->
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, inject } from 'vue'
import { marked, preprocessMarkdown, getToc, getMatterData } from '@/assets/js/markdownRenderer'
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue" 
// 마크다운 커스텀은 복잡해서 markdownRenderer 에서 렌더링해서 다시 받아옴

const props = defineProps({
    loader: {
        type: String,
        required: true
    }
})

// 오버레이스크롤바 때문에  layoutDefault 에서 쓴 스크롤바 props 가 아닌 provide 인젝 받아옴
const scrollbarRef = inject('scrollbarRef', ref(null))

// 앞단 매터정보
const metterTitle = ref('타이틀없음')
const metterUpdate = ref('0000.00')

// 마크다운, 목차
const markdownHtml = ref('')
const toc = ref([])

// 목차 토글용
const isToc = ref(false)
const toggleToc = () => {
    isToc.value = !isToc.value
}


onMounted(() => {
    // console.log('넌 누구냐', scrollbarRef.value)

    // 마크다운 커스텀한거 받아옴
    const markdownData = preprocessMarkdown(props.loader)
    const metterData = getMatterData()

    // 매터 정보 꽂음
    metterTitle.value = metterData.title || metterTitle.value
    metterUpdate.value = metterData.date || metterUpdate.value

    // marked 라이브러리 사용
    markdownHtml.value = marked(markdownData, {
        breaks: true,
        pedantic: false,
        gfm: true,
        mangle: false,
        headerIds: false,
    })
    // 목차 꽂음
    toc.value = getToc()
    // console.log(markdownHtml.value)
})

// 목차 클릭할때 layout의 오버레이스크롤 제어
const scrollToElement = (slug) => {
    const targetEl = document.getElementById(slug)
    const headerEl = document.querySelector('.header')
    const scrollInstance = scrollbarRef.value?.osInstance()
    const viewport = scrollInstance.elements().viewport

    // console.log('스크롤', scrollInstance, viewport)
    if (targetEl && headerEl && scrollInstance) {
        const headerH = headerEl.offsetHeight + 20
        const tagetOfTop = targetEl.getBoundingClientRect().top + viewport.scrollTop
        const offsetTop = tagetOfTop - headerH
        // console.log(
        //     `\n headerHeight : ` + headerHeight, 
        //     `\n targetEl.top : ` + targetEl.getBoundingClientRect().top, 
        //     `\n tagetOfTop : ` + tagetOfTop, 
        //     `\n offsetTop : ` + offsetTop,
        // )

        viewport.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        })
    }
}
</script>

<style scoped>
</style>
