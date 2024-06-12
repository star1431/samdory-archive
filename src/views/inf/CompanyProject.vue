<template>
    <div :class="['container', pageClass]">
        <div class="container-content">
            <PageTopSlot :title="title" :pagePath="pageClass" />

            <div class="section-area row">
                <div class="inner-col col-1-2 chart">
                    <ProjectChart :showEnter="true" />
                </div>
                <div class="inner-col col-1-2 chart">
                    <ProjectChart :showStack="true" />
                </div>
                <div class="inner-col col-1 chart">
                    <ProjectChart :showYear="true" />
                </div>
                <div class="inner-col col-1 table">
                    <div class="table-area">
                        <div class="table-header">
                            <div class="text-box">
                                <p class="title">프로젝트 목록</p>
                            </div>
                            <div class="slot-bottom">
                                <p class="sub-text">총 <span class="count">{{ tableData.length }}</span> 건</p>
                            </div>
                        </div>
                        <div class="table-body">
                            <div class="pure-board-list-table">
                                <table>
                                    <caption>통계</caption>
                                    <thead class="ally-hidden">
                                        <tr>
                                            <th scope="col">목록 번호</th>
                                            <th scope="col">목록 내용</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="row" v-for="(item, i) in paginatedData" :key="item.id">
                                            <td class="cell-num">
                                                <div class="num">
                                                    <span>{{ tableData.length - ((currentPage - 1) * itemsPerPage + i) }}</span>
                                                </div>
                                            </td>
                                            <td class="cell-content">
                                                <div class="item">
                                                    <div class="item-head">
                                                        <div class="title-box">
                                                            <a class="title" href="javascript:void(0)">{{ item.name }}</a> 
                                                        </div>
                                                    </div>
                                                    <div class="item-body">
                                                        <ul class="item-sub-list">
                                                            <li><span class="txt">{{ item.year }}</span></li>
                                                            <li><span class="txt">{{ item.dev.join(', ') }}</span></li>
                                                            <li><span class="txt">{{ item.stack.join(', ') }}</span></li>
                                                            <li><span class="txt">{{ item.enter.join(', ') }}</span></li>
                                                            <li><span class="txt">{{ item.project.join(', ') }}</span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr class="row nodata" v-if="tableData.length === 0">
                                            <td class="cell">
                                                <div class="nodata-box icon-1">
                                                    <p class="txt">데이터 없음</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="table-footer">
                            <UiPagination :totalPage="totalPages" v-model="currentPage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import PageTopSlot from '@/components/PageTopSlot.vue'
import { fetchProjects } from '@/api/projectApi.js'
import ProjectChart from '@/components/ProjectChart.vue'
import UiPagination from '@/components/UiPagination.vue'

const title = ref('프로젝트 통계')
const pageClass = ref(['inf', 'CompanyProject'])

const tableData = reactive([])
const itemsPerPage = 4
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(tableData.length / itemsPerPage))

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return tableData.slice(start, start + itemsPerPage)
})

onMounted(async () => {
    try {
        const projects = await fetchProjects()
        tableData.splice(0, tableData.length, ...projects)
    } catch (error) {
        console.error('[CompanyProject.vue || fetchProjects 에러] :', error)
    }
})
</script>

<style scoped>
</style>
