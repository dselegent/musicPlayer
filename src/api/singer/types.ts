import type { IArtist } from '../types'

// 获取热门歌手数据返回值
export interface TopArtistsRes {
  code: number
  artists: IArtist[]
  more: boolean
}

// 获取歌手详情返回值类型
export interface ArtistDescRes {
  code: number
  briefDesc: string
  introduction: {
    ti: string
    txt: string
  }[]
  [propName: string]: any
}

// 获取相似歌手返回值类型
export interface SimilarArtistRes {
  code: number
  artists: IArtist[]
  msg?: string
}
