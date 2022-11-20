<template>
  <div
    class="topSongSheet"
    :style="{
      backgroundImage: `url(${songSheet.coverImgUrl})`,
    }"
  >
    <aside class="left">
      <el-image :src="songSheet.coverImgUrl">
        <template #placeholder>
          <i i="ant-design-picture-filled" style="font-size: 68px; color: var(--el-color-info-light-3)"></i>
        </template>
      </el-image>
    </aside>
    <aside class="right">
      <!-- 标签 -->
      <section class="tag">
        <i i="ant-design-trophy-filled"></i>
        <span class="tagName">精品歌单</span>
      </section>
      <!-- 标题 -->
      <p class="songSheetName">
        {{ songSheet.name }}
      </p>
    </aside>
  </div>
</template>

<script setup lang="ts" name="TopSongSheet">
  interface Props {
    songSheet: any
  }
  withDefaults(defineProps<Props>(), {
    songSheet: {},
  })
</script>

<style lang="scss" scoped>
  // 精品歌单
  .topSongSheet {
    position: relative;
    display: flex;
    padding: 10px;
    overflow: hidden;
    background: no-repeat center / cover;
    border-radius: 26px;

    &:after {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background: inherit;
      content: '';
      filter: blur(5px);
    }

    .left {
      position: relative;
      z-index: 2;
      width: 90px;
      height: 90px;
      margin-right: 24px;
      overflow: hidden;
      border-radius: 26px;

      :deep(.el-image) {
        width: inherit;
        height: inherit;
      }
    }

    .right {
      position: relative;
      z-index: 2;
      // 标签
      .tag {
        width: 100px;
        height: 30px;
        line-height: 12px;
        text-align: center;
        border: 1px solid var(--el-color-warning);
        border-radius: 30px;
        margin: {
          top: 10px;
          bottom: 8px;
        }

        i {
          margin-right: 4px;
          font-size: 16px;
          color: var(--el-color-warning);
          transform: translateY(4px);
        }

        .tagName {
          font-size: 14px;
          color: var(--el-color-warning);
        }
      }
      // 标题
      .songSheetName {
        color: var(--el-color-white);
        font: {
          size: 16px;
          weight: 600;
        }
      }
    }
  }
</style>
