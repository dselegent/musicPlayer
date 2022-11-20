<template>
  <div class="songSheet">
    <el-skeleton :rows="14" animated :loading="loading" :throttle="10">
      <template #default>
        <!-- 音乐列表 -->
        <el-scrollbar height="332px" ref="scrollbarRef">
          <el-table :data="searchSongSheetList" stripe @row-click="router.push(`/songSheet?id=${$event.id}`)">
            <el-table-column prop="name" label="歌单名称" width="235" sortable>
              <template #default="{ row }">
                <div style="display: flex">
                  <!-- 图片 -->
                  <el-image
                    style="
                      width: 56px;
                      height: 56px;
                      margin-right: 12px;
                      vertical-align: bottom;
                      border-radius: 20px;
                      flex-shrink: 0;
                    "
                    :src="row?.coverImgUrl"
                    loading="lazy"
                  >
                    <template #placeholder>
                      <i i="ant-design-picture-filled" style="font-size: 40px; color: var(--el-color-info-light-3)"></i>
                    </template>
                  </el-image>
                  <!-- 歌名 -->
                  <span style="overflow: hidden; line-height: 56px; text-overflow: ellipsis; white-space: nowrap">
                    {{ row.name }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="trackCount" label="歌曲数量" sortable align="center" />
            <el-table-column prop="playCount" label="播放数量" sortable align="center" />
            <el-table-column prop="bookCount" label="订阅数量" align="center" sortable />
            <el-table-column>
              <template #default="{ row }">
                <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
                  <span style="margin-right: 2px; font-size: 14px; color: var(--el-text-color-secondary)"> by </span>
                  {{ row?.creator?.nickname }}
                </div>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty description="暂无数据">
                <el-button type="primary">重新加载</el-button>
              </el-empty>
            </template>
          </el-table>
          <div style="display: flex; justify-content: center">
            <el-pagination
              v-model:currentPage="currentPage"
              v-model:page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="musicSearch?.searchSongSheetCount"
              @current-change="handleCurrentChange"
              :hide-on-single-page="musicSearch?.searchSongSheetCount <= 10"
            />
          </div>
        </el-scrollbar>
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'SearchSongSheet',
  }
</script>
<script setup lang="ts">
  import { ElMessage, ElScrollbar } from 'element-plus'

  import useStore from '@/store'
  import activeName from './common/index'

  defineExpose({
    getSongSheet,
  })

  const route = useRoute()
  const router = useRouter()
  const scrollbarRef = $ref<InstanceType<typeof ElScrollbar>>()
  // 仓库
  const { musicSearch } = useStore()
  const { searchSongSheetList, searchCount } = storeToRefs(musicSearch)
  // 加载状态
  let loading = $ref<boolean>(true)
  // 当前页
  let currentPage = $ref(1)
  const pageSize = $ref(10)
  // 切换页
  const handleCurrentChange = (val: number) => getSongSheet(val)

  // 初始化数据
  async function getSongSheet(currentPage = 1) {
    if (activeName.value !== 'songSheet') return
    loading = true
    try {
      await musicSearch.getMusicSearch({
        keywords: route.query?.keywords,
        offset: (currentPage - 1) * 10,
        type: 1000,
      })
      searchCount.value = musicSearch.searchSongSheetCount
    } catch (error: any) {
      ElMessage.error(error?.message)
    }
    // musicSearch.searchSongSheetList = musicSearch.searchPlayList;
    loading = false
    scrollbarRef?.setScrollTop(0)
  }

  // 如果超过5s没有数据，则清除骨架屏
  let timer
  onMounted(() => {
    if (musicSearch.searchSongSheetCount > 0) return (loading = false)
    timer = setTimeout(() => {
      loading = false
    }, 5000)
  })

  onUnmounted(() => {
    clearTimeout(timer)
  })
</script>

<style lang="scss" scoped>
  :deep(.el-table) {
    font-size: 14px;

    .el-table__row {
      cursor: pointer;
    }
  }
</style>
