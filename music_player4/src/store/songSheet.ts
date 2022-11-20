import { defineStore } from 'pinia';
// 引入api
// import { reqPlaylistDetail, reqAllPlaylist, reqPlayListComment } from '@a/index.js';
import useApi from '@/api';
const { songSheet } = useApi();
interface ISongSheet {
  songListDetails: any;
  songList: any;
  commentList: any;
  commentCount: number;
}

const useSongSheetStore = defineStore('songSheet', {
  state: (): ISongSheet => {
    return {
      // 歌单详情
      songListDetails: {},
      // 歌单列表
      songList: [],
      // 评论列表
      commentList: [],
      // 评论数量
      commentCount: 0,
    };
  },
  actions: {
    // 请求歌单详情
    async getPlaylistDetail(id) {
      let ret = await songSheet.reqPlaylistDetail(id);
      if (ret?.code !== 200) return ElMessage.error(ret?.msg);
      this.songListDetails = ret.playlist;
    },
    // 请求歌单歌曲
    async getAllPlaylist(id, limit) {
      let ret = await songSheet.reqAllPlaylist({ id, limit });
      if (ret?.code !== 200) return ElMessage.error('获取歌曲失败');
      this.songList = ret.songs;
    },
    // 请求歌单评论
    async getPlayListComment({ id, limit = 12, offset = 0 }) {
      let ret = await songSheet.reqPlayListComment({ id, limit, offset });
      if (ret?.code !== 200) return ElMessage.error('获取歌单评论失败');
      this.commentList = ret.comments;
      this.commentCount = ret.total;
    },
  },
});

export default useSongSheetStore;
