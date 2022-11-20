/*
默认搜索关键词
示例:https://dselegentmusic.cf/search/default
*/
export const reqMusicSearchDefault = _ => service.get('search/default')

/*
调用此接口,可获取热门搜索列表
示例：https://dselegentmusic.cf/search/hot/detail
*/
export const reqSearchHotDetail = _ => service.get('search/hot/detail')

/*
调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单信息
示例:https://dselegentmusic.cf/search/suggest?keywords=海阔天空
*/
export const reqSearchSuggestions = keywords => service.get(`search/suggest?keywords=${keywords}`)

/*
搜索音乐
示例:https://dselegentmusic.cf/cloudsearch?keywords=海阔天空&limit=20&offset=0&type=1
params:{
  keywords,
  type,
  limit,
  offset
}
*/
export const reqMusicSearch = params =>
  service('/cloudsearch', {
    method: 'get',
    params,
  })
