import type { IArtist, IPlaylists } from '@/api/types'
import type { BannerType } from '@/api/recommend/types'

export interface MusicHomeState {
  // 轮播数据
  bannerList: BannerType[]
  // 歌单列表
  songSheetList: IPlaylists[]
  // 歌单是否还有
  noMore: boolean
  // 热门音乐人列表
  topArtistsList: IArtist[]
  // 存储时间
  reqTime: number
}
