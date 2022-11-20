<template>
  <main id="musicHome">
    <el-scrollbar ref="scrollbarRef" height="440px">
      <!-- 横幅和推荐按钮 -->
      <BannerAndRecommendBtn
        :bannerLoading="bannerLoading"
        :bannerList="bannerList"
      ></BannerAndRecommendBtn>
      <!-- 推荐歌单和音乐人排名榜 -->
      <RecommendSongSheetAndProducers
        class="btnAndArtists"
        :topArtistsLoading="topArtistsLoading"
        :topArtistsList="topArtistsList"
        :songSheetLoading="songSheetLoading"
        :songSheetList="songSheetList"
      ></RecommendSongSheetAndProducers>
    </el-scrollbar>
  </main>
</template>

<script lang="ts">
export default {
  name: 'musicHome',
};
</script>

<script setup lang="ts">
import useStore from '@/store';

const { musicHome } = useStore();

const { songSheetList, bannerList, topArtistsList } = storeToRefs(musicHome);

// 加载状态
let bannerLoading = $ref<boolean>(true);
let songSheetLoading = $ref<boolean>(true);
let topArtistsLoading = $ref<boolean>(true);

// 获取网友推荐歌单
const getTopPlaylist = async () => {
  await musicHome.getTopPlaylist();
  songSheetLoading = false;
};

// 获取banner
const getBanner = async () => {
  await musicHome.getBanner();
  bannerLoading = false;
};

// 获取热门音乐人
const getTopArtists = async () => {
  await musicHome.getTopArtists();
  topArtistsLoading = false;
};

// 清除搜索loading
const clearLoading = () => {
  bannerLoading = false;
  songSheetLoading = false;
  topArtistsLoading = false;
};

// 如果超过5s没有数据，则清除骨架屏
let timer;
onMounted(() => {
  let day = diffDays(+new Date(), musicHome.reqTime);
  /*
    发请求的情况
    1. 有一个数据为空
    2. 天数差大于等于1
  */
  if (songSheetList.value.length && bannerList.value.length && topArtistsList.value.length && !day)
    return clearLoading();
  getBanner();
  getTopPlaylist();
  getTopArtists();
  musicHome.reqTime = +new Date();
  timer = setTimeout(clearLoading, 5000);
});
</script>

<style lang="scss" scoped></style>
