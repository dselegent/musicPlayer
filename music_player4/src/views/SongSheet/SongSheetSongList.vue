<template>
  <div class="songSheetSongList">
    <el-skeleton :rows="8" animated :loading="loading" :throttle="10">
      <template #default>
        <el-table :data="songList" stripe>
          <el-table-column label="歌曲名" sortable width="210">
            <template #default="{ row }">
              <!-- 歌名 -->
              <span style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                {{ row.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="歌手" sortable width="160">
            <template #default="{ row }">
              <span style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                <template v-for="(item, index) in row?.ar" :key="item.id" v-if="row?.ar">
                  <el-link @click="$router.push(`/singerInformation?id=${item.id}`)">
                    {{ item.name }}
                  </el-link>
                  <span v-if="index !== row?.ar?.length - 1">/</span>
                </template>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="专辑" sortable width="160">
            <template #default="{ row }">
              <span style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                {{ row?.al?.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="时间" sortable width="80">
            <template #default="{ row }">
              {{ formatDate(row?.dt, 'mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column width="140">
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
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SongSheetSongList',
};
</script>
<script setup lang="ts">
import { usePlayer } from '@h/musicPlayer';
import useStore from '@/store';

defineProps<{
  songList?: any;
  loading?: boolean;
}>();

const { musicPlayer } = useStore();
const { downloadMusic } = usePlayer(musicPlayer);
</script>

<style lang="scss" scoped>
.songSheetSongList {
  :deep(.el-table) {
    font-size: 14px;
    .el-button.is-link {
      font-size: 18px;
    }
  }
}
</style>
