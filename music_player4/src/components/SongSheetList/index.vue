<template>
  <div class="songSheetList">
    <!-- 榜单项 -->
    <div
      class="songSheetItem"
      v-for="songSheet in songSheetList"
      :key="songSheet.id"
      @click="$router.push(`/songSheet?id=${songSheet.id}`)"
    >
      <!-- 图片 -->
      <div class="imgWrapper">
        <el-image :src="songSheet.coverImgUrl" loading="lazy">
          <template #placeholder>
            <i
              i="ant-design-picture-filled"
              style="font-size: 112px; color: var(--el-color-info-light-3)"
            />
          </template>
        </el-image>
      </div>
      <slot name="category" :songSheet="songSheet"></slot>
      <p class="count">
        <i i="ant-design-play-circle-outlined" />
        <span>{{ showNum(songSheet.playCount) }}</span>
      </p>
      <p class="name">{{ songSheet.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts" name="SongSheetList">
interface Props {
  songSheetList?: any;
}
withDefaults(defineProps<Props>(), {
  songSheetList: [],
});
</script>

<style lang="scss" scoped>
.songSheetList {
  display: flex;
  flex-wrap: wrap;
  // 榜单项
  .songSheetItem {
    position: relative;
    margin-bottom: 17px;
    cursor: pointer;
    &:not(:nth-child(5n)) {
      margin-right: 28px;
    }
    // 图片
    .imgWrapper {
      position: relative;
      :deep(.el-image) {
        img {
          width: 136px;
          height: 136px;
          border: 5px solid var(--el-border-color-light);
          border-radius: 26px;
          vertical-align: middle;
        }
      }
      @extend %imgScale;
      @extend %playIconCenter;
    }
    .count {
      @include songSheetTag($bottom: 17%, $right: 8%);
    }
    .name {
      width: 136px;
      padding: {
        left: 6px;
      }
      font-size: 14px;
      @extend .textEllipsis;
    }
  }
}
</style>
