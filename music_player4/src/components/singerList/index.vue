<template>
  <ul class="singerList">
    <li
      class="singerItem"
      v-for="artist in artistList"
      :key="artist.id"
      @click="goSingerInformation(artist.id)"
    >
      <a href="javascript:;">
        <el-image :src="artist.picUrl" loading="lazy">
          <template #placeholder>
            <i
              i="ant-design-picture-filled"
              style="font-size: 120px; color: var(--el-color-info-light-3)"
            />
          </template>
        </el-image>
        <p class="name">{{ artist.name }}</p>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts" name="SingerList">
import useStore from '@/store';

const { singerInformation } = useStore();

interface Props {
  artistList: any;
}

withDefaults(defineProps<Props>(), {
  artistList: [],
});

const router = useRouter();
// 去歌手页
const goSingerInformation = id => {
  singerInformation.$reset();
  router.push({
    path: '/singerInformation',
    query: {
      id,
    },
  });
};
</script>

<style lang="scss" scoped>
.singerList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .singerItem {
    margin-bottom: 12px;
    a {
      display: block;
      text-align: center;
      img {
        width: 140px;
        height: 140px;
        border-radius: 26px;
        overflow: hidden;
      }
      :deep(.el-image) {
        img {
          width: 140px;
          height: 140px;
          border-radius: 26px;
          overflow: hidden;
        }
      }
      .name {
        font-size: 14px;
        color: var(--el-text-color-regular);
        @extend .textEllipsis;
      }
    }
  }
}
</style>
