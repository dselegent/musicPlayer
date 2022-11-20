<template>
  <div class="songSheet">
    <el-skeleton :rows="14" animated :loading="loading" :throttle="10">
      <template #default>
        <!-- 音乐列表 -->
        <el-scrollbar height="332px" ref="scrollbarRef">
          <el-table
            :data="searchAlbumList"
            stripe
            @row-click="$router.push(`/songAlbum?id=${$event.id}`)"
          >
            <el-table-column label="专辑名称" width="300" sortable>
              <template #default="{ row }">
                <div style="display: flex">
                  <!-- 图片 -->
                  <el-image
                    style="
                      width: 56px;
                      height: 56px;
                      vertical-align: bottom;
                      margin-right: 12px;
                      border-radius: 20px;
                      flex-shrink: 0;
                    "
                    :src="row?.picUrl"
                    loading="lazy"
                  >
                    <template #placeholder>
                      <i
                        i="ant-design-picture-filled"
                        style="font-size: 40px; color: var(--el-color-info-light-3)"
                      />
                    </template>
                  </el-image>
                  <!-- 歌名 -->
                  <span
                    style="
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      line-height: 56px;
                    "
                  >
                    {{ row.name }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="音乐人" sortable align="center">
              <template #default="{ row }">
                <el-link @click="$router.push(`/singerInformation?id=${row.artist?.id}`)">
                  {{ row?.artist?.name }}
                  <span style="color: #b1b1b1" v-if="row?.artist?.alias[0]">
                    {{ `（${row?.artist?.alias[0]}）` }}
                  </span>
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="公司" align="center" sortable>
              <template #default="{ row }">
                <div
                  v-if="typeof row?.company == 'string'"
                  style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis"
                >
                  <span
                    style="
                      font-size: 14px;
                      color: var(--el-text-color-secondary);
                      margin-right: 2px;
                    "
                  >
                    by
                  </span>
                  {{ row?.company }}
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
              :total="musicSearch?.searchAlbumCount"
              @current-change="handleCurrentChange"
              :hide-on-single-page="musicSearch?.searchAlbumCount <= 10"
            />
          </div>
        </el-scrollbar>
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SearchAlbum',
};
</script>
<script setup lang="ts">
import { ElScrollbar } from 'element-plus';

import useStore from '@/store';

defineExpose({
  getAlbum,
});

const route = useRoute();
const scrollbarRef = $ref<InstanceType<typeof ElScrollbar>>();
// 仓库
const { musicSearch } = useStore();

const { searchAlbumList, searchCount } = storeToRefs(musicSearch);
// 加载状态
let loading = $ref<boolean>(true);
// 当前页
let currentPage = $ref(1);
const pageSize = $ref(10);
// 切换页
const handleCurrentChange = (val: number) => getAlbum(val);

// 初始化数据
async function getAlbum(currentPage = 1) {
  loading = true;
  try {
    await musicSearch.getMusicSearch({
      keywords: route.query?.keywords,
      offset: (currentPage - 1) * 10,
      type: 10,
    });
    searchCount.value = musicSearch.searchAlbumCount;
  } catch (error: any) {
    ElMessage.error(error?.message);
  }
  loading = false;
  scrollbarRef?.setScrollTop(0);
}

// 如果超过5s没有数据，则清除骨架屏
let timer;
onMounted(() => {
  if (musicSearch.searchAlbumCount > 0) return (loading = false);
  timer = setTimeout(() => {
    loading = false;
  }, 5000);
});
</script>

<style lang="scss" scoped>
:deep(.el-table) {
  font-size: 14px;
  .el-table__row {
    cursor: pointer;
  }
}
</style>
