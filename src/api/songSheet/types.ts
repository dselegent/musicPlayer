import type { IPlaylists } from '../types'

// 网友推荐歌单请求参数类型
export interface TopPlaylistParams {
  limit: number
  offset: number
  cat: string
}

// 网友推荐歌单返回值类型
export interface TopPlaylistRes {
  code: number
  total: number
  cat: string
  playlists: IPlaylists[]
  more: boolean
}

// 分类项类型
export type SubItemType = {
  name: string
  resourceCount: number
  imgId: number
  type: number
  category: number
  resourceType: number
  hot: boolean
  activity: boolean
}
// 歌单分类返回值类型
export interface PlaylistCatlistRes {
  code: number
  categories: {
    0: string
    1: string
    2: string
    3: string
    4: string
  }
  sub: SubItemType[]
  all: SubItemType
}

//  标签项类型
export type TagType = {
  activity?: boolean
  usedCount?: number
  hot?: boolean
  createTime?: number
  position?: number
  category?: number
  name: string
  id: number
  type?: number
}
// 热门歌单分类返回值类型
export interface PlaylistHotRes {
  code: number
  tags: TagType[]
}
