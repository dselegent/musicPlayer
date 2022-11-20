<template>
  <div class="bannerAndRecommendBtn">
    <!-- 每日推荐 -->
    <div class="dailyRecommend">
      <el-skeleton style="width: 240px" :loading="bannerLoading" animated :throttle="10">
        <template #template>
          <el-skeleton-item
            variant="image"
            style="width: 520px; height: 192px; margin-bottom: 60px; border-radius: 26px; transform: translateY(12px)"
          />
        </template>
        <template #default>
          <el-carousel :interval="4000" height="200px" type="card">
            <el-carousel-item v-for="banner in bannerList" :key="banner.targetId">
              <el-image :src="banner.imageUrl" @click="handleLink(banner.targetId, banner.url)">
                <template #placeholder>
                  <i
                    class="i-ant-design-picture-filled w-330px h-240px"
                    style="background-color: var(--el-color-info-light-3)"
                  ></i>
                </template>
              </el-image>
              <span class="typeTitle">{{ banner.typeTitle }}</span>
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-skeleton>
    </div>
    <!-- 推荐按钮 -->
    <div class="recommendedButton">
      <el-button type="primary" round size="large">每日推荐</el-button>
      <el-button type="warning" round size="large" @click="$router.push('/allSongSheet')"> 歌单 </el-button>
      <el-button color="#626aef" round size="large" @click="$router.push('/ranking')"> 排行榜 </el-button>
      <el-button type="success" round size="large">最新音乐</el-button>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'BannerAndRecommendBtn',
  }
</script>
<script setup lang="ts">
  interface Props {
    bannerLoading: boolean
    bannerList: {
      targetId: number
      imageUrl: string
      url: string | null
      typeTitle: string
      [propName: string]: any
    }[]
  }
  withDefaults(defineProps<Props>(), {
    bannerList: () => [],
  })

  const router = useRouter()

  // 专辑id跳转专辑页，url跳转新页面
  const handleLink = (albumId: number, url) => {
    if (albumId !== 0) return router.push(`/songAlbum?id=${albumId}`)
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', '_blank')
    a.click()
  }
</script>

<style lang="scss" scoped>
  .bannerAndRecommendBtn {
    display: flex;
    justify-content: space-between;
    // 每日推荐
    .dailyRecommend {
      width: 512px;

      .el-carousel__item {
        &.is-active {
          width: 75%;
          margin-left: -66px;
        }

        :deep(.el-image) {
          width: 100%;
          height: 100%;
          border-radius: 26px;
        }

        .typeTitle {
          position: absolute;
          right: 0;
          bottom: 0;
          padding: 6px 8px;
          color: var(--el-color-white);
          background-color: var(--el-color-primary);
          border-radius: 26px 0 26px 0/26px 0 26px 0;
          font: {
            size: 12px;
            weight: bold;
          }
        }
      }

      :deep(.el-carousel__indicators) {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 32px;

        .el-carousel__indicator {
          padding: 0 4px;

          .el-carousel__button {
            width: 10px;
            height: 10px;
            background: var(--el-text-color-secondary);
            border-radius: 50%;
          }

          &.is-active .el-carousel__button {
            background: var(--el-color-primary);
          }
        }
      }

      :deep(.el-carousel__arrow) {
        font-size: 18px;
        background-color: rgba(31, 45, 61, 0.5);
      }
    }
    // 推荐按钮
    .recommendedButton {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 244px;

      button {
        margin-left: 0;
      }
    }
  }
</style>
