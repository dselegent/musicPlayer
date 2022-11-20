import { defineStore } from 'pinia'
import useApi from '@/api'

interface IMusicSearch {
  searchHistoryList: string[]
  hotList: any[]
  reqTime: number
  searchSuggestions: any
  searchCount: number
  searchMusicCount: number
  searchPlayList: object[]
  searchSongSheetCount: number
  searchSongSheetList: object[]
  searchAlbumCount: number
  searchAlbumList: object[]
}

const { search } = useApi()
const useMusicSearchStore = defineStore('musicSearch', {
  state: (): IMusicSearch => {
    return {
      // 搜索历史记录
      searchHistoryList: [],
      // 热门搜索列表
      hotList: [],
      // 存储时间
      reqTime: 0,
      // 搜索建议列表
      searchSuggestions: {},
      // 搜索数量
      searchCount: 0,
      // 搜索音乐数量
      searchMusicCount: 0,
      // 搜索音乐列表
      searchPlayList: [],
      // 搜索歌单数量
      searchSongSheetCount: 0,
      // 搜索歌单列表
      searchSongSheetList: [],
      // 搜索专辑数量
      searchAlbumCount: 0,
      // 搜索专辑列表
      searchAlbumList: [],
    }
  },
  persist: {
    key: 'musicSearchData',
    paths: ['searchHistoryList', 'hotList', 'reqTime'],
  },
  actions: {
    // 获取热门搜索列表
    async getsearchHotDetail() {
      const ret = await search.reqSearchHotDetail()
      if (ret?.code !== 200) return ElMessage.error('获取热门搜索列表失败')
      this.hotList = ret?.data
    },
    // 获取搜索音乐数据
    async getMusicSearch({ keywords, type = 1, limit = 10, offset = 0 }) {
      const ret = await search.reqMusicSearch({
        keywords,
        type,
        limit,
        offset,
      })
      if (ret?.code !== 200) return Promise.reject(new Error('搜索出错啦！'))
      switch (type) {
        // 歌曲
        case 1:
          this.searchMusicCount = ret?.result?.songCount
          this.searchCount = this.searchMusicCount
          this.searchPlayList = ret?.result?.songs
          // 如果有重复的就删除之前的，新添加一条
          const historyIndex = this.searchHistoryList.findIndex(item => item === keywords)
          if (historyIndex >= 0) this.searchHistoryList.splice(historyIndex, 1)
          this.searchHistoryList.unshift(keywords)
          break
        // 专辑
        case 10:
          this.searchAlbumCount = ret?.result?.albumCount
          this.searchCount = this.searchAlbumCount
          this.searchAlbumList = ret?.result?.albums
        // 歌单
        case 1000:
          this.searchSongSheetCount = ret?.result?.playlistCount
          this.searchCount = this.searchSongSheetCount
          this.searchSongSheetList = ret?.result?.playlists
      }
    },
    // 获取搜索建议
    async getSearchSuggestions(keywords) {
      const ret = await search.reqSearchSuggestions(keywords)
      if (ret?.code !== 200) return
      this.searchSuggestions = ret.result
    },
  },
})

export default useMusicSearchStore
