import { defineStore } from 'pinia'
// 引入api
import useApi from '@/api'

interface ISongAlbum {
  albumDetails: any
  songList: any
  commentList: any
  albumDetailDynamic: any
  commentCount: number
}

const { album } = useApi()
export const useSongAlbumStore = defineStore('songAlbum', {
  state: (): ISongAlbum => {
    return {
      // 专辑详情
      albumDetails: {},
      // 歌单列表
      songList: [],
      // 评论列表
      commentList: [],
      // 是否收藏,收藏数,评论数,分享数
      albumDetailDynamic: {
        subCount: 0,
        shareCount: 0,
        commentCount: 0,
      },
      commentCount: 0,
    }
  },
  actions: {
    // 获取专辑内容
    async getAlbum(id) {
      const ret = await album.reqAlbum(id)
      if (ret?.code !== 200) return ElMessage.error('获取专辑内容失败')
      // 将新获取的专辑歌曲列表
      this.albumDetails = ret.album
      this.songList = ret.songs
      await this.getAlbumDetailDynamic(id)
    },
    // 获取专辑动态信息
    async getAlbumDetailDynamic(id) {
      const ret = await album.reqAlbumDetailDynamic(id)
      if (ret?.code !== 200) return ElMessage.error('获取专辑动态信息失败')
      this.albumDetailDynamic.subCount = ret.subCount
      this.albumDetailDynamic.shareCount = ret.shareCount
      this.albumDetailDynamic.commentCount = ret.commentCount
    },
    // 请求专辑评论
    async getCommentAlbum({ id, limit = 12, offset = 0 }) {
      const ret = await album.reqCommentAlbum({ id, limit, offset })
      if (ret?.code !== 200) return ElMessage.error('获取专辑评论失败')
      this.commentList = ret?.comments
      this.commentCount = ret?.total
    },
  },
})

export default useSongAlbumStore
