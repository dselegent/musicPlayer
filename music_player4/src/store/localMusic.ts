import { defineStore } from 'pinia';
// 引入api
import useApi from '@/api';

interface ILocalMusic {
  localMusicList: any[];
}

const { song } = useApi();
const useLocalMusicStore = defineStore('localMusic', {
  state: (): ILocalMusic => {
    return {
      // 本地音乐列表
      localMusicList: [],
    };
  },

  actions: {
    // 请求热门歌单数据
    async getLocalMusic() {
      let ret = await song.reqNewMusic();
      if (ret?.code === 200) {
        this.localMusicList = ret.result;
        return 'ok';
      } else {
        return Promise.reject(new Error('获取音乐失败'));
      }
    },
  },
});

export default useLocalMusicStore;
