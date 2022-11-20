<template>
  <div class="songAlbum">
    <el-scrollbar ref="scrollbarRef" height="440px">
      <!-- 头部 -->
      <div class="header">
        <!-- 头像 -->
        <div
          class="singerAvatar"
          :style="{
            boxShadow: `var(--el-box-shadow)`,
          }"
        >
          <el-image :src="albumDetails?.picUrl">
            <template #placeholder>
              <i i="ant-design-picture-filled" style="font-size: 140px; color: var(--el-color-info-light-3)"></i>
            </template>
          </el-image>
        </div>
        <!-- 信息 -->
        <div class="info">
          <!-- 名字 -->
          <p class="name">
            {{ albumDetails.name || '' }}
          </p>
          <!-- 创建者 -->
          <div class="creator">
            <span>歌手：</span>
            <template v-for="(item, index) in albumDetails?.artists" :key="item.id">
              <el-link @click="$router.push(`/singerInformation?id=${item.id}`)">
                {{ item.name || '' }}
              </el-link>
              <span v-if="index !== albumDetails?.artists?.length - 1">/</span>
            </template>
          </div>
          <p class="time">时间：{{ formatDate(albumDetails.publishTime || 0, 'yyyy-MM-dd') }}</p>
          <!-- 播放全部和收藏 -->
          <div class="controls">
            <el-button size="default" round type="primary" @click="handlePlaySongList">
              <i i="ant-design-play-circle-outlined"></i>
              <span>播放全部</span>
              <i i="ant-design-plus-outlined"></i>
            </el-button>
            <el-button size="default" round>
              <i i="ant-design-heart-outlined"></i>
              收藏({{ showNum(albumDetailDynamic.subCount) || 0 }})
            </el-button>
            <el-button size="default" round>
              <i i="ant-design-share-alt-outlined"></i>
              分享({{ showNum(albumDetailDynamic.shareCount) || 0 }})
            </el-button>
          </div>
          <!-- 简介 -->
          <div class="brief">
            <!-- 简介： -->
            <el-collapse v-model="collapseActiveNames">
              <el-collapse-item name="1" title="专辑介绍：">
                {{ albumDetails.description || '无' }}
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="歌曲列表" name="SongList">
          <SongSheetSongList :song-list="songList" :loading="songListLoading" />
        </el-tab-pane>
        <el-tab-pane :label="`评论(${albumDetailDynamic?.commentCount || '0'})`" name="Comment">
          <Comment
            :loading="commentLoading"
            :comment-list="commentList"
            :comment-count="albumDetailDynamic?.commentCount"
            @handle-scroll="scrollbarRef?.setScrollTop(180)"
            :getPlayListComment="getCommentAlbum"
          />
        </el-tab-pane>
      </el-tabs>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'SongAlbumView',
  }
</script>
<script setup lang="ts">
  import type { TabsPaneContext, ElScrollbar } from 'element-plus'

  import useStore from '@/store'

  const route = useRoute()
  // tab激活状态
  let activeName = $ref('SongList')
  let collapseActiveNames = $ref(['0'])

  // 仓库
  const { songAlbum, musicPlayer } = useStore()
  let { albumDetails, songList, commentList, albumDetailDynamic, commentCount } = storeToRefs(songAlbum)
  // 控制SongList组件
  let songListLoading = $ref<boolean>(true)
  // 控制Comment组件
  let commentLoading = $ref<boolean>(true)
  const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

  const handleClick = (tab: TabsPaneContext) => {
    switch (tab.props.name) {
      case 'SongList':
        break
      case 'Comment':
        if (!commentCount.value) getCommentAlbum({ id: route.query?.id, offset: 0 })
        break
    }
  }

  // 播放专辑
  const handlePlaySongList = () => {
    let songs = songAlbum?.songList
    musicPlayer.playQueue = songs
    musicPlayer.addSongToPlayList(songs[0])
  }

  // 如果超过5s没有数据，则清除歌曲列表骨架屏
  let songListTimer
  let commentTimer

  // 初始化歌曲列表数据
  async function _initAlbumData() {
    songListTimer = setTimeout(() => {
      songListLoading = false
    }, 5000)
    // 歌单歌曲列表
    await songAlbum.getAlbum(route.query?.id)
    songListLoading = false
  }

  // 初始化评论数据
  const getCommentAlbum = async ({ id, offset }) => {
    commentLoading = true
    commentTimer = setTimeout(() => {
      commentLoading = false
    }, 5000)
    await songAlbum.getCommentAlbum({ id, offset })
    commentLoading = false
  }

  onMounted(() => {
    _initAlbumData()
  })

  onUnmounted(() => {
    songAlbum.$reset()
    clearTimeout(songListTimer)
    clearTimeout(commentTimer)
    songListLoading = true
    commentLoading = true
  })

  //监听路由的信息是否发生变化，如果发生变化，再次发起请求
  watch(route, async () => {
    if (route.path !== '/songAlbum') return
    songAlbum.$reset()
    activeName = 'SongList'
    await songAlbum.getAlbum(route.query?.id)
  })
</script>

<style lang="scss" scoped>
  .songAlbum {
    // 头部
    .header {
      display: flex;
      padding-left: 8px;
      // 头像
      .singerAvatar {
        width: 168px;
        height: 168px;
        margin-right: 32px;
        overflow: hidden;
        border-radius: 26px;
        flex-shrink: 0;

        :deep(.el-image) {
          width: 100%;
          height: 100%;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      // 信息
      .info {
        // 名字
        .name {
          margin-bottom: 12px;
          color: var(--el-text-color-regular);
          font: {
            size: 26px;
            weight: bold;
          }
        }
        //   创建者
        .creator {
          margin-bottom: 8px;
          font-size: 0;

          span {
            font-size: 14px;
            color: var(--el-text-color-regular);
          }

          :deep(.el-link) {
            @extend span;
          }
        }

        .time {
          margin-bottom: 8px;
          font-size: 14px;
          color: var(--el-text-color-regular);
        }
        // 播放全部和收藏
        .controls {
          margin-bottom: 12px;

          button {
            font-size: 14px;

            i {
              margin-right: 4px;
              font-size: 18px;
            }
          }

          span {
            margin-right: 4px;
          }
        }
        //  简介
        .brief {
          font-size: 14px;
        }
      }
    }

    .tabs {
      :deep(.el-tabs__nav-wrap::after) {
        display: none;
      }

      :deep(.el-tabs__content) {
        padding: 4px;
        transform: translateX(-16px);
      }
    }
    // 折叠面板
    :deep(.el-collapse-item) {
      width: 530px;

      .el-collapse-item__header {
        height: 35px;
      }
    }
  }
</style>
