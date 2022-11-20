<template>
  <!-- 音乐头部 -->
  <header id="musicHeader">
    <!-- 左侧前进后退按钮 -->
    <div class="left">
      <el-button class="prev" circle @click="router.go(-1)">
        <i i="ant-design-left-outlined" />
      </el-button>
      <el-button class="next" circle @click="router.go(1)">
        <i i="ant-design-right-outlined" />
      </el-button>
    </div>
    <!-- 中间搜索区域 -->
    <div class="center">
      <i i="ant-design-search-outlined" />
      <el-popover placement="bottom-start" :width="390" trigger="focus">
        <template #reference>
          <input
            type="text"
            name="musicSearch"
            placeholder="有什么想听的歌曲吗"
            v-model.trim="keywords"
            @keyup.enter="goSearch(router.push)"
            ref="searchInputRef"
            @input="getSearchSuggestions"
          />
        </template>
        <div v-show="!keywords">
          <MusicHistory></MusicHistory>
          <HotSearchList></HotSearchList>
        </div>
        <SearchSuggestions v-show="keywords"></SearchSuggestions>
      </el-popover>
    </div>
    <!-- 右侧提示区 -->
    <div class="right">
      <el-button class="login" round size="large" @click="openLogin">登录</el-button>
      <el-button class="setting" circle @click="drawer = true">
        <i i="ant-design-setting-outlined" />
      </el-button>
      <!-- <Login></Login> -->
    </div>
    <el-drawer v-model="drawer" title="设置" :modal="false">
      <MusicSetting></MusicSetting>
    </el-drawer>
  </header>
</template>

<script setup lang="ts" name="MusicHeader">
import useStore from '@/store';
import { useLoginStatus } from '@h/login';
import useApi from '@/api';

const { search } = useApi(); // 关键字
let keywords = $ref('');
// 默认搜索
let defaultKeywords = $ref('');
let { loserwd } = useLoginStatus();
const router = useRouter();
// 引入功能模块
const { musicSearch } = useStore();
// input实例
let searchInputRef: any = $ref(null);
// 设置抽屉
let drawer = $ref(false);

// 获取搜索建议
const getSearchSuggestions = useDebounceFn(() => {
  if (keywords == '') return;
  musicSearch.getSearchSuggestions(keywords);
}, 200);

// 携带参数去搜索页
const goSearch = push => {
  //  关键字和默认推荐关键字为空
  if (keywords === '' && defaultKeywords === '') return ElMessage.warning('请输入有效的内容！');
  push({
    path: '/search',
    query: {
      keywords: keywords || defaultKeywords,
    },
  });
};

// 获取默认搜索关键字
async function getMusicSearchDefault() {
  let ret;
  try {
    ret = await search.reqMusicSearchDefault();
  } catch (error) {}
  if (ret?.code !== 200) return;

  searchInputRef.placeholder = ret?.data?.showKeyword;
  defaultKeywords = ret.data.realkeyword;
}

const openLogin = () => {
  loserwd.value = true;
};

onMounted(() => {
  if (searchInputRef.placeholder === '有什么想听的歌曲吗') {
  } else {
    let day = diffDays(+new Date(), musicSearch.reqTime);
    if (!day) return;
  }
  getMusicSearchDefault();
});
</script>

<style lang="scss" scoped>
// 音乐头部
##{$themePrefix}Header {
  display: flex;
  justify-content: space-between;
  height: 40px;
  overflow: hidden;
  .iconStyle {
    width: 40px;
    height: 40px;
    font-size: 16px;
    background-color: var(--el-bg-color);
  }
  // 左侧前进后退按钮
  .left {
    height: 40px;
    .prev,
    .next {
      @extend .iconStyle;
      &:first-child {
        margin-right: 8px;
      }
    }
  }
  // 中间搜索区域
  .center {
    position: relative;
    display: flex;
    align-items: center;
    width: 440px;
    height: 40px;
    padding-left: 12px;
    background-color: var(--el-bg-color);
    border-radius: 17px;
    font-size: 0;
    i {
      font-size: 18px;
    }
    input[name='#{$themePrefix}Search'] {
      width: 350px;
      outline: none;
      border: none;
      margin-left: 4px;
      background-color: var(--el-bg-color);
      @include textCenter('v', 40px);
      font-size: 12px;
      &::-webkit-input-placeholder {
        color: var(--el-text-color-placeholder);
        font-size: 12px;
      }
    }
  }
  // 右侧提示区
  .right {
    display: flex;
    align-items: center;
    // 登录按钮
    .login {
      width: 92px;
      height: 42px;
      padding: 10px 20px;
      background-color: var(--el-bg-color);
      border-radius: 21px;
      font-size: 14px;
    }
    // 设置
    .setting {
      @extend .iconStyle;
      margin-right: 32px;
    }
  }
}
</style>
