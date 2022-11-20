import { defineStore } from 'pinia'
// 引入api
import { usePlayer } from '@h/musicPlayer'
import useApi from '@/api'
import type { ISongs } from '@/api/types'
import type { MusicPlayerState } from './types'

const { song } = useApi()
const useMusicPlayerStore = defineStore('musicPlayer', {
  state: (): MusicPlayerState => {
    return {
      // 播放音乐列表
      playQueue: [],
      // 当前播放歌曲索引
      currentMusicIndex: -1,
      // 当前播放时间
      currentTime: 0,
      // 音乐时长
      duration: 0,
      // 音量
      volume: 100,
      // 播放顺序
      currentOrder: 0,
    }
  },
  persist: {
    key: 'musicPlayer',
  },
  actions: {
    clearLocalMusicStatus() {
      this.currentTime = 0
      this.duration = 0
    },
    async getCheckMusic(id: number) {
      // 检测是有版权
      const ret = await song.reqCheckMusic(id)
      return ret.success
    },
    // 获取音乐链接
    async getMusicUrl(id: number) {
      // 检测是有版权
      const isAvailable = await this.getCheckMusic(id)
      if (!isAvailable) {
        this.removeFromPlayQueue(id)
        ElMessage.error('亲爱的,暂无版权')
        return ''
      }
      // 通过id获取音乐链接
      const ret = await song.reqPlayMusicApi(id)
      if (ret.code !== 200) {
        this.removeFromPlayQueue(id)
        ElMessage.error('这首歌丢失了。。。')
        return ''
      }
      return ret.data[0]?.url
    },
    // 添加歌曲到播放队列
    async addSongToPlayList(music: ISongs) {
      const { goPlayMusic } = usePlayer(this)
      // 如果已经存在就重新播放这一首，并将当前音乐索引移到这一首
      const existMusicIndex = this.playQueue.findIndex(item => item.id === music.id)
      // 清除当前播放的音乐信息
      this.clearLocalMusicStatus()
      // 通过id获取音乐链接
      const musicUrl = await this.getMusicUrl(music.id)
      if (!musicUrl) return
      if (existMusicIndex >= 0) {
        if (!music.musicUrl) music.musicUrl = musicUrl
        this.currentMusicIndex = existMusicIndex
        return goPlayMusic()
      }
      // 添加到音乐列表
      this.playQueue.push({ musicUrl, ...music })
      // 改变当前播放的音乐并播放
      this.currentMusicIndex = this.playQueue.length - 1
      goPlayMusic()
    },
    // 在播放队列页面从播放队列中删除当前音乐
    removeFromPlayQueue(musicId: number) {
      const musicIndex = this.playQueue.findIndex(item => item.id === musicId)
      this.playQueue.splice(musicIndex, 1)
      // 如果列表为空了，则停止播放
      if (this.playQueue.length === 0) {
        // 清除当前播放的音乐信息
        this.clearLocalMusicStatus()
        this.currentMusicIndex = -1
        return
      }
      // 删除当前播放的歌
      if (musicIndex === this.currentMusicIndex) this.addSongToPlayList(this.playQueue[musicIndex])
      // 删除的歌在当前播放歌曲前面
      else if (musicIndex < this.currentMusicIndex) this.currentMusicIndex--
    },
  },
  getters: {
    handlePlayList: (state: MusicPlayerState) => {
      return (currentPage: number) => state.playQueue.slice((currentPage - 1) * 10, currentPage * 10)
    },
  },
})

export default useMusicPlayerStore
