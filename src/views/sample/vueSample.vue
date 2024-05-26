<!-- 복붙용 vue샘플 -->
<template>
    <div :class="['container', pageClass]">
    </div>
</template>

<script>
export default {
    name: 'HeaderComponent',
    inject: [''],
    components: {
    },
    props: {
    },
    computed: {
        routes() {
        },
    },
    setup() {
    },
    data(){
        return{
            pageClass: '페이지명'
        }
    },
    mounted(){
    },
    methods: {
    }
}
</script>
<!--
<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'

const pageClass = ref(['페이지명'])

computed(() => {

})
onMounted(() => {

})
watch(() => {

})
</script>
-->
<style lang="scss" scoped>
</style>
