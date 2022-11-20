<script setup lang="ts" name="HotSearchList">
  import useStore from '@/store'

  const { musicSearch } = useStore()
  const { hotList } = storeToRefs(musicSearch)
  // let loading = $ref<boolean>(true);

  // 获取热门搜索列表
  const getsearchHotDetail = async () => await musicSearch.getsearchHotDetail()

  onMounted(() => {
    /*
    发请求的情况
    1. 数据为空
    2. 天数差大于等于1
  */
    const day = diffDays(+new Date(), musicSearch.reqTime)
    if (hotList.value.length && !day) return
    getsearchHotDetail()
    musicSearch.reqTime = +new Date()
  })
</script>

<template>
  <div class="hotSearchList">
    <h2 class="title"> 热搜榜 </h2>
    <!-- <el-skeleton :rows="4" animated :loading="loading" :throttle="10">
      <template #default> -->
    <el-scrollbar height="280px">
      <!-- 热搜列表 -->
      <ul class="hotList">
        <!-- 热搜项 -->
        <li v-for="(hotItem, index) in hotList" :key="hotItem.searchWord" class="hotItem">
          <a
            href="javascript:;"
            @click="
              $router.push({
                path: '/search',
                query: {
                  keywords: hotItem.searchWord,
                },
              })
            "
          >
            <!-- 序号 -->
            <div class="index">{{ index + 1 }}</div>
            <!-- 详细信息 -->
            <div class="info">
              <!-- 音乐人、人气 -->
              <div class="peopleCondition">
                <span class="musician">{{ hotItem.searchWord }}</span>
                <i>HOT</i>
                <span class="score">{{ hotItem.score }}</span>
              </div>
              <!-- 描述 -->
              <div class="desc">{{ hotItem.content }}</div>
            </div>
          </a>
        </li>
      </ul>
    </el-scrollbar>
    <!-- </template>
    </el-skeleton> -->
  </div>
</template>

<style lang="scss" scoped>
  .hotSearchList {
    // 标题
    .title {
      margin-bottom: 8px;
      font-size: 16px;
      line-height: 26px;
    }
    // 热搜列表
    .hotList {
      // 热搜项
      .hotItem {
        padding: 8px 0;

        &:last-child {
          padding-bottom: 0;
        }

        a {
          display: flex;
          // 序号
          .index {
            @include textCenter('hv', 36px);
            width: 36px;
            margin-right: 20px;
            color: var(--el-text-color-secondary);
            font: {
              size: 18px;
              weight: bold;
            }
          }
          // 详细信息
          .info {
            // 音乐人、人气
            .peopleCondition {
              // 音乐人
              .musician {
                margin-right: 6px;
                color: var(--el-text-color-regular);
                font: {
                  size: 13px;
                  weight: bold;
                }
              }

              i {
                display: none;
                margin-right: 6px;
                color: var(--el-color-danger);
                font: {
                  size: 12px;
                  style: italic;
                  weight: bold;
                }
              }
              // 人气
              .score {
                font-size: 12px;
                color: var(--el-text-color-secondary);
              }
            }
            // 描述
            .desc {
              font-size: 12px;
              color: #999;
            }
          }
        }
        // 前三个序号变红
        &:nth-child(-n + 3) .index {
          color: var(--el-color-danger);
        }
        // 第一个有hot
        &:first-child i {
          display: inline !important;
        }
        // 移入变色
        &:hover {
          background-color: var(--el-fill-color-light);
        }
      }
    }
  }
</style>
