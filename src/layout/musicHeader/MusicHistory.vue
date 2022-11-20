<script setup lang="ts" name="MusicHistory">
  import useStore from '@/store'

  const { musicSearch } = useStore()
  const { searchHistoryList } = storeToRefs(musicSearch)

  // 删除搜索历史记录
  const handleClear = () => {
    ElMessageBox.confirm('确定是否删除所有历史记录吗？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(_ => {
        searchHistoryList.value = []
        ElMessage.success('删除成功')
      })
      .catch(_ => {
        ElMessage.info('已取消')
      })
  }
</script>

<template>
  <div id="musicHistory">
    <div class="historyHeader">
      <h2 class="title"> 搜索历史 </h2>
      <el-button link @click="handleClear">
        <i i="ant-design-delete-outlined"></i>
      </el-button>
    </div>
    <el-tag
      v-for="tag in searchHistoryList"
      :key="tag"
      closable
      round
      style="margin-bottom: 8px"
      @click="
        $router.push({
          path: '/search',
          query: {
            keywords: tag,
          },
        })
      "
      @close="searchHistoryList.splice(searchHistoryList.indexOf(tag), 1)"
    >
      {{ tag }}
    </el-tag>
  </div>
</template>

<style lang="scss" scoped>
  ##{$themePrefix}History {
    margin-bottom: 12px;
    // 头部
    .historyHeader {
      display: flex;
      margin-bottom: 8px;

      .title {
        font-size: 16px;
        line-height: 26px;
      }
    }
    // 底部
    :deep(.el-tag) {
      margin-right: 16px;
      cursor: pointer;
    }
  }
</style>
