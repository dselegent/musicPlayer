import { defineStore } from 'pinia'
// 引入api
import useApi from '@/api'
import type { AllSongSheetState, CategoryType } from './types'

const { songSheet } = useApi()
const useAllSongSheetStore = defineStore('allSongSheet', {
  state: (): AllSongSheetState => {
    return {
      // 一级分类
      categories: {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
      },
      // 二级分类
      playlistCatlist: [],
      // 热门分类
      playlistHot: [],
      // 歌单列表
      songSheetList: [],
      // 歌单是否还有
      noMore: false,
    }
  },
  actions: {
    // 获取歌单分类
    async getPlaylistCatlist() {
      const ret = await songSheet.reqPlaylistCatlist()
      if (ret.code !== 200) return ElMessage.error('获取歌单分类失败')
      this.categories = ret.categories
      this.playlistCatlist = ret.sub
    },
    // 获取热门歌单分类
    async getPlaylistHot() {
      const ret = await songSheet.reqPlaylistHot()
      if (ret.code !== 200) return ElMessage.error('获取热门歌单分类失败')
      this.playlistHot = [{ id: 666, name: '全部歌单' }, ...ret.tags]
    },
    // 根据关键字获取网友推荐歌单
    async getTopPlaylist(offset, cat, flag, limit = 15) {
      const ret = await songSheet.reqTopPlaylist({ offset, limit, cat })
      if (ret.code !== 200) return ElMessage.error('操作频繁，请稍候再试')
      if (flag === 'change') this.songSheetList = []
      this.songSheetList = [...this.songSheetList, ...ret.playlists]
      if (!ret.more) this.noMore = true
    },
  },
  getters: {
    // 将分类数据变成组件需要的数据
    categoryList: (state: AllSongSheetState): CategoryType[] => {
      const list: CategoryType[] = []
      for (const key in state.categories) {
        list.push({
          category: key,
          label: state.categories[key],
          children: [],
        })
      }
      state.playlistCatlist.forEach(playlistCat => {
        list.forEach(item => {
          if (item.category == playlistCat.category) {
            item.children.push({
              value: playlistCat.name,
              label: playlistCat.name,
            })
          }
        })
      })
      return list
    },
  },
})

export default useAllSongSheetStore
