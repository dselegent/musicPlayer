<template>
  <!-- <transition-group
    appear
    name="animate__animated animate__fade"
    enter-active-class="animate__fadeIn"
    leave-active-class="animate__fadeOut"
  > -->
  <div class="searchSuggestions">
    <p v-show="Object.keys(searchSuggestions).length === 0">没有搜索建议，可以按回车键直接搜索。</p>
    <!-- 每一个专栏 -->
    <div class="searchSuggestionsItem" v-show="searchSuggestions?.songs?.length > 0">
      <!-- 标题栏 -->
      <p class="title">
        <i i="ant-design-customer-service-outlined" />
        <span>单曲</span>
      </p>
      <!-- 建议列表 -->
      <ul class="suggestionList" @click="goSearchMusic">
        <!-- 建议项 -->
        <li class="suggestionItem" v-for="song in searchSuggestions.songs" :key="song.id">
          {{ song?.name }}
          <span>-</span>
          {{ song?.artists[0]?.name }}
        </li>
      </ul>
    </div>
    <!-- 每一个专栏 -->
    <div class="searchSuggestionsItem" v-show="searchSuggestions?.artists?.length > 0">
      <!-- 标题栏 -->
      <p class="title">
        <i i="ant-design-user-outlined" />
        <span>歌手</span>
      </p>
      <!-- 建议列表 -->
      <ul class="suggestionList">
        <!-- 建议项 -->
        <li
          class="suggestionItem"
          v-for="artist in searchSuggestions.artists"
          :key="artist.id"
          @click="$router.push(`/singerInformation?id=${artist?.id}`)"
        >
          {{ artist.name }}
        </li>
      </ul>
    </div>
    <!-- 每一个专栏 -->
    <div class="searchSuggestionsItem" v-show="searchSuggestions?.albums?.length > 0">
      <!-- 标题栏 -->
      <p class="title">
        <SvgIcon name="album" size="19px"></SvgIcon>
        <span>专辑</span>
      </p>
      <!-- 建议列表 -->
      <ul class="suggestionList">
        <!-- 建议项 -->
        <li class="suggestionItem" v-for="album in searchSuggestions.albums" :key="album.id">
          {{ album?.name }}
          <span>-</span>
          {{ album?.artist?.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts" name="SearchSuggestions">
import useStore from '@/store';

const router = useRouter();
const { musicSearch } = useStore();
let { searchSuggestions } = storeToRefs(musicSearch);

// 点击单曲
const goSearchMusic = e => {
  if (e.target.tagName != 'LI') return;
  let keywordList = e.target.innerText.split('-');
  router.push({
    path: '/search',
    query: {
      keywords: keywordList[0] + keywordList[1],
    },
  });
};
</script>

<style lang="scss" scoped>
.searchSuggestions {
  font-size: 16px;
  line-height: 32px;
  //  每一个专栏
  .searchSuggestionsItem {
    // 标题栏
    .title {
      display: flex;
      align-items: center;
      padding-left: 12px;
      background-color: var(--el-fill-color-light);
      border-radius: 4px;
      i {
        font-weight: bold;
        margin-right: 8px;
      }
      svg {
        margin-right: 10px;
      }
    }
    // 建议列表
    .suggestionList {
      // 建议项
      .suggestionItem {
        padding-left: 36px;
        border-radius: 4px;
        cursor: pointer;
        @extend .textEllipsis;
        &:hover {
          background-color: var(--el-fill-color-light);
        }
      }
    }
  }
}
</style>
