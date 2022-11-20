<template>
  <!--  推荐歌单和音乐人排名榜 -->
  <section class="recommendSongSheetAndProducers">
    <!-- 猜你喜欢音乐歌单列表 -->
    <div class="playListContainer">
      <!-- 标题 -->
      <div class="playTitle">
        <div class="left">
          <i i="ant-design-heart-outlined" class="love"></i>
          <span class="text">猜你喜欢的歌单</span>
        </div>
        <div class="right">
          <span class="more">
            <el-link @click="$router.push('/allSongSheet')">查看全部 ></el-link>
          </span>
        </div>
      </div>
      <el-skeleton animated :loading="songSheetLoading" :throttle="10" :count="8">
        <template #template>
          <el-space direction="vertical" alignment="flex-start">
            <el-skeleton-item
              variant="image"
              style="width: 118px; height: 118px; margin-bottom: 8px; margin-left: 10px; border-radius: 26px"
            />
            <div style="display: flex; flex-direction: column; margin-left: 12px">
              <el-skeleton-item variant="h3" style="width: 104px; margin-bottom: 8px" />
              <el-skeleton-item variant="h3" style="width: 104px" />
            </div>
          </el-space>
        </template>
        <template #default>
          <!-- 歌单列表 -->
          <ul class="playList">
            <li
              class="playItem"
              v-for="song in songSheetList"
              :key="song.id"
              @click="$router.push(`songSheet?id=${song.id}`)"
            >
              <a href="javascript:;">
                <el-image :src="song?.coverImgUrl" loading="lazy">
                  <template #placeholder>
                    <i
                      i="ant-design-picture-filled"
                      style="font-size: 92px; color: var(--el-text-color-placeholder)"
                    ></i>
                  </template>
                </el-image>
                <p class="category">{{ song?.tags[0] }}</p>
                <p class="count">
                  <i i="ant-design-play-circle-outlined"></i>
                  <span>{{ showNum(song.playCount) }}</span>
                </p>
                <p class="playName">{{ song?.name }}</p>
                <p class="playAuthor">{{ song?.creator?.nickname }}</p>
              </a>
            </li>
          </ul>
        </template>
      </el-skeleton>
    </div>
    <div class="musicProducers">
      <div class="header">
        <h3 class="title">音乐制作人</h3>
        <span class="more">
          <el-link @click="$router.push('/allSinger')">查看全部 ></el-link>
        </span>
      </div>
      <el-skeleton animated :loading="topArtistsLoading" :throttle="10" :count="5">
        <template #template>
          <div style="display: flex; margin-bottom: 9px">
            <el-skeleton-item variant="circle" style="width: 50px; height: 50px" />
            <div style="display: flex; flex-direction: column; justify-content: center; width: 100%; margin-left: 20px">
              <el-skeleton-item variant="h3" style="width: 40%; transform: translateY(-23%)" />
              <el-skeleton-item variant="h3" style="width: 70%" />
            </div>
          </div>
        </template>
        <template #default>
          <!-- 音乐制作人 -->
          <div class="musicProducers">
            <!-- 制作人列表 -->
            <ul class="producerList">
              <li
                class="producerItem"
                v-for="artist in topArtistsList"
                :key="artist?.id"
                @click="$router.push(`/singerInformation?id=${artist?.id}`)"
              >
                <a href="javascript:;">
                  <div class="left">
                    <el-image :src="artist?.img1v1Url" loading="lazy">
                      <template #placeholder>
                        <SvgIcon name="pictureCircle" size="40px" style="color: var(--el-color-info-light-3)" />
                      </template>
                    </el-image>
                  </div>
                  <div class="right">
                    <div class="producerName">
                      <span>{{ artist?.name }}</span>
                      <img src="./images/authentication.png" alt="" />
                    </div>
                    <p class="info">
                      {{ (artist?.fansCount / 10000).toFixed(1) }}万粉丝 - {{ artist?.musicSize }}首歌
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </template>
      </el-skeleton>
    </div>
  </section>
</template>

<script lang="ts">
  export default {
    name: 'RecommendSongSheetAndProducers',
  }
</script>

<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon/index.vue'

  interface Props {
    topArtistsLoading: boolean
    topArtistsList: any
    songSheetLoading: boolean
    songSheetList: any
  }
  withDefaults(defineProps<Props>(), {
    topArtistsList: [],
    songSheetList: [],
  })
</script>

<style lang="scss" scoped>
  // 推荐歌单和音乐人排名榜
  .recommendSongSheetAndProducers {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    // 猜你喜欢音乐歌单列表
    .#{$playListPrefix}ListContainer {
      // 标题
      .#{$playListPrefix}Title {
        display: flex;
        padding: 0 12px;
        margin-bottom: 12px;
        font-size: 0;
        justify-content: space-between;
        align-items: center;

        .left {
          display: flex;
          align-items: center;

          .love {
            width: 20px;
            height: 20px;
            margin-right: 4px;
            color: var(--el-color-danger);
          }

          .text {
            font-size: 18px;
            color: var(--el-text-color-regular);
          }
        }

        .right {
          .more {
            @extend %homeMore;
          }
        }
      }
      // 歌单列表
      .#{$playListPrefix}List {
        @mixin nameAndAuthor {
          @extend .textEllipsis;
          width: 104px;
          padding-left: 6px;
        }
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        width: 512px;
        height: 293px;
        overflow: hidden;
        padding: 4px;
        // 歌单项
        .#{$playListPrefix}Item {
          position: relative;

          a {
            display: block;
          }

          :deep(.el-image) {
            @extend %imgScale;
            @extend %playIconCenter;

            img {
              @include textCenter('v', 110px);
              width: 110px;
              font-size: 12px;
              text-align: center;
              border: 5px solid var(--el-border-color-light);
              border-radius: 26px;
            }
          }
        }
        // 类别
        .category {
          @include songSheetTag($top: 7%, $left: 10%);
        }
        // 播放次数
        .count {
          @include songSheetTag($bottom: 27%, $right: 10%);
        }

        .#{$playListPrefix}Name {
          @include nameAndAuthor();
          margin-bottom: 4px;
          font-size: 12px;
          color: var(--el-text-color-regular);
        }
        .#{$playListPrefix}Author {
          @include nameAndAuthor();
          font-size: 12px;
          color: var(--el-text-color-secondary);
        }
      }
    }
  }
  // 音乐制作人
  .#{$themePrefix}Producers {
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 18px;

      .title {
        margin-right: 90px;
        font-size: 18px;
        color: var(--el-text-color-regular);
      }

      .more {
        @extend %homeMore;
      }
    }
    // 制作人列表
    .producerList {
      .producerItem {
        width: 240px;

        &:nth-child(-n + 4) {
          margin-bottom: 14px;
        }

        a {
          display: flex;

          .left {
            :deep(.el-image) {
              img {
                width: 44px;
                height: 44px;
                vertical-align: bottom;
                border-radius: 26px;
              }
            }
          }

          .right {
            margin-left: 20px;

            .producerName {
              line-height: 22px;

              span {
                display: inline-block;
                color: var(--el-text-color-regular);
                transform: translateY(-23%);
                font: {
                  size: 16px;
                  weight: bold;
                }
              }
            }

            .info {
              font-size: 14px;
              color: var(--el-text-color-secondary);
            }
          }
        }
      }
    }
  }
</style>
