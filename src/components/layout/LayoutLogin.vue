<template>
    <div class="wrap" ui-layout="layoutLogin">
        <main class="main">
            <OverlayScrollbarsComponent 
                id="layoutLogin-scroll" 
                ref="scrollbarLoginRef"
                :options="{scrollbars:{autoHide:'scroll'}}" 
                defer>
                <RouterView name="content" />
            </OverlayScrollbarsComponent>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted  } from 'vue'
import { useRoute } from 'vue-router'
// import { RouterView, useRouter } from 'vue-router'
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue"



// const route = useRoute()

const scrollbarLoginRef = ref(null)

/**
 *  @os-initialized="scrollbarInit"
    @os-updated="scrollbarInitUpdate"
    @os-destroyed="scrollbarInitDestory"
    @os-scroll="scrollbarHandle"
 */
// const scrollbarInit = (instance) => {
//     console.log('[test] init', instance?.elements().viewport)
// };

// const scrollbarInitUpdate = (instance) => {
//     console.log('[test] update', instance?.elements())
// };

// const scrollbarInitDestory = (instance) => {
//     console.log('[test] destroy', instance?.elements())
// };

// const scrollbarHandle = (event) => {
//     console.log('[test] scroll', event)
// };

</script>

<style scoped>
</style>
