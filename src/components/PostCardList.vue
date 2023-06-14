<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="post in props.postList">
    <van-card
        :desc="post.content"
        :title="`${post.title}`"

    >
<!--      :thumb="post.avatar"-->
<!--      <template #tags>-->
<!--        <van-tag plain type="danger" v-for="tag in props.tags" style="margin-right: 8px; margin-top: 8px">-->
<!--          {{ tag }}-->
<!--        </van-tag>-->
<!--      </template>-->
      <template #footer >
<!--        <van-button size="mini"  @click="ToToken(user.avatar,user.username)">查看</van-button>-->
        <van-button size="mini">查看</van-button>
      </template>
    </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {PostType} from "../models/post";

interface UserCardListProps {
  loading: boolean;
  postList: PostType[];
}

const router = useRouter();
const props = withDefaults(defineProps<UserCardListProps>(), {
  loading: true,
  // @ts-ignore
  postList: [] as PostType[]
});

// const ToToken = (avatar: any,username:any) => {
//   router.push({
//     path: "/user/Token",
//     query: {
//       avatar,
//       username,
//     }
//   })
// }

</script>

<style scoped>

</style>
