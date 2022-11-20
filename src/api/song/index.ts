import type { ArtistTopSongRes, CheckMusicRes, PlayMusicApiRes } from './types'

/*
获取推荐新音乐
示例:https://dselegentmusic.cf/personalized/newsong
*/
export const reqNewMusic = () => service.get(`personalized/newsong`)

/*
歌手热门 50 首歌曲
示例:https://dselegentmusic.cf/artist/top/song?id=783418
*/
export const reqArtistTopSong = (id: number) => http.get<ArtistTopSongRes>(`artist/top/song?id=${id}`)

/*
检测音乐是否有版权
示例:https://dselegentmusic.cf/check/music?id=1977945950
*/
export const reqCheckMusic = (id: number) => http.get<CheckMusicRes>(`check/music?id=${id}`)

/*
获取音乐链接
示例：https://dselegentmusic.cf/song/url?id=1461159773
*/
export const reqPlayMusicApi = (id: number) => http.get<PlayMusicApiRes>(`song/url?id=${id}`)
