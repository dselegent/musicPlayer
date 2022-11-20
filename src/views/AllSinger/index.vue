<template>
  <div class="allSinger">
    <el-scrollbar height="440px" ref="scrollbarRef">
      <!-- 选择面板 -->
      <section class="areas panel">
        <span class="title">语种：</span>
        <el-radio-group v-model="area" size="small" @change="handleChange">
          <el-radio-button v-for="item in areas" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </section>
      <section class="types panel">
        <span class="title">分类：</span>
        <el-radio-group v-model="type" size="small" @change="handleChange">
          <el-radio-button v-for="item in types" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </section>
      <section class="initials panel">
        <span class="title">筛选：</span>
        <el-radio-group v-model="initial" size="small" @change="handleChange">
          <el-radio-button v-for="item in initials" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </section>
      <!-- 歌手列表 -->
      <el-skeleton :rows="10" animated :loading="loading" :throttle="10">
        <template #default>
          <SingerList
            :artistList="artists"
            v-infinite-scroll="infiniteScroll"
            :infinite-scroll-immediate="false"
            :infinite-scroll-distance="1"
          />
        </template>
      </el-skeleton>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'AllSinger',
  }
</script>
<script setup lang="ts">
  import LoadingSvg from '@v/AllSongSheet/LoadingSvg.vue'
  import useApi from '@/api'

  const { singer } = useApi() // 语种
  const areas = [
    {
      label: '全部',
      value: -1,
    },
    {
      label: '华语',
      value: 7,
    },
    {
      label: '欧美',
      value: 96,
    },
    {
      label: '日本',
      value: 8,
    },
    {
      label: '韩国',
      value: 16,
    },
    {
      label: '其他',
      value: 0,
    },
  ]
  // 分类
  const types = [
    {
      label: '全部',
      value: -1,
    },
    {
      label: '男歌手',
      value: 1,
    },
    {
      label: '女歌手',
      value: 2,
    },
    {
      label: '乐队',
      value: 3,
    },
  ]
  // 筛选
  const initials: any = []
  for (var i = 0; i < 26; i++)
    initials.push({
      label: String.fromCharCode(97 + i),
      value: String.fromCharCode(97 + i),
    })
  initials.unshift({
    label: '热门',
    value: -1,
  })
  initials.push({
    label: '#',
    value: 0,
  })

  // 收集数据
  let area = $ref(-1)
  let type = $ref(-1)
  let initial = $ref(-1)
  // 歌手列表
  let artists = $ref([])
  let loading = $ref<boolean>(true)
  let offset = $ref(0)
  let noMore = $ref(false)
  // 当前请求状态
  let reqStatus = $ref(true)

  // 获取歌手列表
  const getArtistList = async ({ type, area, initial, limit = 20, offset = 0 }) => {
    reqStatus = true
    let ret = await singer.reqArtistList({
      type,
      area,
      initial,
      limit,
      offset,
    })
    if (ret?.code !== 200) return ElMessage.error('获取歌手失败')
    artists = [...(artists || []), ...ret.artists]
    if (!ret.more) noMore = true
    loading = false
    reqStatus = false
  }

  // 当选中节点变化时触发
  const handleChange = () => {
    loading = true
    offset = 0
    artists = []
    getArtistList({
      type,
      area,
      initial,
    })
  }

  // 无限滚动
  const infiniteScroll = useDebounceFn(() => {
    if (reqStatus) return ElMessage.warning('上一次加载还没结束呢！')
    if (noMore) return ElMessage.error('没有更多歌单了！')
    ElNotification.closeAll()
    ElNotification({
      title: '加载中',
      icon: LoadingSvg,
    })
    offset += 20
    getArtistList({
      type,
      area,
      initial,
      offset,
    })
  }, 1000)

  let timer
  onMounted(() => {
    timer = setTimeout(() => {
      loading = false
      reqStatus = false
    }, 5000)
    getArtistList({ type, area, initial })
  })

  onUnmounted(() => {
    clearTimeout(timer)
  })
</script>

<style lang="scss" scoped>
  .allSinger {
    // 选择面饭
    section.panel {
      display: flex;
      font-size: 14px;

      .title {
        flex-shrink: 0;
        line-height: 24px;
      }

      :deep(.el-radio-button) {
        &:not(:last-child)::after {
          display: inline-block;
          margin: 0 6px;
          color: var(--el-fill-color-darker);
          content: '|';
          transform: translateY(-4px);
        }

        .el-radio-button__inner {
          display: inline-block;
          width: 36px;
          margin-bottom: 8px;
          text-align: center;
          border-radius: 26px;
          box-sizing: content-box;
        }
      }
    }
  }
</style>
