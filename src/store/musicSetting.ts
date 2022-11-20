import { defineStore } from 'pinia'

interface IMusicSetting {
  sakura: boolean
  sakuraNum: number
}

const useMusicSettingStore = defineStore('musicSetting', {
  state: (): IMusicSetting => {
    return {
      sakura: true,
      sakuraNum: 20,
    }
  },
  persist: {
    key: 'musicSetting',
  },
  actions: {},
  getters: {},
})

export default useMusicSettingStore
