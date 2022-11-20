import type { SubItemType, TagType } from '@/api/songSheet/types'
import type { IPlaylists } from '@/api/types'

export interface AllSongSheetState {
  categories: {
    0: string
    1: string
    2: string
    3: string
    4: string
  }
  playlistCatlist: SubItemType[]
  playlistHot: TagType[]
  songSheetList: IPlaylists[]
  noMore: boolean
}

export interface CategoryType {
  category: string | number
  label: string
  children: {
    value: string
    label: string
  }[]
}
