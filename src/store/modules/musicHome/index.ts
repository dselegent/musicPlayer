import { defineStore } from 'pinia'
// 引入api
import useApi from '@/api'
import type { MusicHomeState } from './types'

const { songSheet, recommend, singer } = useApi()

const useMusicHomeStore = defineStore('musicHome', {
  state: (): MusicHomeState => {
    return {
      bannerList: [],
      songSheetList: [],
      noMore: false,
      topArtistsList: [],
      reqTime: 0,
    }
  },
  persist: {
    key: 'musicHomeData',
  },
  actions: {
    // 获取banner
    async getBanner() {
      const ret = await recommend.reqBanner()
      if (ret.code !== 200) return ElMessage.error('横幅图获取失败')
      this.bannerList = ret.banners
    },
    // 获取网友推荐歌单
    async getTopPlaylist() {
      const ret = await songSheet.reqTopPlaylist({
        cat: '',
        limit: 0,
        offset: 8,
      })
      if (ret.code !== 200) return ElMessage.error('操作频繁，请稍候再试')
      this.songSheetList = ret.playlists
      if (!ret.more) this.noMore = true
    },
    // 获取热门音乐人
    async getTopArtists() {
      const ret = await singer.reqTopArtists()
      if (ret.code !== 200) return ElMessage.error('音乐制作人失败')
      this.topArtistsList = ret.artists
    },
  },
})

export default useMusicHomeStore
