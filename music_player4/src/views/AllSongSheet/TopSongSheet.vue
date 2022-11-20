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
          <i
            i="ant-design-picture-filled"
            style="font-size: 68px; color: var(--el-color-info-light-3)"
          />
        </template>
      </el-image>
    </aside>
    <aside class="right">
      <!-- 标签 -->
      <section class="tag">
        <!-- <el-icon :size="16" color="#e2a658"><Medal /></el-icon> -->
        <i i="ant-design-trophy-filled" />

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
  background: no-repeat center / cover;
  border-radius: 26px;
  overflow: hidden;
  &:after {
    content: '';
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    filter: blur(5px);
  }
  .left {
    position: relative;
    z-index: 2;
    width: 90px;
    height: 90px;
    margin-right: 24px;
    border-radius: 26px;
    overflow: hidden;
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
      border-radius: 30px;
      border: 1px solid var(--el-color-warning);
      margin: {
        top: 10px;
        bottom: 8px;
      }
      line-height: 12px;
      text-align: center;
      i {
        transform: translateY(4px);
        margin-right: 4px;
        color: var(--el-color-warning);
        font-size: 16px;
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
