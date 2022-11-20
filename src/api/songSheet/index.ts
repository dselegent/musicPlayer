import type { TopPlaylistParams, TopPlaylistRes, PlaylistHotRes, PlaylistCatlistRes } from './types'
/*
获取网友推荐歌单 ( 网友精选碟 )
示例：https://dselegentmusic.cf/top/playlist?limit=15&offset=0
*/
//
export const reqTopPlaylist = (params: TopPlaylistParams) => http.get<TopPlaylistRes>('top/playlist', { params })

/*
获取所有榜单摘要
示例：https://dselegentmusic.cf/toplist/detail
*/
export const reqToplistDetail = () => service.get('toplist/detail')

/*
调用此接口,可获取热门歌单分类,包含 category 信息
示例：https://dselegentmusic.cf/playlist/hot
*/
export const reqPlaylistHot = () => http.get<PlaylistHotRes>('playlist/hot')

/*
调用此接口,可获取歌单分类,包含 category 信息
示例：https://dselegentmusic.cf/playlist/catlist
*/
export const reqPlaylistCatlist = () => http.get<PlaylistCatlistRes>('playlist/catlist')

/* 
获取歌单详情
示例:https://dselegentmusic.cf/playlist/detail?id=24381616
*/
export const reqPlaylistDetail = (id: number) => service.get(`/playlist/detail?id=${id}`)

/*
获取歌单所有歌曲
示例：https://dselegentmusic.cf/playlist/track/all?id=3068013756&limit=10&offset=0
*/
export const reqAllPlaylist = ({ id, limit, offset = 0 }) =>
  service.get(`playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`)

/*
获取歌单评论
示例：https://dselegentmusic.cf/comment/playlist?id=19723756
*/
export const reqPlayListComment = ({ id, limit, offset }) =>
  service.get(`comment/playlist?id=${id}&limit=${limit}&offset=${offset}`)
