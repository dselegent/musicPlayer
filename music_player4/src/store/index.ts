import useMusicHomeStore from './musicHome';
import useMusicPlayerStore from './musicPlayer';
import useLocalMusicStore from './localMusic';
import useMusicSearchStore from './musicSearch';
import useSongSheetStore from './songSheet';
import useSongAlbumStore from './songAlbum';
import useSingerInformationStore from './singerInformation';
import useAllSongSheetStore from './allSongSheet';
import useMusicSettingStore from './musicSetting';

// 统一导出useStore方法
export default function useStore() {
  return {
    musicHome: useMusicHomeStore(),
    musicPlayer: useMusicPlayerStore(),
    localMusic: useLocalMusicStore(),
    musicSearch: useMusicSearchStore(),
    songSheet: useSongSheetStore(),
    songAlbum: useSongAlbumStore(),
    singerInformation: useSingerInformationStore(),
    allSongSheet: useAllSongSheetStore(),
    musicSetting: useMusicSettingStore(),
  };
}
