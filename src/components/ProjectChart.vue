<template>
    
    <div class="chart-area bar" v-if="props.showYear">
        <div class="chart-header">
            <div class="text-box">
                <p class="title">프로젝트 연도별 수행 현황</p>
                <p class="sub-text">최근 6년 기준</p>
            </div>
        </div>
        <div class="chart-body">
            <apexchart 
                ref="refYear"
                type="bar"
                width="100%"
                height="100%"
                :key="seriesYear.length" 
                :options="chartYear" 
                :series="seriesYear">
            </apexchart>
        </div>
    </div>

    <div class="chart-area donut"  v-if="props.showEnter">
        <div class="chart-header">
            <div class="text-box">
                <p class="title">프로젝트 기업 유형</p>
                <p class="sub-text">발주처 업종 형태</p>
            </div>
        </div>
        <div class="chart-body">
            <apexchart 
                ref="refEnter"
                type="donut" 
                width="100%"
                height="100%"
                :key="seriesEnter.length" 
                :options="chartEnter" 
                :series="seriesEnter">
            </apexchart>
        </div>
    </div>
    
    <div class="chart-area donut" v-if="props.showStack">
        <div class="chart-header">
            <div class="text-box">
                <p class="title">프로젝트 개발 환경</p>
                <p class="sub-text">활용한 프레임워크</p>
            </div>
        </div>
        <div class="chart-body donut">
            <apexchart 
                ref="refStack"
                type="donut" 
                width="100%"
                height="100%"
                :key="seriesStack.length" 
                :options="chartStack" 
                :series="seriesStack">
            </apexchart>
        </div>
    </div>
    
</template>

<script setup>
import { ref, defineProps, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import { fetchProjects  } from '@/api/projectApi.js'

const props = defineProps({
    showYear: {
        type: Boolean,
        default: false
    },
    showEnter: {
        type: Boolean,
        default: false
    },
    showStack: {
        type: Boolean,
        default: false
    }
})

const refEnter = ref(null)
const refStack = ref(null)
const refYear = ref(null)

// 테마 감지 
const getTheme = () => {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
}
const theme = ref(getTheme())
// 연도차트 api
const seriesYear = ref([])
const chartYear = ref({
    chart: { type: 'bar',toolbar: {show: false} },
    plotOptions: {
        bar: { 
            barHeight: '60%',
            borderRadius: 6, 
            horizontal: true, 
            borderRadiusApplication: 'end', 
            distributed: true,
            // isDumbbell: false,
        },
    },
    xaxis: { categories: [] },
    colors: ['#238ed3', '#0b70fb', '#f64e60', '#059510', '#ffa800', '#7e6afd', '#03a917'],
    dataLabels: { enabled: true },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    legend: { show: true, position: 'top' },
    fill: { opacity: 1 },
    tooltip: { y: {formatter: (val) => {return `${val}`}} },
})

// 기업유형 차트 api
const seriesEnter = ref([])
const chartEnter = ref({
    chart: { type: 'donut' },
    plotOptions: {
        pie:  { customScale: 1.08, donut: {size: '50%'} }
    },
    stroke: { show: true, width: 3, colors: theme.value === 'light' ? ['#fff'] : ['#14181e'] },
    labels: [],
    colors: ['#238ed3', '#0b70fb', '#f64e60', '#059510', '#ffa800', '#7e6afd', '#03a917'],
    legend: { show: true, position: 'right' },
    dataLabels: { enabled: true },
    tooltip: { y: {formatter: (val) => {return `${val}`}} },
})

// 개발환경 차트 api
const seriesStack = ref([])
const chartStack = ref({
    chart: { type: 'donut' },
    plotOptions: {
        pie:  { customScale: 1.08, donut: {size: '50%'} }
    },
    stroke: { show: true, width: 3, colors: theme.value === 'light' ? ['#fff'] : ['#14181e'] },
    labels: [],
    colors: ['#238ed3', '#0b70fb', '#f64e60', '#059510', '#ffa800', '#7e6afd', '#03a917'],
    legend: { show: true, position: 'right' },
    dataLabels: { enabled: true },
    tooltip: { y: {formatter: (val) => {return `${val}`}} },
})


// 년도별 데이터 설정
const setYearData = (projects) => {
    const currentYear = 2024 // 기준날짜 (추후 유지할때 현재날짜 받아서 넣어야함)
    const yearArr = Array.from({ length: 6 }, (_, i) => currentYear - i)  // 최근 6년 까지
    const data = yearArr.map(year => {
        //지정한 년도들의 각각 총갯수 반환
        return projects.filter(project => project.year == year).length
    })
    seriesYear.value = [{ name: '프로젝트 횟수', data: data }]
    chartYear.value.xaxis.categories = yearArr
}

// 기업유형 데이터 설정
const setEnterData = (projects) => {
    // json 배열 순회 enter 값 누적계산
    const enterData = projects.reduce((acc, project) => {
        project.enter.forEach(enter => {
            // 'acc' 객체에 'enter' 키가 없으면 초기화
            if (!acc[enter]) {
                acc[enter] = 0
            }
            acc[enter] += 1
        })
        return acc 
        // 누적 객체 반환
    }, {})
    // 오브젝트 키 벨류 나눔
    const enterLabels = Object.keys(enterData)
    const enterSeries = Object.values(enterData)
    console.log(enterData)
    seriesEnter.value = enterSeries
    chartEnter.value.labels = enterLabels
}

// 개발환경 데이터 설정
const setStackData = (projects) => {
    // json 배열 순회 stack 값 누적계산
    const stackData = projects.reduce((acc, project) => {
        project.stack.forEach(stack => {
            // 'acc' 객체에 'stack' 키가 없으면 초기화
            if (!acc[stack]) {
                acc[stack] = 0
            }
            acc[stack] += 1
        })
        return acc
        // 누적 객체 반환
    }, {})
    // 오브젝트 키 벨류 나눔
    const stackLabels = Object.keys(stackData)
    const stackSeries = Object.values(stackData)
    seriesStack.value = stackSeries
    chartStack.value.labels = stackLabels
}

onMounted(async () => {
    const projects = await fetchProjects()
    setYearData(projects)
    setStackData(projects)
    setEnterData(projects)
    const observer = new MutationObserver(() => {
        theme.value = getTheme()
    })
    // theme 감지 (로컬스토리지 감지가 안되서 대응)
    const appEl = document.querySelector('#app')
    observer.observe(appEl, { attributes: true, attributeFilter: ['class'] })

    onBeforeUnmount(() => {
        observer.disconnect()
    })
})

watch(theme, (newTheme) => {
    // theme 감지 (로컬스토리지 감지가 안되서 대응)
    const enterVal = chartEnter.value
    const stackVal = chartStack.value
    enterVal.stroke.colors = newTheme === 'dark' ? ['#14181e'] : ['#fff']
    stackVal.stroke.colors = newTheme === 'dark' ? ['#14181e'] : ['#fff']
    if (refEnter.value) {
        refEnter.value.updateOptions({ stroke: enterVal.stroke })
    }
    if (refStack.value) {
        refStack.value.updateOptions({ stroke: enterVal.stroke })
    }
})

computed(() => {

})
</script>

<style scoped>
</style>