import type { ISongs } from '@/api/types'

export interface MusicPlayerState {
  playQueue: ISongs[]
  currentMusicIndex: number
  currentTime: number
  duration: number
  volume: number
  currentOrder: number
}
