<template>
  <div class="playQueue">
    <p class="playQueueTitle">播放队列</p>
    <!-- 音乐列表 -->
    <el-scrollbar height="116px" ref="scrollbarRef">
      <el-table :data="musicPlayer.handlePlayList(currentPage)" stripe>
        <el-table-column prop="name" label="歌曲名" width="225" sortable>
          <template #default="{ row }">
            <div style="display: flex">
              <!-- 图片 -->
              <el-image
                style="width: 56px; height: 56px; margin-right: 12px; border-radius: 20px"
                :src="row?.picUrl || row?.al?.picUrl"
                loading="lazy"
              >
                <template #placeholder>
                  <i
                    i="ant-design-picture-filled"
                    style="font-size: 40px; color: var(--el-color-info-light-3); margin-right: 12px"
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
              <template v-for="(item, index) in row?.song?.artists" :key="item.id" v-if="row?.song">
                <el-link @click="$router.push(`/singerInformation?id=${item.id}`)">
                  {{ item.name }}
                </el-link>
                <span v-if="index !== row?.song?.artists?.length - 1">/</span>
              </template>
              <template v-for="(item, index) in row?.ar" :key="item.id" v-if="row?.ar">
                <el-link @click="$router.push(`/singerInformation?id=${item.id}`)">
                  {{ item.name }}
                </el-link>
                <span v-if="index !== row?.ar?.length - 1">/</span>
              </template>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="专辑" sortable align="center">
          <template #default="{ row }">
            <el-link @click="$router.push(`/songAlbum?id=${row?.song?.album?.id || row?.al?.id}`)">
              <span style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                {{ row?.song?.alias[0] || row?.al?.name }}
              </span>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="时间" sortable align="center" width="76">
          <template #default="{ row }">
            {{ formatDate(row?.song?.duration || row?.dt, 'mm:ss') }}
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
            <!-- 从播放队列中删除当前音乐 -->
            <el-popconfirm
              :title="`你确定要从播放队列中删除${row.name}吗？`"
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon-color="#626AEF"
              @confirm="confirmEvent(row.id)"
            >
              <template #reference>
                <el-button link>
                  <i i="ant-design-delete-outlined" />
                </el-button>
              </template>
            </el-popconfirm>
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
          :total="musicPlayer.playQueue.length"
          @current-change="scrollbarRef!?.setScrollTop(0)"
          :hide-on-single-page="musicPlayer.playQueue.length <= 10"
        />
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PlayQueue',
};
</script>
<script setup lang="ts">
import { ElScrollbar } from 'element-plus';
import useStore from '@/store';
import { usePlayer } from '@h/musicPlayer';

const { musicPlayer } = useStore();
const { downloadMusic } = usePlayer(musicPlayer);
let currentPage = $ref<number>(1);
let pageSize = $ref<number>(10);
const scrollbarRef = $ref<InstanceType<typeof ElScrollbar>>();

const confirmEvent = id => {
  musicPlayer.removeFromPlayQueue(id);
  ElMessage.success('删除成功');
};
</script>

<style lang="scss" scoped>
.playQueue {
  .playQueueTitle {
    margin: 12px;
    font: {
      size: 18px;
      weight: bold;
    }
  }

  :deep(.el-table) {
    font-size: 14px;
    .el-button.is-link {
      font-size: 18px;
    }
  }
}
</style>
