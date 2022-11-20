import type { ISongs } from '../types'

// 歌手热门 50 首歌曲返回值类型
export interface ArtistTopSongRes {
  code: number
  songs: ISongs[]
  more: boolean
}

// 检测音乐是否有版权返回值类型
export interface CheckMusicRes {
  message: string
  success: boolean
}

// 音乐链接返回值类型
export interface PlayMusicApiRes {
  code: number
  data: {
    url: string
    [propName: string]: any
  }[]
}
