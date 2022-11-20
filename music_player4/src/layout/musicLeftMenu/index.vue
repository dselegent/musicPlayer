<template>
  <!-- 左侧菜单 -->
  <aside id="musicLeftMenu">
    <!-- 用户信息区 -->
    <div class="userInfo">
      <div class="avatar">
        <el-image class="img" :src="'a'">
          <template #placeholder>
            <i
              i="ant-design-picture-filled"
              style="font-size: 40px; color: var(--el-color-info-light-3)"
            />
          </template>
        </el-image>
      </div>
      <div class="usernameContainer">
        <span class="welcome">Hello,</span>
        <br />
        <span class="username">dselegent</span>
      </div>
    </div>
    <!-- 发现音乐 -->
    <div class="findMusic">
      <p class="title">发现音乐</p>
      <ul class="list">
        <li class="item" data-find-item="home">
          <router-link to="/" active-class="active">
            <i i="ant-design-home-outlined " />
            <span>首页</span>
          </router-link>
        </li>
        <li class="item" data-find-item="album">
          <a href="javascript:;">
            <SvgIcon name="album" size="19px"></SvgIcon>
            <span>专辑</span>
          </a>
        </li>
        <li class="item" data-find-item="singer">
          <router-link to="/allSinger" active-class="active">
            <i i="ant-design-user-outlined" />
            <span>歌手</span>
          </router-link>
        </li>
        <li class="item" data-find-item="podcast">
          <a href="javascript:;">
            <i i="ant-design-play-square-outlined" />
            <span>播客</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- 我的音乐 -->
    <div class="ownerMusic">
      <p class="title">我的音乐</p>
      <ul class="list">
        <li class="item" data-find-item="local">
          <router-link to="/localMusic" active-class="active">
            <i i="ant-design-cloud-download-outlined" />
            <span>本地与下载</span>
          </router-link>
        </li>
        <li class="item" data-find-item="favorite">
          <a href="javascript:;">
            <i i="ant-design-heart-outlined" />
            <span>我喜欢的音乐</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- 我的收藏 -->

    <!-- 其它菜单 -->
    <!-- <div class="otherMenu">
          <ul class="list">
            <li class="item">
              <a href="javascript:;">
                <span>每日推荐</span>
                <img src="./images/fire.png" alt="" />
              </a>
            </li>
          </ul>
        </div> -->
  </aside>
</template>

<script setup lang="ts" name="musicLeftMenu">
// placeholder
</script>
<style lang="scss" scoped>
//左侧菜单栏
##{$themePrefix}LeftMenu {
  width: 216px;
  height: 528px;
  padding: 28px;
  background-color: var(--el-bg-color);
  border-radius: 30px;
  // 用户信息区
  .userInfo {
    margin-bottom: 43px;
    .avatar {
      .img {
        width: 52px;
        @include textCenter('v', 52px);
        border-radius: 18px;
        font-size: 12px;
        text-align: center;
      }
    }
    // 用户名容器
    .usernameContainer {
      font-size: 0;
      .welcome {
        display: inline-block;
        margin: {
          top: 11px;
          bottom: 1px;
        }
        font: {
          weight: bold;
          size: 14px;
        }
        color: var(--el-text-color-secondary);
      }
      .username {
        font-size: 16px;
        color: var(--el-text-color-regular);
      }
    }
  }
  // 发现音乐
  .findMusic {
    margin-bottom: 12px;
    .title {
      font-size: 14px;
      color: var(--el-text-color-regular);
    }
    // 菜单项
    .item {
      a {
        display: flex;
        align-items: center;
        height: 40px;
        color: var(--el-text-color-secondary);
        font-size: 16px;
        i,
        svg {
          margin-right: 4px;
        }
        &.active {
          color: var(--el-color-primary);
        }
        &:hover {
          color: var(--el-color-primary);
        }
      }
    }
  }
  // 我的音乐
  .ownerMusic {
    @extend .findMusic;
  }
  // 其它菜单
  .otherMenu {
    border-top: 1px solid #e4e4e4;
    .list {
      .item {
        a {
          color: var(--el-text-color-secondary);
          @include textCenter('v', 16px);
          font-size: 0;
          img {
            vertical-align: bottom;
            transform: translate(20%, -20%);
          }
          span {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
