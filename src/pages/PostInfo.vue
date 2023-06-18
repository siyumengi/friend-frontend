<template>
  <div id="teamAddPage">
    <template v-if="post">
      <van-cell readonly  title="图片"  to="/post/edit">
        <img style="height: 48px" :src="post.imageUrl" :value="post.imageUrl"/>
      </van-cell>
      <van-cell readonly  title="标题"  :value="post.title"/>
      <van-cell title="内容"  :value="post.content" >
        <van-field
            readonly
            v-model="post.content"
            rows="4"
            autosize
            type="textarea"
        />
      </van-cell>
      <van-cell title="浏览次数" readonly   :value="post.viewCount"/>
      <van-cell title="点赞次数" readonly   :value="post.likeCount"/>
      <van-cell title="审核状态" readonly   :value="post.postStatus"/>
      <van-cell title="创建时间" readonly   :value="post.postTime"/>
    </template>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../config/myAxios";
import {currentID} from "../states/currentID";
import {PostType} from "../models/post";

const post = ref<PostType>();

let route = useRoute();
let postId = route.query.postId;
let avatar = route.query.avatar;
onMounted(async () => {
  const res = await myAxios.get("/post/get", {
    params: {
      id: postId,
    }
  });
  post.value = res.data
})

const router = useRouter();


</script>

<style scoped>
#teamPage {

}
</style>
