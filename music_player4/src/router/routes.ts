import { RouteRecordRaw } from 'vue-router'
import musicHome from '@v/musicHome/index.vue'

const modules = import.meta.glob('../views/*/*.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: musicHome,
  },
  {
    path: '/localMusic',
    component: modules['../views/localMusic/index.vue'],
  },
  {
    path: '/playQueue',
    component: modules['../views/playQueue/index.vue'],
  },
  {
    path: '/search',
    component: modules['../views/musicSearch/index.vue'],
  },
  {
    path: '/singerInformation',
    component: modules['../views/SingerInformation/index.vue'],
  },
  {
    path: '/songSheet',
    component: modules['../views/SongSheet/index.vue'],
  },
  {
    path: '/songAlbum',
    component: modules['../views/SongAlbum/index.vue'],
  },
  {
    path: '/ranking',
    component: modules['../views/Ranking/index.vue'],
  },
  {
    path: '/allSongSheet',
    component: modules['../views/AllSongSheet/index.vue'],
  },
  {
    path: '/allSinger',
    component: modules['../views/AllSinger/index.vue'],
  },
]

export default routes
