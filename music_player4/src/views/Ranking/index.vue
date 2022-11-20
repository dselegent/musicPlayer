<template>
  <div class="ranking">
    <el-skeleton :rows="14" animated :loading="loading" :throttle="10">
      <template #default>
        <el-scrollbar height="440px" ref="scrollbarRef">
          <!-- 官方榜单列表 -->
          <div class="officialList">
            <!-- 标题 -->
            <h4>官方榜</h4>
            <!-- 榜单项 -->
            <div
              class="officialItem"
              v-for="official in officialList"
              :key="official.id"
              @click="$router.push(`/songSheet?id=${official.id}`)"
            >
              <!-- 图片容器 -->
              <aside class="imgWrapper">
                <el-image :src="official?.coverImgUrl">
                  <template #placeholder>
                    <i
                      i="ant-design-picture-filled"
                      style="font-size: 104px; color: var(--el-color-info-light-3)"
                    />
                  </template>
                </el-image>
                <span>{{ formatDate(official.updateTime || 0, 'MM月d日') }}更新</span>
              </aside>
              <!-- 音乐榜 -->
              <el-table :data="official.tracks" stripe :show-header="false">
                <el-table-column width="330">
                  <template #default="{ row, $index }">
                    <span class="index">
                      {{ $index + 1 }}
                    </span>
                    <span class="name">{{ row.first }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="second" width="290" align="right" />
                <template #empty>
                  <el-empty description="暂无数据">
                    <el-button type="primary">重新加载</el-button>
                  </el-empty>
                </template>
              </el-table>
              <p class="more"><el-link>查看全部 ></el-link></p>
            </div>
          </div>
          <!-- 标题 -->
          <h4>全球榜</h4>
          <!-- 全球榜列表 -->
          <SongSheetList :songSheetList="globalList"></SongSheetList>
        </el-scrollbar>
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Ranking',
};
</script>
<script setup lang="ts">
import useApi from '@/api';

const { songSheet } = useApi();
let loading = $ref<boolean>(true);
// 榜单数据
let officialList: any = $ref([]);
let globalList: any = $ref([]);

// 获取所有榜单
const getToplistDetail = async () => {
  let ret = await songSheet.reqToplistDetail();
  if (ret?.code !== 200) return ElMessage.error('获取榜单失败');
  officialList = ret.list.slice(0, 4);
  globalList = ret.list.slice(4);
  localStorage.setItem(
    'rankList',
    JSON.stringify({
      officialList,
      globalList,
      reqTime: +new Date(),
    })
  );
  loading = false;
};

onMounted(() => {
  /*
    发请求的情况
    1. 有一个数据为空
    2. 天数差大于等于1
  */
  let { officialListStorage, globalListStorage, reqTime } = JSON.parse(
    localStorage.getItem('rankList') || '{}'
  );
  let day = diffDays(+new Date(), reqTime);

  if (officialListStorage?.length && globalListStorage?.length && !day) {
    officialList = officialListStorage;
    globalList = globalListStorage;
    loading = false;
    return;
  }
  getToplistDetail();
});
</script>

<style lang="scss" scoped>
.ranking {
  // 标题
  h4 {
    margin: 8px 16px;
    color: var(--el-text-color-regular);
    font: {
      size: 22px;
      weight: bold;
    }
  }
  // 官方榜单列表
  .officialList {
    margin-bottom: 32px;
    // 榜单项
    .officialItem {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
      font-size: 12px;
      // 图片容器
      .imgWrapper {
        position: relative;
        cursor: pointer;
        margin-right: 20px;
        span {
          position: absolute;
          top: 63%;
          left: 50%;
          white-space: nowrap;
          color: var(--el-color-white);
          transform: translateX(-50%);
        }
        :deep(.el-image) {
          width: 120px;
          height: 120px;
          border-radius: 26px;
        }
        @extend %playIconCenter;
      }
      :deep(.el-table) {
        font-size: 14px;
        .el-table__cell {
          padding: 4px;
          .index {
            color: var(--el-color-primary);
            font-weight: 600;
            margin-right: 8px;
          }
        }
      }
      .more {
        position: absolute;
        left: 20%;
        bottom: 0;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>
