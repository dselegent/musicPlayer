<template>
  <div class="songSheetComment">
    <el-skeleton :rows="8" animated :loading="loading" :throttle="10">
      <template #default>
        <ul class="commentList">
          <li class="commentItem" v-for="comment in commentList" :key="comment.commentId">
            <!-- 人 -->
            <div class="user">
              <!-- 头像 -->
              <el-image :src="comment.user?.avatarUrl" class="avatar" loading="lazy">
                <template #placeholder>
                  <i
                    i="ant-design-picture-filled"
                    style="font-size: 28px; color: var(--el-color-info-light-3)"
                  />
                </template>
              </el-image>
              <!-- 用户名 -->
              <span class="nickName">{{ comment.user?.nickname }}</span>
            </div>
            <p class="content">{{ comment.content }}</p>
            <div class="other">
              <span class="timeStr">{{ comment.timeStr }}</span>
              <span>{{ comment.likedCount }}赞</span>
            </div>
          </li>
        </ul>
      </template>
    </el-skeleton>
    <div style="display: flex; justify-content: center">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="commentCount"
        :hide-on-single-page="commentCount <= 12"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SongSheetComment',
};
</script>
<script setup lang="ts">
interface Props {
  commentList?: any;
  commentCount: number;
  loading?: boolean;
  getPlayListComment?: any;
}
const props = withDefaults(defineProps<Props>(), {
  commentCount: 0,
});

const route = useRoute();
const emit = defineEmits(['handleScroll']);
// 当前页
let currentPage = $ref(1);
const pageSize = $ref(12);

// 切换页
const handleCurrentChange = (currentPage: number) => {
  props.getPlayListComment({
    id: route.query?.id,
    offset: (currentPage - 1) * 12,
  });
  emit('handleScroll');
};
</script>

<style lang="scss" scoped>
.songSheetComment {
  .commentList {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .commentItem {
      width: 250px;
      padding: 20px;
      border-radius: 10px;
      background-color: var(--el-fill-color-light);
      transition: all 0.3s ease;
      margin-bottom: 15px;
      // 人
      .user {
        display: flex;
        align-items: center;
        // 头像
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 5px;
          margin-right: 10px;
        }
        // 用户名
        .nickName {
          font-size: 16px;
          color: var(--el-text-color-regular);
        }
      }
      // 评论内容
      .content {
        margin-top: 20px;
        color: var(--el-color-info-dark-2);
        font-size: 14px;
        line-height: 1.6em;
      }
      // 其它
      .other {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        font-size: 12px;
      }
      &:hover {
        transform: translateY(-5px);
        box-shadow: var(--el-box-shadow-light);
      }
    }
  }
}
</style>
