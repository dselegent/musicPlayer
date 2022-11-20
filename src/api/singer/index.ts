import type { TopArtistsRes, ArtistDescRes, SimilarArtistRes } from './types'

/*
调用此接口 , 可获取热门歌手数据
示例:https://dselegentmusic.cf/top/artists
*/
export const reqTopArtists = () => http.get<TopArtistsRes>(`top/artists?limit=5`)

/*
获取歌手详情
示例:https://dselegentmusic.cf/artist/desc
*/
export const reqArtistDesc = (id: number) => http.get<ArtistDescRes>(`artist/desc?id=${id}`)

/*
获取相似歌手
示例:https://dselegentmusic.cf/simi/artist
*/
export const reqSimilarArtist = (id: number) => http.get<SimilarArtistRes>(`simi/artist?id=${id}`)

/*
歌手分类列表
实例:https://dselegentmusic.cf/artist/list
*/
// { type, area, initial, limit, offset }
export const reqArtistList = params => service.get('artist/list', { params })
