import type { IArtist, ISongs } from '@/api/types'
import type { AlbumRes } from '@/api/album/types'

type ArtistDescType = {
  briefDesc: string
  introduction: {
    ti: string
    txt: string
  }[]
}
export interface SingerInformationState {
  artist: IArtist
  artistAlbumSimpleList: {
    id: number
    [propName: string]: any
  }[]
  artistAlbumList: AlbumRes[]
  artistTopSongList: ISongs[]
  artistDesc: ArtistDescType
  similarArtistList: IArtist[]
}
