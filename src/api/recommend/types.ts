// banner项类型
export type BannerType = {
  targetId: number
  imageUrl: string
  url: string | null
  typeTitle: string
  [propName: string]: any
}

// banner( 轮播图 ) 数据返回值类型
export interface BannerRes {
  code: number
  banners: BannerType[]
}
