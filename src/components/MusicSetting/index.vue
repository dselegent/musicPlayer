<template>
  <ul class="settingList">
    <li class="settingItem">
      <span class="name">樱花特效</span>
      <span class="option"><el-switch v-model="musicSetting.sakura" /></span>
    </li>
    <li class="settingItem">
      <span class="name">樱花数量</span>
      <span class="option">
        <el-input-number
          v-model="musicSetting.sakuraNum"
          :step="10"
          controls-position="right"
          step-strictly
          size="small"
          @change="handleChangeSakuraNum"
        />
      </span>
    </li>
    <li class="settingItem">
      <span class="name">暗黑模式</span>
      <span class="option">
        <el-switch v-model="isDark" />
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts" name="MusicSetting">
  import useStore from '@/store'
  import { isDark } from '@/utils/dark'

  const {
    proxy: { $bus },
  } = getCurrentInstance() as any
  const { musicSetting } = useStore()

  const handleChangeSakuraNum = useThrottleFn(() => $bus.emit('changeSakuraNum'), 1000)
</script>

<style lang="scss" scoped>
  .settingList {
    .settingItem {
      display: flex;
      align-items: center;

      .name {
        margin-right: 40px;
        color: var(--el-text-color-regular);
      }
    }
  }
</style>
