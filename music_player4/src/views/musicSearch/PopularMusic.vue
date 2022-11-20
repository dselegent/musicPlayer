<template>
  <div class="popularMusic">
    <el-skeleton :rows="14" animated :loading="loading" :throttle="10">
      <template #default>
        <!-- 音乐列表 -->
        <el-scrollbar height="332px" ref="scrollbarRef">
          <el-table :data="searchPlayList" stripe>
            <el-table-column label="歌曲名" width="235" sortable>
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
                    :src="row?.al?.picUrl"
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
            <el-table-column label="歌手" sortable align="center" width="150">
              <template #default="{ row }">
                <span style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                  <template v-for="(item, index) in row?.ar" :key="item.id" v-if="row?.ar">
                    <el-link
                      @click="
                        $router.push({
                          path: '/singerInformation',
                          query: {
                            id: item.id,
                          },
                        })
                      "
                    >
                      {{ item.name }}
                    </el-link>
                    <span v-if="index !== row?.ar?.length - 1">/</span>
                  </template>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="专辑" sortable align="center">
              <template #default="{ row }">
                <el-link @click="$router.push(`/songAlbum?id=${row?.al?.id}`)">
                  <span style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                    {{ row?.al?.name }}
                  </span>
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="时间" sortable align="center" width="76">
              <template #default="{ row }">
                {{ formatDate(row?.dt, 'mm:ss') }}
              </template>
            </el-table-column>
            <el-table-column align="right">
              <!-- 音乐播放、mv、下载 -->
              <template #default="{ row }">
                <el-button link @click="musicPlayer.addSongToPlayList(row)">
                  <i i="ant-design-play-circle-outlined" />
                </el-button>
                <el-button link>
                  <i i="ant-design-play-square-outlined" />
                </el-button>
                <el-button link @click="downloadMusic(row)">
                  <i i="ant-design-download-outlined" />
                </el-button>
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
              :total="musicSearch?.searchMusicCount"
              @current-change="handleCurrentChange"
              :hide-on-single-page="musicSearch?.searchMusicCount <= 10"
            />
          </div>
        </el-scrollbar>
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts">
export default {
  name: 'popularMusic',
};
</script>
<script setup lang="ts">
import { ElScrollbar } from 'element-plus';

import useStore from '@/store';
import { usePlayer } from '@h/musicPlayer';
import activeName from './common/index';

const route = useRoute();
let loading = $ref<boolean>(true);
// 仓库
const { musicPlayer, musicSearch } = useStore();
let { searchPlayList } = storeToRefs(musicSearch);
const currentPage = $ref<number>(1);
const pageSize = $ref<number>(10);
const { downloadMusic } = usePlayer(musicPlayer);

const scrollbarRef = $ref<InstanceType<typeof ElScrollbar>>();
const handleCurrentChange = (val: number) => getMusicSearch(val);

// 初始化数据
async function getMusicSearch(currentPage = 1) {
  if (activeName.value !== 'popularMusic') return;
  loading = true;
  try {
    await musicSearch.getMusicSearch({
      keywords: route.query?.keywords,
      offset: (currentPage - 1) * 10,
    });
  } catch (error: any) {
    ElMessage.error(error?.message);
  }
  loading = false;
  scrollbarRef!?.setScrollTop(0);
}

//监听路由的信息是否发生变化，如果发生变化，再次发起请求
watch(route, () => {
  if (route.path !== '/search') return;
  activeName.value = 'popularMusic';
  musicSearch.$patch(state => {
    state.searchSuggestions = {};
    state.searchCount = 0;
    state.searchMusicCount = 0;
    state.searchPlayList = [];
    state.searchSongSheetCount = 0;
    state.searchSongSheetList = [];
    state.searchAlbumCount = 0;
    state.searchAlbumList = [];
  });
  getMusicSearch();
});

onMounted(() => {
  if (musicSearch.searchMusicCount > 0) return (loading = false);
  getMusicSearch();
});
</script>

<style lang="scss" scoped>
.popularMusic {
  :deep(.el-table) {
    font-size: 14px;
    .el-button.is-link {
      font-size: 18px;
    }
  }
}
</style>
