import { defineStore } from 'pinia'
// 引入api
import useApi from '@/api'
import type { SingerInformationState } from './types'

const { album, song, singer } = useApi()
const useSingerInformationStore = defineStore('singerInformation', {
  state: (): SingerInformationState => {
    return {
      // 歌手简介
      artist: {
        id: 0,
        name: '',
        picUrl: '',
        img1v1Url: '',
      },
      // 歌手专辑简列表(只有专辑基本信息，不包含音乐)
      artistAlbumSimpleList: [],
      // 专辑总列表
      artistAlbumList: [],
      // 热门50首列表
      artistTopSongList: [],
      // 歌手详情
      artistDesc: {
        briefDesc: '',
        introduction: [],
      },
      // 相似歌手列表
      similarArtistList: [],
    }
  },
  actions: {
    // 获取歌手专辑
    async getArtistalbum({ id = 0, limit = 3, offset = 0 }) {
      const ret = await album.reqArtistAlbum({
        id,
        limit,
        offset,
      })
      if (ret.code !== 200) return ElMessage.error('获取专辑失败')
      this.artist = ret.artist
      // 将专辑id列表存入
      this.artistAlbumSimpleList = ret.hotAlbums
      const albumArr: any = []
      for (let i = 0; i < limit; i++) {
        albumArr.push(this.getAlbum(this.artistAlbumSimpleList[i]?.id))
      }
      return Promise.all(albumArr)
    },
    // 获取专辑内容
    async getAlbum(id = 0) {
      const ret = await album.reqAlbum(id)
      if (ret.code !== 200) return ElMessage.error('获取专辑内容失败')
      // 将新获取的专辑歌曲列表加入总列表
      this.artistAlbumList.push(ret)
    },
    // 获取歌手热门50首
    async getArtistTopSong(id = 0) {
      const ret = await song.reqArtistTopSong(id)
      if (ret.code !== 200) return ElMessage.error('获取歌手热门50首失败')
      this.artistTopSongList = ret.songs
    },
    // 获取歌手详情
    async getArtistDesc(id = 0) {
      const ret = await singer.reqArtistDesc(id)
      if (ret.code !== 200) return ElMessage.error('获取歌手详情失败')
      this.artistDesc.briefDesc = ret.briefDesc
      this.artistDesc.introduction = ret.introduction
    },
    // 获取相似歌手
    async getSimilarArtist(id = 0) {
      const ret = await singer.reqSimilarArtist(id)
      if (ret.code !== 200) return ElMessage.error(ret.msg)
      this.similarArtistList = ret.artists
    },
  },
  getters: {
    handleArtistTopSong: (state: SingerInformationState) => {
      return (currentPage: number) => state.artistTopSongList.slice((currentPage - 1) * 10, currentPage * 10)
    },
  },
})

export default useSingerInformationStore
