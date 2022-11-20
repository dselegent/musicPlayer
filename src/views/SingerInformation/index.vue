<template>
  <div class="SingerInformation">
    <el-scrollbar height="410px" ref="scrollbarRef">
      <!-- 头部 -->
      <div class="header">
        <!-- 头像 -->
        <div
          class="singerAvatar"
          :style="{
            boxShadow: `var(--el-box-shadow)`,
          }"
        >
          <el-image :src="artist.picUrl">
            <template #placeholder>
              <i i="ant-design-picture-filled" style="font-size: 124px; color: var(--el-color-info-light-3)"></i>
            </template>
          </el-image>
        </div>
        <!-- 信息 -->
        <div class="info">
          <!-- 名字 -->
          <p class="name">{{ artist.name }}</p>
          <!-- 别名 -->
          <p class="alias" v-if="alias[0]">{{ alias[0] }}</p>
          <!-- 收藏和主页 -->
          <div class="controls">
            <el-button size="default" round>
              <i i="ant-design-plus-outlined"></i>
              收藏
            </el-button>
            <el-button size="default" round>
              <i i="ant-design-user-outlined"></i>
              个人主页
            </el-button>
          </div>
          <div class="others">
            <span>单曲数:{{ artist.musicSize }}</span>
            <span>专辑数:{{ artist.albumSize }}</span>
          </div>
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="专辑" name="Album">
          <SingerAlbum />
        </el-tab-pane>
        <el-tab-pane label="MV" name="MV">
          <SingerMv />
        </el-tab-pane>
        <el-tab-pane label="歌手详情" name="SingerDetails">
          <SingerDetails ref="SingerDetailsRef" />
        </el-tab-pane>
        <el-tab-pane label="相似歌手" name="SimilarSinger">
          <SimilarSinger ref="SimilarSingerRef" />
        </el-tab-pane>
      </el-tabs>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'SingerInformation',
  }
</script>
<script setup lang="ts">
  import type { TabsPaneContext } from 'element-plus'
  //
  import useStore from '@/store'
  import albumLoading from './common/index'

  const route = useRoute()
  // 仓库
  const { singerInformation } = useStore()
  let { artist } = storeToRefs(singerInformation)
  // tab激活状态
  let activeName = $ref('Album')
  // 歌手详情实例
  const SingerDetailsRef: any = $ref(null)
  // 相似歌手实例
  const SimilarSingerRef: any = $ref(null)

  const handleClick = (tab: TabsPaneContext) => {
    switch (tab.props.name) {
      case 'album':
        break
      case 'MV':
        break
      case 'SingerDetails':
        // 发请求
        if (singerInformation.artistDesc.introduction.length === 0) SingerDetailsRef?.getArtistDesc(route.query?.id)
        break
      case 'SimilarSinger':
        if (singerInformation.similarArtistList.length === 0) SimilarSingerRef?.getSimilarArtist(route.query?.id)
        break
    }
  }

  // 预防初始报错
  let alias = computed(() => artist.value.alias || [])

  //监听路由的信息是否发生变化，如果发生变化，再次发起请求
  watch(route, async () => {
    if (route.path !== '/singerInformation') return
    albumLoading.value = true
    singerInformation.$reset()
    singerInformation.artistDesc = {
      briefDesc: '',
      introduction: [],
    }
    activeName = 'Album'
    await singerInformation.getArtistalbum({
      id: route.query?.id,
    })
    await singerInformation.getArtistTopSong(route.query?.id)
    albumLoading.value = false
  })

  onMounted(async () => {
    await singerInformation.getArtistalbum({
      id: route.query?.id,
    })
  })

  onUnmounted(() => {
    singerInformation.$reset()
  })
</script>

<style lang="scss" scoped>
  .SingerInformation {
    padding: 24px 12px;

    // 头部
    .header {
      display: flex;
      // 头像
      .singerAvatar {
        width: 148px;
        height: 148px;
        margin-right: 32px;
        overflow: hidden;
        border-radius: 26px;

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
        // 别名
        .alias {
          font-size: 14px;
          color: var(--el-text-color-secondary);
        }
        // 收藏和主页
        .controls {
          margin-bottom: 12px;

          i {
            margin-right: 4px;
            font-size: 18px;
          }
        }
        // 其它
        .others {
          font: {
            size: 14px;
            weight: 500;
          }

          span {
            margin-right: 16px;
          }
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
  }
</style>
