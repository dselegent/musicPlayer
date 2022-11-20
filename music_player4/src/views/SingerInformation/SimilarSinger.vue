<template>
  <div class="similarSinger">
    <el-skeleton :rows="8" animated :loading="loading" :throttle="10">
      <template #default>
        <SingerList :artistList="similarArtistList"></SingerList>
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SimilarSinger',
};
</script>
<script setup lang="ts">
import useStore from '@/store';

defineExpose({
  getSimilarArtist,
});

const { singerInformation } = useStore();
let { similarArtistList } = storeToRefs(singerInformation);
let loading = $ref<boolean>(true);

// 初始化数据
async function getSimilarArtist(id) {
  loading = true;
  await singerInformation.getSimilarArtist(id);
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
