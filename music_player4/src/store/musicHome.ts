import { defineStore } from 'pinia';
// 引入api
import useApi from '@/api';
const { songSheet, recommend, singer } = useApi();
interface IMusicHome {
  songSheetList: any;
  noMore: boolean;
  bannerList: any;
  topArtistsList: any;
  reqTime: number;
}

const useMusicHomeStore = defineStore('musicHome', {
  state: (): IMusicHome => {
    return {
      // 歌单列表
      songSheetList: [],
      // 歌单是否还有
      noMore: false,
      // 轮播数据
      bannerList: [],
      // 音乐人列表
      topArtistsList: [],
      // 存储时间
      reqTime: 0,
    };
  },
  persist: {
    key: 'musicHomeData',
    paths: ['songSheetList', 'noMore', 'bannerList', 'topArtistsList', 'reqTime'],
  },
  actions: {
    // 获取网友推荐歌单
    async getTopPlaylist() {
      let ret = await songSheet.reqTopPlaylist(0, 8);
      if (ret?.code !== 200) return ElMessage.error('操作频繁，请稍候再试');
      this.songSheetList = ret.playlists;
      if (!ret.more) this.noMore = true;
    },
    // 获取banner
    async getBanner() {
      let ret = await recommend.reqBanner();
      if (ret?.code !== 200) return ElMessage.error('横幅图获取失败');
      this.bannerList = ret.banners;
    },
    // 获取热门音乐人
    async getTopArtists() {
      let ret = await singer.reqTopArtists();
      if (ret?.code !== 200) return ElMessage.error('音乐制作人失败');
      this.topArtistsList = ret.artists.slice(0, 5);
    },
  },
});

export default useMusicHomeStore;
