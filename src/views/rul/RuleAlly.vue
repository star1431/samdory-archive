<template>
    <div :class="['container', pageClass]">
        <div class="container-content">
            <PageTopSlot :title="title" :pagePath="pageClass" />

            <div class="section-area row">
                <div class="inner-col col-1 posts">
                    <div class="lottie-banner">
                        <LottieLoader :lottieData="lottieJson"/>
                    </div>
                    <!--
                        MIT License

                        Copyright (c) 2017 레진엔터테인먼트

                        Permission is hereby granted, free of charge, to any person obtaining a copy
                        of this software and associated documentation files (the "Software"), to deal
                        in the Software without restriction, including without limitation the rights
                        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                        copies of the Software, and to permit persons to whom the Software is
                        furnished to do so, subject to the following conditions:

                        The above copyright notice and this permission notice shall be included in all
                        copies or substantial portions of the Software.

                        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                        SOFTWARE.
                    -->
                    <PageMarkDown :loader="postMd"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import PageTopSlot from '@/components/PageTopSlot.vue'
import PageMarkDown from '@/components/PageMarkDown.vue'
import LottieLoader from '@/components/LottieLoader.vue'
import lottieJson from '@/assets/js/lottie/lottieRul.json'
import postMd from '@/posts/rul/웹접근성가이드.md' 


const title = ref('웹 접근성 가이드')
const pageClass = ref(['rul', 'RuleAlly'])

</script>

<style scoped>
</style>