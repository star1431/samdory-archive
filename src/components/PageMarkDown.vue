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
            <div class="slot-bottom" v-if="false">
                <span class="update">update : {{ metterUpdate }}</span>
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
                            <nav class="toc" v-if="toc.length">
                                <ul>
                                    <li v-for="item in toc" :key="item.slug" :class="`level-${item.level}`">
                                        <a href="javascript:void(0);" @click.prevent="scrollToElement(item.slug)">{{ item.text }}</a>
                                    </li>
                                </ul>
                            </nav>
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

const props = defineProps({
    loader: {
        type: String,
        required: true
    }
})

const scrollbarRef = inject('scrollbarRef', ref(null))

const isToc = ref(false)
const toggleToc = () => {
    isToc.value = !isToc.value
}

const metterTitle = ref('타이틀없음')
const metterUpdate = ref('0000.00')

const markdownHtml = ref('')
const toc = ref([])

onMounted(() => {
    // console.log('Tlqkf', scrollbarRef.value)
    const markdownData = preprocessMarkdown(props.loader)
    const metterData = getMatterData()
    metterTitle.value = metterData.title || metterTitle.value
    metterUpdate.value = metterData.date || metterUpdate.value

    markdownHtml.value = marked(markdownData, {
        breaks: true,
        pedantic: false,
        gfm: true,
        mangle: false,
        headerIds: false,
    })
    toc.value = getToc()
})

const scrollToElement = (slug) => {
    const element = document.getElementById(slug)
    const header = document.querySelector('.header')
    const scrollInstance = scrollbarRef.value?.osInstance()
    const viewport = scrollInstance.elements().viewport

    console.log('스크롤', scrollInstance, viewport)
    if (element && header && scrollInstance) {
        const headerHeight = header.offsetHeight + 36
        const elementPosition = element.getBoundingClientRect().top + viewport.scrollTop
        const offsetPosition = elementPosition - headerHeight
        // console.log(
        //     `\n headerHeight : ` + headerHeight, 
        //     `\n element.top : ` + element.getBoundingClientRect().top, 
        //     `\n elementPosition : ` + elementPosition, 
        //     `\n offsetPosition : ` + offsetPosition,
        // )

        viewport.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })
    }
}
</script>

<style scoped>
</style>
