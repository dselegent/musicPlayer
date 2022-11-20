//通用分页请求类型
export interface IPaginationParams {
  id: number
  limit: number
  offset: number
}

// artist类型
export interface IArtist {
  id: number
  name: string
  picUrl: string
  img1v1Url: string
  musicSize?: number
  albumSize?: number
  fansCount?: number
  [propName: string]: any
}

// songs类型
export interface ISongs {
  name: string
  ar: {
    id: number
    name: string
    [propName: string]: any
  }[]
  alia?: string | null[]
  dt: number
  al: {
    id: number
    name: string
    picUrl: string
    [propName: string]: any
  }
  [propName: string]: any
}

// playlists类型
export interface IPlaylists {
  id: number
  name: string
  coverImgUrl: string
  tags: string[]
  playCount: number
  creator: {
    nickname: string
    [propName: string]: any
  }
}
