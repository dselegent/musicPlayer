/*
调用此接口 , 可获取热门歌手数据
示例:https://dselegentmusic.cf/top/artists
*/
export const reqTopArtists = _ => service.get(`top/artists?limit=20`)

/*
获取歌手详情
示例:https://dselegentmusic.cf/artist/desc
*/
export const reqArtistDesc = id => service.get(`artist/desc?id=${id}`)

/*
获取相似歌手
示例:https://dselegentmusic.cf/simi/artist
*/
export const reqSimilarArtist = id => service.get(`simi/artist?id=${id}`)

/*
歌手分类列表
实例:https://dselegentmusic.cf/artist/list
*/
export const reqArtistList = ({ type, area, initial, limit, offset }) =>
  service.get(
    `artist/list?type=${type}&area=${area}&initial=${initial}&limit=${limit}&offset=${offset}`
  )
