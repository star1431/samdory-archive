<template>
    <div :class="['container', pageClass]">
        <div class="container-content">
            <PageTopSlot :title="title" :pagePath="pageClass" />

            <div class="section-area row">
                <div class="inner-col col-1">
                    <div class="markdown-area">
                        <div v-html="markdownHtml"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PageTopSlot from '@/components/PageTopSlot.vue'
import marked from '@/assets/js/markdownRenderer'
import postMd from '@/posts/inf/안내사항test.md' 

const title = ref('파일서버')
const pageClass = ref(['inf', 'CompanyFile'])

// 마크다운을 HTML로 변환
const markdownHtml = ref('')
onMounted(() => {
    markdownHtml.value = marked(postMd, {
        breaks: true,
        pedantic: false,
        gfm: true,
        mangle: false,
        headerIds: false,
    })
    console.log(markdownHtml.value)
})
</script>

<style scoped>
</style>