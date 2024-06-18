<template>
    <div :class="['container', pageClass]">
        <div class="container-content">
            <PageTopSlot :title="title" :pagePath="pageClass" />

            <div class="section-area row">
                <div class="inner-col col-1 type-expected">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import PageTopSlot from '@/components/PageTopSlot.vue'

const title = ref('네임 규칙')
const pageClass = ref(['rul', 'RuleName'])

computed(() => {

})
onMounted(() => {

})
</script>

<style scoped>
</style>