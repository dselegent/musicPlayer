<template>
  <div id="musicSearch">
    <h2 class="searchName">{{ $route.query?.keywords }}</h2>
    <p class="searchNum">
      <span>{{ searchCount }}</span>
      个结果
    </p>
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="热门歌曲" name="popularMusic">
        <PopularMusic />
      </el-tab-pane>
      <el-tab-pane label="歌单" name="songSheet">
        <SearchSongSheet ref="SongSheetRef" />
      </el-tab-pane>
      <el-tab-pane label="专辑" name="album">
        <SearchAlbum ref="AlbumRef" />
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">MV</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'MusicSearch',
  }
</script>
<script setup lang="ts">
  import type { TabsPaneContext } from 'element-plus'
  import useStore from '@/store'
  import activeName from './common/index'

  // 仓库
  const { musicSearch } = useStore()
  let { searchCount } = storeToRefs(musicSearch)
  // 歌单组件实例
  const SongSheetRef: any = $ref(null)
  // 专辑组件
  const AlbumRef: any = $ref(null)

  const handleClick = (tab: TabsPaneContext) => {
    switch (tab.props.name) {
      case 'popularMusic':
        activeName.value = tab.props.name
        searchCount.value = musicSearch.searchMusicCount
        break
      case 'album':
        activeName.value = tab.props.name
        if (!musicSearch.searchAlbumCount) AlbumRef?.getAlbum()
        if (musicSearch.searchAlbumCount) searchCount.value = musicSearch.searchAlbumCount
        break
      case 'songSheet':
        activeName.value = tab.props.name
        if (!musicSearch.searchSongSheetCount) SongSheetRef?.getSongSheet()
        if (musicSearch.searchSongSheetCount) searchCount.value = musicSearch.searchSongSheetCount
        break
    }
  }
</script>

<style lang="scss" scoped>
  ##{music}Search {
    :deep(.el-scrollbar__view) {
      padding: 0;
      padding-right: 16px;
    }

    .searchName {
      margin: 12px;
      font: {
        size: 28px;
        weight: bold;
      }
    }

    .searchNum {
      margin: 0 12px;
      font-size: 14px;
      color: var(--el-text-color-regular);
    }

    .tabs {
      margin: 0 12px;

      :deep(.el-tabs__nav-wrap::after) {
        display: none;
      }
    }
  }
</style>
