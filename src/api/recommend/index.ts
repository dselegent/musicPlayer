import type { BannerRes } from './types'

/* 
调用此接口 , 可获取 banner( 轮播图 ) 数据
示例:https://dselegentmusic.cf/banner
*/
export const reqBanner = () => http.get<BannerRes>('banner')
