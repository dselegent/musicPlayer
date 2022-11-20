/*
获取网友推荐歌单 ( 网友精选碟 )
示例：https://dselegentmusic.cf/top/playlist?limit=15&offset=0
*/
export const reqTopPlaylist = (offset, limit, cat = '') =>
  service.get(`top/playlist?cat=${cat}&limit=${limit}&offset=${offset}`)

/*
获取所有榜单摘要
示例：https://dselegentmusic.cf/toplist/detail
*/
export const reqToplistDetail = _ => service.get('toplist/detail')

/*
调用此接口,可获取热门歌单分类,包含 category 信息
示例：https://dselegentmusic.cf/playlist/hot
*/
export const reqPlaylistHot = _ => service.get('playlist/hot')

/*
调用此接口,可获取歌单分类,包含 category 信息
示例：https://dselegentmusic.cf/playlist/catlist
*/
export const reqPlaylistCatlist = _ => service.get('playlist/catlist')

/* 
获取歌单详情
示例:https://dselegentmusic.cf/playlist/detail?id=24381616
*/
export const reqPlaylistDetail = id => service.get(`/playlist/detail?id=${id}`)

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
