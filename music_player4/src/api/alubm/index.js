/*
获取歌手专辑
示例:https://dselegentmusic.cf/artist/album?id=783418
*/
export const reqArtistAlbum = params => service.get('/artist/album', params)

/*
获取专辑内容
示例:https://dselegentmusic.cf/album?id=32311
*/
export const reqAlbum = id => service.get(`album?id=${id}`)

/*
专辑动态信息
调用此接口 , 传入专辑 id, 可获得专辑动态信息,如是否收藏,收藏数,评论数,分享数
示例:https://dselegentmusic.cf/album/detail/dynamic?id=32311
*/
export const reqAlbumDetailDynamic = id => service.get(`album/detail/dynamic?id=${id}`)

/*
专辑评论
调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该专辑的所有评论 ( 不需要 登录 )
示例:https://dselegentmusic.cf/comment/album?id=32311
*/
export const reqCommentAlbum = ({ id, limit, offset }) =>
  service.get(`comment/album?id=${id}&limit=${limit}&offset=${offset}`)
