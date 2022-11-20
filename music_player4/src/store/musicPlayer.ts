import { defineStore } from 'pinia';
// 引入api
import useApi from '@/api';
// 引入功能模块
import { usePlayer } from '@h/musicPlayer';

interface IMusicPlayer {
  playQueue: any;
  currentMusicIndex: number;
  currentTime: number;
  duration: number;
  volume: number;
  currentOrder: number;
}

const { song } = useApi();
const useMusicPlayerStore = defineStore('musicPlayer', {
  state: (): IMusicPlayer => {
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
    };
  },
  persist: {
    key: 'musicPlayer',
  },
  actions: {
    clearLocalMusicStatus() {
      this.currentTime = 0;
      this.duration = 0;
    },
    async getCheckMusic(id) {
      // 检测是有版权
      let ret = await song.reqCheckMusic(id);
      return ret?.success;
    },
    // 获取音乐链接
    async getMusicUrl(id) {
      // 检测是有版权
      let isAvailable = await this.getCheckMusic(id);
      if (!isAvailable) {
        this.removeFromPlayQueue(id);
        ElMessage.error('亲爱的,暂无版权');
        return '';
      }
      // 通过id获取音乐链接
      let ret = await song.reqPlayMusicApi(id);
      if (ret?.code !== 200) {
        this.removeFromPlayQueue(id);
        ElMessage.error('这首歌丢失了。。。');
        return '';
      }
      return ret?.data[0]?.url;
    },
    // 添加歌曲到播放队列
    async addSongToPlayList(music) {
      const { goPlayMusic } = usePlayer(this);
      // 如果已经存在就重新播放这一首，并将当前音乐索引移到这一首
      const existMusicIndex = this.playQueue.findIndex(item => item.id === music.id);
      // 清除当前播放的音乐信息
      this.clearLocalMusicStatus();
      // 通过id获取音乐链接
      let musicUrl = await this.getMusicUrl(music.id);
      if (!musicUrl) return;
      if (existMusicIndex >= 0) {
        if (!music.musicUrl) music.musicUrl = musicUrl;
        this.currentMusicIndex = existMusicIndex;
        return goPlayMusic();
      }
      // 添加到音乐列表
      this.playQueue.push({ musicUrl, ...music });
      // 改变当前播放的音乐并播放
      this.currentMusicIndex = this.playQueue.length - 1;
      goPlayMusic();
    },
    // 在播放队列页面从播放队列中删除当前音乐
    removeFromPlayQueue(musicId) {
      let musicIndex = this.playQueue.findIndex(item => item.id === musicId);
      this.playQueue.splice(musicIndex, 1);
      // 如果列表为空了，则停止播放
      if (this.playQueue.length === 0) {
        // 清除当前播放的音乐信息
        this.clearLocalMusicStatus();
        this.currentMusicIndex = -1;
        return;
      }
      // 删除当前播放的歌
      if (musicIndex === this.currentMusicIndex) {
        this.addSongToPlayList(this.playQueue[musicIndex]);
        // 删除的歌在当前播放歌曲前面
      } else if (musicIndex < this.currentMusicIndex) {
        this.currentMusicIndex--;
      }
    },
  },
  getters: {
    handlePlayList: state => {
      return currentPage => state.playQueue.slice((currentPage - 1) * 10, currentPage * 10);
    },
  },
});

export default useMusicPlayerStore;
/* {
  id: 1976792516,
  name: '弦上羽',
  picUrl: 'http://p1.music.126.net/9yLmrRgyzqyUsmHUDcx6GA==/109951167830753022.jpg',
  song: {
    artists: [
      {
        name: '王珮瑜',
      },
    ],
    duration: 205026,
  },
  musicUrl:
    'http://m801.music.126.net/20220903195841/5826ec1a4c6c1b7920105e75f17b547e/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/18183002996/48c1/c870/21f9/8e1530a81863945cde74515bd97be2aa.mp3',
} */
