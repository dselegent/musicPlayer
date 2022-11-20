<script setup lang="ts" name="MusicPlayer">
  import { usePlayer, useStatus } from '@h/musicPlayer'
  import useStore from '@/store'

  // 仓库
  const { musicPlayer } = useStore()
  // 播放列表
  const { playQueue, currentMusicIndex, duration, currentTime, volume, currentOrder } = storeToRefs(musicPlayer)
  // 加载功能模块
  const { isPlay, orderList } = useStatus()

  const { handleTime, goPlayMusic, goPauseMusic, goPrevOrNextMusic, changeProgress, handleCommand, changeVolume } =
    usePlayer(musicPlayer)

  onMounted(() => {
    // 恢复上次播放状态
    // let currentIndex = JSON.parse(localStorage.getItem('musicPlayerStatus') || '0').currentMusicIndex;
    // let playQueue = musicPlayer.playQueue;
    // if (currentIndex >= 0 && playQueue.length) {
    //   currentMusicIndex.value = currentIndex;
    //   goPlayMusic(playQueue);
    //   setTimeout(goPauseMusic, 10);
    // }
  })
</script>

<template>
  <!-- 底部音乐播放器 -->
  <footer id="musicPlayer">
    <!-- 音乐详情 -->
    <div class="musicInfo">
      <el-image class="img" :src="playQueue[currentMusicIndex]?.al?.picUrl">
        <template #placeholder>
          <i i="ant-design-picture-filled" style="font-size: 40px; color: var(--el-color-info-light-3)"></i>
        </template>
        <template #error>
          <i i="ant-design-picture-filled" style="font-size: 40px; color: var(--el-color-info-light-3)"></i>
        </template>
      </el-image>
      <div>
        <p class="musicName">
          <el-tooltip :content="playQueue[currentMusicIndex]?.name" placement="top-start" effect="light">
            {{ playQueue[currentMusicIndex]?.name }}
          </el-tooltip>
        </p>
        <p class="musicAuthor">
          {{ playQueue[currentMusicIndex]?.ar[0]?.name }}
        </p>
      </div>
    </div>
    <div class="playerCenterContainer">
      <!-- 音乐控制面板 -->
      <div class="musicBtns">
        <!-- 播放顺序 -->
        <div class="orders">
          <el-dropdown @command="handleCommand">
            <img :src="orderList[currentOrder].img" class="show" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(order, index) in orderList" :key="index" :command="index">
                  <img :src="order.img" style="width: 20px; margin-right: 4px" />
                  <span style="font-size: 12px; line-height: 16px">{{ order.name }}</span>
                </el-dropdown-item>
                <el-dropdown-item divided disabled>
                  <img :src="orderList[currentOrder].img" style="width: 20px; margin-right: 4px" />
                  <span style="font-size: 12px; line-height: 16px">
                    {{ orderList[currentOrder].name }}
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <!-- 上一首、下一首、播放、暂停 -->
        <div class="control">
          <i i="ant-design-step-backward-filled" @click="goPrevOrNextMusic('prev')"></i>
          <i v-show="!isPlay" i="ant-design-play-circle-filled" @click="goPlayMusic"></i>
          <i v-show="isPlay" i="ant-design-pause-circle-filled" @click="goPauseMusic"></i>
          <i i="ant-design-step-forward-filled" @click="goPrevOrNextMusic('next')"></i>
          <i i="ant-design-sound-filled"></i>
          <el-slider
            v-model="volume"
            :min="0"
            :max="100"
            :show-tooltip="false"
            @click="changeVolume"
            @input="changeVolume"
          />
        </div>
      </div>
      <!-- 音乐进度条 -->
      <div class="progressContainer">
        <div class="start">
          {{ handleTime(currentTime) }}
        </div>
        <el-slider
          v-model="currentTime"
          :min="0"
          :max="duration"
          :show-tooltip="false"
          :disabled="playQueue.length === 0"
          @click="changeProgress"
        />
        <div class="end">
          {{ handleTime(duration) }}
        </div>
      </div>
    </div>
    <!-- 播放队列 -->
    <div class="playQueue">
      <router-link to="/playQueue">
        <el-button circle>
          <el-badge :value="playQueue.length" type="primary" :max="999">
            <i i="ant-design-menu-unfold-outlined"></i>
          </el-badge>
        </el-button>
      </router-link>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  // 音乐播放器
  ##{$themePrefix}Player {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 12px 24px;
    background-color: var(--el-bg-color);
    border-radius: 40px;
    // 音乐详情
    .#{$themePrefix}Info {
      display: flex;

      .img {
        display: inline-block;
        width: 54px;
        height: 54px;
        margin-right: 10px;
        border-radius: 20px;
      }

      div {
        .#{$themePrefix}Name {
          @extend .textEllipsis;
          width: 188px;
          font-size: 14px;
          color: var(--el-text-color-regular);
          margin: {
            top: 8px;
            bottom: 12px;
          }
        }
        .#{$themePrefix}Author {
          font-size: 12px;
          color: var(--el-text-color-secondary);
        }
      }
    }

    .playerCenterContainer {
      width: 460px;
      // 音乐控制面板
      .musicBtns {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 28px;

        i,
        img {
          cursor: pointer;
        }

        .orders {
          margin: {
            right: 6px;
          }

          &:deep(.el-dropdown) {
            .show {
              width: 26px;
            }
          }
        }
        // 上一首、下一首、播放、暂停
        .control {
          display: flex;
          align-items: center;

          i {
            width: 30px;
            height: 30px;
          }

          .el-slider {
            width: 80px;
            height: 6px;
          }
        }
      }
      // 音乐进度条
      .progressContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 28px;

        .el-slider {
          width: 380px;
          height: 6px;
        }

        .start,
        .end {
          font-size: 12px;
          color: var(--el-text-color-secondary);
        }
      }
    }

    // 播放队列
    .playQueue {
      width: 248px;
      text-align: right;

      button {
        border: none;

        i {
          font-size: 24px;
        }
      }
    }
  }
</style>
