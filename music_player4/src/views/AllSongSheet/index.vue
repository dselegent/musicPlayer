<template>
  <div class="allSongSheet">
    <el-scrollbar ref="scrollbarRef" height="440px">
      <!-- 精品歌单 -->
      <!-- <el-skeleton :rows="4" animated :loading="topSongSheetLoading" :throttle="10"> -->
      <!-- <template #default> -->
      <TopSongSheet :song-sheet="songSheetList[0]" />
      <!-- </template> -->
      <!-- </el-skeleton> -->
      <!-- 选择器 -->
      <div class="section">
        <el-popover placement="bottom-start" width="386px" trigger="click" :teleported="false">
          <p style="margin-left: 18px; margin-bottom: 12px">
            <el-link @click="handleChange('全部歌单')">全部歌单</el-link>
          </p>
          <el-cascader-panel
            :options="allSongSheet.categoryList"
            :props="{ expandTrigger: 'hover' as ExpandTrigger, emitPath: false }"
            @change="handleChange"
          />
          <template #reference>
            <el-button round>
              {{ activeName }}
              <i i="ant-design-right-outlined" />
            </el-button>
          </template>
        </el-popover>
        <ul class="hotSectionList" @click="handleHotList">
          <li
            v-for="hot in playlistHot"
            :key="hot.id"
            class="hotSectionItem"
            :class="{
              active: hot.name === activeName,
            }"
          >
            {{ hot.name }}
          </li>
        </ul>
      </div>
      <!-- 歌单列表 -->
      <el-skeleton :rows="10" animated :loading="SongSheetListLoading" :throttle="10">
        <template #default>
          <SongSheetList
            v-infinite-scroll="infiniteScroll"
            :song-sheet-list="songSheetList"
            :infinite-scroll-immediate="false"
            :infinite-scroll-distance="1"
          >
            <template v-if="activeName === '全部歌单'" #category="{ songSheet }">
              <p class="category">
                {{ songSheet?.tags[0] }}
              </p>
            </template>
          </SongSheetList>
        </template>
      </el-skeleton>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts" name="AllSongSheet">
import { ExpandTrigger } from 'element-plus'
import LoadingSvg from './LoadingSvg.vue'
import useStore from '@/store'

const { allSongSheet } = useStore()
const { playlistHot, songSheetList, noMore } = storeToRefs(allSongSheet)
// 收集选中的数据
let activeName = $ref('全部歌单')
// loading
const topSongSheetLoading = $ref<boolean>(true)
let SongSheetListLoading = $ref<boolean>(true)
// 计数器
let offset = $ref(0)
// 当前请求状态
let reqStatus = $ref(true)

// 获取网友推荐歌单
const getTopPlaylist = async (offset, cat = '', flag = 'default') => {
  reqStatus = true
  await allSongSheet.getTopPlaylist(offset, cat, flag)
  SongSheetListLoading = false
  reqStatus = false
}

// 当选中节点变化时触发
const handleChange = cat => {
  SongSheetListLoading = true
  activeName = cat
  offset = 0
  getTopPlaylist(offset, cat, 'change')
}

// 点击热门分类
const handleHotList = e => {
  if (e.target.tagName !== 'LI') return
  handleChange(e.target.textContent)
}
// 无限滚动
const infiniteScroll = useDebounceFn(() => {
  if (reqStatus) return ElMessage.warning('上一次加载还没结束呢！')
  if (noMore.value) return ElMessage.error('没有更多歌单了！')
  ElNotification.closeAll()
  ElNotification({
    title: '加载中',
    icon: LoadingSvg,
  })
  offset += 15
  getTopPlaylist(offset, activeName)
}, 100)

onMounted(() => {
  allSongSheet.getPlaylistCatlist()
  allSongSheet.getPlaylistHot()
  getTopPlaylist(offset)
})
</script>

<style lang="scss" scoped>
.allSongSheet {
  // 级联选择器
  .section {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    font-size: 12px;
    .hotSectionList {
      display: flex;
      align-items: center;
      transform: translateX(-14px);
      height: 32px;
      .hotSectionItem {
        padding: 6px;
        margin-right: 4px;
        cursor: pointer;
        color: var(--el-text-color-regular);
        @mixin hotSectionItemActive() {
          color: var(--el-color-primary);
          text-decoration: underline;
          background: var(--el-color-primary-light-9);
          border-radius: 26px;
        }
        &.active {
          @include hotSectionItemActive();
        }
        &:hover {
          @include hotSectionItemActive();
        }
      }
    }
  }
  .category {
    @include songSheetTag($top: 7%, $left: 8%);
  }
}
</style>
