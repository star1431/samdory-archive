<template>
    <transition name="popup" appear>
        <div class="dialog" v-if="false">
            <div class="pop-wrap">
                <div class="pop-header">
                    <div class="inner">
                        <button class="close-btn" @click="$emit('leave')">
                            <span class="ally-hidden">닫기</span>
                        </button>
                    </div>
                </div>
                <div class="pop-body">
                    <div class="pop-content">
                    </div>
                </div>
            </div>
            <div class="dimmed"></div>
        </div>
    </transition>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'

const pageClass = ref(['CompanyInfo'])

computed(() => {

})
onMounted(() => {

})
watch(() => {

})
</script>

<style scoped>
</style>