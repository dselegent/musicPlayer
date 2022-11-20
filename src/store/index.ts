import useMusicHomeStore from './modules/musicHome'
import useMusicPlayerStore from './modules/musicPlayer'
import useMusicSearchStore from './musicSearch'
import useSongSheetStore from './songSheet'
import useSongAlbumStore from './songAlbum'
import useSingerInformationStore from './modules/singerInformation'
import useAllSongSheetStore from './modules/allSongSheet'
import useMusicSettingStore from './musicSetting'

// 统一导出useStore方法
export default function useStore() {
  return {
    musicHome: useMusicHomeStore(),
    musicPlayer: useMusicPlayerStore(),
    musicSearch: useMusicSearchStore(),
    songSheet: useSongSheetStore(),
    songAlbum: useSongAlbumStore(),
    singerInformation: useSingerInformationStore(),
    allSongSheet: useAllSongSheetStore(),
    musicSetting: useMusicSettingStore(),
  }
}
