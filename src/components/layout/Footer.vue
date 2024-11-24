<template>
    <footer class="footer">
        <div class="footer-inner">
            <span class="text" v-if="!gitHubURL">Copyright 2024. SAMDORY Corp. All rights reserved.</span>
            <span class="text" v-else>Copyright 2024. 정병천 star1431. All rights reserved.</span>
        </div>
    </footer>
</template>

<script setup>
import { ref, reactive, computed, onMounted, inject } from 'vue'

const gitHubURL = inject('gitHubURL')  // 개인포폴용 표시

computed(() => {

})
onMounted(() => {

})
</script>

<style scoped>
</style>
