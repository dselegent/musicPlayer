<script setup lang="ts" name="SearchSuggestions">
  import useStore from '@/store'

  const router = useRouter()
  const { musicSearch } = useStore()
  const { searchSuggestions } = storeToRefs(musicSearch)

  // 点击单曲
  const goSearchMusic = e => {
    if (e.target.tagName != 'LI') return
    const keywordList = e.target.innerText.split('-')
    router.push({
      path: '/search',
      query: {
        keywords: keywordList[0] + keywordList[1],
      },
    })
  }
</script>

<template>
  <!-- <transition-group
    appear
    name="animate__animated animate__fade"
    enter-active-class="animate__fadeIn"
    leave-active-class="animate__fadeOut"
  > -->
  <div class="searchSuggestions">
    <p v-show="Object.keys(searchSuggestions).length === 0">
      没有搜索建议，可以按回车键直接搜索。
    </p>
    <!-- 每一个专栏 -->
    <div v-show="searchSuggestions?.songs?.length > 0" class="searchSuggestionsItem">
      <!-- 标题栏 -->
      <p class="title">
        <i i="ant-design-customer-service-outlined"></i>
        <span>单曲</span>
      </p>
      <!-- 建议列表 -->
      <ul class="suggestionList" @click="goSearchMusic">
        <!-- 建议项 -->
        <li v-for="song in searchSuggestions.songs" :key="song.id" class="suggestionItem">
          {{ song?.name }}
          <span>-</span>
          {{ song?.artists[0]?.name }}
        </li>
      </ul>
    </div>
    <!-- 每一个专栏 -->
    <div v-show="searchSuggestions?.artists?.length > 0" class="searchSuggestionsItem">
      <!-- 标题栏 -->
      <p class="title">
        <i i="ant-design-user-outlined"></i>
        <span>歌手</span>
      </p>
      <!-- 建议列表 -->
      <ul class="suggestionList">
        <!-- 建议项 -->
        <li
          v-for="artist in searchSuggestions.artists"
          :key="artist.id"
          class="suggestionItem"
          @click="$router.push(`/singerInformation?id=${artist?.id}`)"
        >
          {{ artist.name }}
        </li>
      </ul>
    </div>
    <!-- 每一个专栏 -->
    <div v-show="searchSuggestions?.albums?.length > 0" class="searchSuggestionsItem">
      <!-- 标题栏 -->
      <p class="title">
        <SvgIcon name="album" size="19px" />
        <span>专辑</span>
      </p>
      <!-- 建议列表 -->
      <ul class="suggestionList">
        <!-- 建议项 -->
        <li v-for="album in searchSuggestions.albums" :key="album.id" class="suggestionItem">
          {{ album?.name }}
          <span>-</span>
          {{ album?.artist?.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

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
          margin-right: 8px;
          font-weight: bold;
        }

        svg {
          margin-right: 10px;
        }
      }
      // 建议列表
      .suggestionList {
        // 建议项
        .suggestionItem {
          @extend .textEllipsis;
          padding-left: 36px;
          cursor: pointer;
          border-radius: 4px;

          &:hover {
            background-color: var(--el-fill-color-light);
          }
        }
      }
    }
  }
</style>
