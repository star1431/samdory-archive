<template>
    <component :is="layoutComponent">
        <router-view></router-view>
    </component>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import layoutDefault from '@/components/layout/layoutDefault.vue'

// 컴포넌트 목록 정의
const layoutComponents = {
    layoutDefault
}
// Vue Router의 현재 경로 정보를 가져옴
const route = useRoute()

// route의 meta에서 layout 정보를 가져오는 computed 속성 정의
const layoutComponent = computed(() => {
    const layoutName = route.meta.layout || 'layoutDefault'
    return layoutComponents[layoutName] || 'layoutDefault'
})
</script>
