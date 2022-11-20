<script setup lang="ts">
  import useStore from '@/store'

  const { musicSetting } = useStore()
  const { sakura, sakuraNum } = storeToRefs(musicSetting)
  // 需要缓存的组件name值
  const includeList = ref(['musicHome', 'musicSearch', 'Ranking', 'PlayQueue', 'LocalMusic']) // 缓存About

  onMounted(() => {
    ElMessageBox.alert('这是一个音乐播放器', '欢迎', {
      autofocus: false,
      roundButton: true,
      draggable: true,
      confirmButtonText: '确认',
    })
  })
</script>

<template>
  <Sakura v-if="sakura" :sakura-num="sakuraNum" />
  <div class="musicContainer">
    <section class="mainContainer">
      <aside class="leftContainer">
        <MusicLeftMenu />
      </aside>
      <aside class="rightContainer">
        <MusicHeader class="musicHeader" />
        <div class="musicMain">
          <router-view v-slot="{ Component }">
            <keep-alive :include="includeList">
              <transition appear name="el-fade-in-linear">
                <component :is="Component" />
              </transition>
            </keep-alive>
          </router-view>
        </div>
      </aside>
    </section>
    <section class="footerContainer">
      <MusicPlayer />
    </section>
  </div>
</template>

<style lang="scss">
  // music容器
  .#{$themePrefix}Container {
    width: 1120px;
    height: 680px;
    padding: 25px;
    margin: 0 auto;
    // background: #f5f6f8;
    background-color: var(--el-fill-color-light);
    border-radius: 61px;
    transform: translateY(15px);

    .mainContainer {
      display: flex;
      justify-content: space-between;
      margin-bottom: 22px;

      .rightContainer {
        .#{$themePrefix}Header {
          margin-bottom: 16px;
        }
        // 中间内容的位置
        .#{$themePrefix}Main {
          width: 826px;
          height: 472px;
          overflow: hidden;
          background-color: var(--el-bg-color);
          border-radius: 35px;

          .el-fade-in-linear-leave-to {
            display: none;
          }
        }
      }
    }
  }
</style>
