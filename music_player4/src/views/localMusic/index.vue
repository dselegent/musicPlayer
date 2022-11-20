<template>
  <div class="localMusic">
    <el-skeleton :rows="14" animated :loading="loading" :throttle="10">
      <template #default>
        <!-- 音乐列表 -->
        <el-scrollbar ref="scrollbarRef" height="440px">
          <el-table :data="localMusicList" stripe>
            <el-table-column prop="name" label="歌曲名" width="210" sortable>
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
            <el-table-column label="歌手" sortable align="center" width="180">
              <template #default="{ row }">
                <span style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                  <template
                    v-for="(item, index) in row?.song?.artists"
                    :key="item.id"
                    v-if="row?.song"
                  >
                    <el-link @click="$router.push(`/singerInformation?id=${item.id}`)">
                      {{ item.name }}
                    </el-link>
                    <span v-if="index !== row?.song?.artists?.length - 1">/</span>
                  </template>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="专辑" sortable align="center" width="160">
              <template #default="{ row }">
                <el-link @click="$router.push(`/songAlbum?id=${row?.song?.album?.id}`)">
                  <span
                    style="
                      display: inline-block;
                      width: 130px;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    "
                  >
                    {{ row?.song?.alias[0] }}
                  </span>
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="时间" sortable align="center" width="76">
              <template #default="{ row }">
                {{ formatDate(row.song?.duration, 'mm:ss') }}
              </template>
            </el-table-column>
            <el-table-column align="right" width="135">
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
                <el-button type="primary" @click="getLocalMusic">重新加载</el-button>
              </el-empty>
            </template>
          </el-table>
        </el-scrollbar>
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LocalMusic',
};
</script>
<script setup lang="ts">
import { ElScrollbar } from 'element-plus';
//  仓库
import useStore from '@/store';
import { usePlayer } from '@h/musicPlayer';

const { localMusic, musicPlayer } = useStore();
let { localMusicList } = storeToRefs(localMusic);
let loading = $ref<boolean>(true);
// 功能函数
const { downloadMusic } = usePlayer(musicPlayer);
const scrollbarRef = $ref<InstanceType<typeof ElScrollbar>>();

// 调用获取本地音乐数据函数
async function getLocalMusic() {
  try {
    await localMusic.getLocalMusic();
    loading = false;
  } catch (error: any) {
    ElMessage.error(error?.message);
  }
}
// 如果超过5s没有数据，则清除骨架屏
let timer;
onMounted(() => {
  getLocalMusic();
  timer = setTimeout(() => {
    loading = false;
  }, 5000);
});

onUnmounted(() => {
  clearTimeout(timer);
});
</script>

<style lang="scss" scoped>
.localMusic {
  :deep(.el-table) {
    font-size: 14px;
    .el-button.is-link {
      font-size: 18px;
    }
  }
}
</style>
