<template>
  <div class=".singerAlbum">
    <!-- 专辑卡片 -->
    <el-card class="albumCard">
      <!-- 头部 -->
      <template #header>
        <div class="albumHeader">
          <span class="title">热门50首</span>
          <!-- 播放和收藏 -->
          <el-button link @click="handlePlayTop">
            <i i="ant-design-play-circle-outlined" />
          </el-button>
          <span class="sep">|</span>
          <el-button link>
            <i i="ant-design-heart-outlined" />
          </el-button>
        </div>
      </template>
      <!-- 主要内容 -->
      <div class="albumMain">
        <!-- 头像 -->
        <div class="albumAvatar">
          <img src="./images/top50.png" alt="top50" />
        </div>
        <el-skeleton :rows="8" animated :loading="albumLoading" :throttle="10">
          <template #default>
            <el-table
              :data="singerInformation.handleArtistTopSong(currentPage)"
              stripe
              :show-header="false"
            >
              <el-table-column width="340">
                <template #default="{ row, $index }">
                  <div style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                    {{ row.name }}
                    <span style="color: #b1b1b1" v-if="row?.alia[0]">
                      {{ `（${row?.alia[0]}）` }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="70" align="center">
                <template #default="{ row }">
                  {{ formatDate(row?.dt, 'mm:ss') }}
                </template>
              </el-table-column>
              <el-table-column align="right" width="150">
                <template #default="{ row }">
                  <el-button link @click="musicPlayer.addSongToPlayList(row)">
                    <i i="ant-design-heart-outlined" />
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
      <div style="display: flex; justify-content: center">
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="50"
        />
      </div>
    </el-card>
    <!-- 专辑卡片 -->
    <el-card
      class="albumCard"
      v-for="(artistAlbum, index) in artistAlbumList"
      :key="artistAlbum?.album?.id"
    >
      <!-- 头部 -->
      <template #header>
        <div class="albumHeader">
          <span class="title">{{ artistAlbum?.album?.name }}</span>
          <!-- 播放和收藏 -->
          <el-button link @click="handlePlayArtistalbum(index)">
            <i i="ant-design-play-circle-outlined" />
          </el-button>
          <span class="sep">|</span>
          <el-button link>
            <i i="ant-design-heart-outlined" />
          </el-button>
        </div>
      </template>
      <!-- 主要内容 -->
      <div class="albumMain">
        <!-- 头像 -->
        <div class="albumAvatar">
          <el-image :src="artistAlbum?.album?.picUrl" loading="lazy">
            <template #placeholder>
              <i
                i="ant-design-picture-filled"
                style="font-size: 100px; color: var(--el-color-info-light-3); margin-right: 12px"
              />
            </template>
          </el-image>
        </div>
        <el-skeleton :rows="8" animated :loading="albumLoading" :throttle="10">
          <template #default>
            <el-table :data="artistAlbum.songs.slice(0, 10)" stripe :show-header="false">
              <el-table-column width="340">
                <template #default="{ row, $index }">
                  <div style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                    {{ row.name }}
                    <span style="color: #b1b1b1" v-if="row?.al?.alia || ''">
                      {{ `（${row?.al?.alia[0]}）` || '' }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="70" align="center">
                <template #default="{ row }">
                  {{ formatDate(row?.dt, 'mm:ss') }}
                </template>
              </el-table-column>
              <el-table-column align="right" width="150">
                <template #default="{ row }">
                  <el-button link @click="musicPlayer.addSongToPlayList(row)">
                    <i i="ant-design-play-circle-outlined" />
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
    </el-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SingerAlbum',
};
</script>
<script setup lang="ts">
import useStore from '@/store';
import { usePlayer } from '@h/musicPlayer';
import albumLoading from './common/index';

const route = useRoute();
// 仓库
const { musicPlayer, singerInformation } = useStore();
let { artistAlbumList } = storeToRefs(singerInformation);

// 功能函数
const { downloadMusic } = usePlayer(musicPlayer);

// 当前页(top50列表使用)
let currentPage = $ref(1);
const pageSize = $ref(10);

// 播放全部top50
const handlePlayTop = () => {
  let songs = singerInformation.artistTopSongList;
  musicPlayer.playQueue = songs;
  musicPlayer.addSongToPlayList(songs[0]);
};

// 播放专辑
const handlePlayArtistalbum = index => {
  let songs = singerInformation?.artistAlbumList[index]?.songs;
  musicPlayer.playQueue = songs;
  musicPlayer.addSongToPlayList(songs[0]);
};

// 如果超过5s没有数据，则清除骨架屏
let timer;
onMounted(async () => {
  albumLoading.value = true;
  timer = setTimeout(() => {
    albumLoading.value = false;
  }, 5000);
  await singerInformation.getArtistTopSong(route.query?.id);
  albumLoading.value = false;
});

onUnmounted(() => {
  clearTimeout(timer);
  albumLoading.value = true;
});
</script>

<style lang="scss" scoped>
// 专辑卡片
.albumCard {
  width: 742px;
  // height: 200px;
  border-radius: 26px;
  margin-bottom: 24px;
  // 卡片头部
  :deep(.el-card__header) {
    padding: 3px 20px 7px;
  }
  // 卡片主体
  :deep(.el-card__body) {
    padding: 6px 12px;
  }
  // 头部
  .albumHeader {
    line-height: 24px;
    // 标题
    .title {
      margin-right: 28px;
      color: var(--el-text-color-regular);
      font: {
        size: 18px;
        weight: bold;
      }
    }
    // 播放和收藏
    i {
      font-size: 20px;
    }
    // 分割线
    .sep {
      font-size: 16px;
      margin: 0 12px;
      color: #ccc;
    }
  }
  // 主要内容
  .albumMain {
    display: flex;
    justify-content: space-between;
    .albumAvatar {
      flex-shrink: 0;
      margin-top: 4px;
      width: 120px;
      height: 120px;
      border-radius: 26px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      :deep(.el-image) {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    :deep(.el-table) {
      width: 584px !important;
      font-size: 13px;
      .el-table__cell {
        padding: 0;
      }
      thead {
        .cell {
          padding-left: 24px;
        }
      }
      tbody {
        .cell {
          padding: 0;
        }
      }
    }
  }
}
</style>
