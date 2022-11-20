import * as search from './search'
import * as song from './song'
import * as recommend from './recommend'
import * as songSheet from './songSheet'
import * as singer from './singer'
import * as album from './album'
import * as user from './user'

export default function useApi() {
  return { songSheet, search, song, recommend, singer, album, user }
}
