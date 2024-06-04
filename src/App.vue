<template>
    <Transition name="slide-fade">
        <component :is="layoutComponent">
            <router-view />
        </component>
    </Transition>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import LayoutDefault from '@/components/layout/LayoutDefault.vue'
import LayoutLogin from '@/components/layout/LayoutLogin.vue'

// 컴포넌트 목록 정의
const layoutComponents = {
    LayoutDefault,
    LayoutLogin
}
// Vue Router의 현재 경로 정보를 가져옴
const route = useRoute()

// 현재 라우트의 메타에서 레이아웃 정보를 가져오는 computed 속성 정의
const layoutComponent = computed(() => {
    const matched = route.matched.find(m => m.meta && m.meta.layout)
    if (matched && matched.meta.layout) {
        const layoutName = matched.meta.layout
        return layoutComponents[layoutName] || 'LayoutDefault'
    }
    return 'LayoutDefault'
})
</script>
<style scoped>
</style>
