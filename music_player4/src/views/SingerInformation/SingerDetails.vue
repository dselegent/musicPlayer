<template>
  <div class="singerDetails">
    <el-skeleton :rows="8" animated :loading="loading" :throttle="10">
      <template #default>
        <ul class="singerDetailList">
          <li class="detailItem">
            <h4 class="title">{{ artist?.name }}简介</h4>
            <p class="desc">{{ artistDesc.briefDesc }}</p>
          </li>
          <li
            class="detailItem"
            v-for="(introduction, index) in artistDesc?.introduction"
            :key="index"
          >
            <h4 class="title">{{ introduction?.ti }}</h4>
            <p
              class="desc"
              v-html="
                introduction?.txt.replace(/\n/g, `<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`)
              "
            ></p>
          </li>
        </ul>
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SingerDetails',
};
</script>
<script setup lang="ts">
import useStore from '@/store';

defineExpose({
  getArtistDesc,
});

const { singerInformation } = useStore();
let { artist, artistDesc } = storeToRefs(singerInformation);
let loading = $ref<boolean>(true);

// 初始化数据
async function getArtistDesc(id) {
  loading = true;
  await singerInformation.getArtistDesc(id);
  loading = false;
}

// 如果超过5s没有数据，则清除骨架屏
let timer;
onMounted(() => {
  timer = setTimeout(() => {
    loading = false;
  }, 5000);
});

onUnmounted(() => {
  clearTimeout(timer);
  loading = true;
});
</script>

<style lang="scss" scoped>
.singerDetails {
  > .singerDetailList {
    .detailItem {
      font-family: '微软雅黑';
      margin-bottom: 24px;
      .title {
        margin-bottom: 8px;
        color: var(--el-text-color-regular);
        font: {
          size: 16px;
          weight: bold;
        }
      }
      .desc {
        text-indent: 2em;
        font-size: 14px;
        color: var(--el-text-color-placeholder);
        line-height: 28px;
        white-space: pre-line;
      }

      &:first-child {
        .desc {
          white-space: normal;
        }
      }
    }
  }
}
</style>
