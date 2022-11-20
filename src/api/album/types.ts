import type { IArtist, ISongs } from '../types'

// 歌手专辑返回值类型
export interface ArtistAlbumRes {
  code: number
  artist: IArtist
  hotAlbums: {
    id: number
    [propName: string]: any
  }[]
  more: boolean
}

// 获取专辑内容返回值类型
export interface AlbumRes {
  code: number
  album: IArtist
  songs: ISongs[]
  resourceState: boolean
}
