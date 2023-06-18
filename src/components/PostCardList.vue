<template>
  <van-swipe-cell v-for="post in props.postList" style="margin-top: 10px;margin-bottom: 10px;height: auto;">
    <!--内容-->
    <van-card :thumb="post.imageUrl" :desc="post.title" :title="`${post.content}`"
              class="goods-card">
      <!--tag-->

      <template #bottom>
        <div>
          <span class="sp_font">创建时间</span>
          {{ ': ' + post.postTime.substring(0, 19).replace("T", " ") }}
        </div>
        <div>
          <span class="sp_font">浏览次数</span>
          {{ ': ' + post.viewCount }}
        </div>
        <div>
          <span class="sp_font">审核状态</span>
          {{ ': ' + post.postStatus }}
        </div>
        <div>
          <span class="sp_font">点赞次数</span>
          {{ ': ' + post.likeCount }}
        </div>
      </template>
      <template #footer>
        <!--查看-->
        <van-button size="mini" text="查看" type="primary"
                    @click="getInfo(post.postId,post.imageUrl)"
                    custom-style="btn"/>
      </template>
    </van-card>
    <!--右滑-->
    <template #right>
      <!--加入-->
      <van-button square text="加入" type="primary" v-if="post.authorId !== currentUser?.id  "
                  class="lr_btn"/>

      <!--解散-->
      <van-button square text="删除" type="danger" v-if="post.authorId === currentUser?.id"
                  @click="doDeletePost(post.postId)"
                  class="lr_btn"/>
    </template>
    <!--左滑-->
    <template #left>
      <!--更新-->
      <van-button square type="success" text="更新" v-if="post.authorId === currentUser?.id"
                  @click="doUpdatePost(post.postId)"
                  class="lr_btn"/>
    </template>

  </van-swipe-cell>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {PostType} from "../models/post";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import myAxios from "../config/myAxios";
import {currentID} from "../states/currentID";
import {Toast} from "vant";

const currentUser = ref();
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

interface PostCardListProps {
  postList: PostType[];
}


const router = useRouter();
const props = withDefaults(defineProps<PostCardListProps>(), {
  postList: [] as PostType[]
});

const doDeletePost = async (id: number) => {
  const res = await myAxios.post('/post/delete', {
    currentId: currentID.value,
    id: id,
  });
  if (res?.code === 0) {
    Toast.success('操作成功');
    router.push({
      path: "/post",
    })
  } else {
    Toast.fail('操作失败' + (res.description ? `，${res.description}` : ''));
  }

}
const getInfo = (postId: number, avatar: string) => {
  router.push({
    path: "/post/info",
    query: {
      postId,
      avatar,
    }
  })
}

const doUpdatePost = (id: number) => {
  router.push({
    path: "/post/update",
    query: {
      id,
    }
  })
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;

}

.van-card__thumb img {
  margin: 100px;
}

.goods-card {
  margin: 0;
  background-color: @white;
}

.lr_btn {
  height: 100%;
}

.sp_font {
  font-weight: 500;
}
</style>
