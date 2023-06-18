<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
    <post-card-list :postList="postList" />
    <van-button  color="linear-gradient(to right, #ff6034, #ee0a24)" class="add-button" type="primary" icon="plus" style="z-index: 999;" @click="doCreatePost" />
    <van-empty v-if="postList?.length < 1" description="数据为空"/>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../config/myAxios";
import {Toast} from "vant";
import {currentID} from "../states/currentID";
import PostCardList from "../components/PostCardList.vue";
import {PostType} from "../models/post";

const router = useRouter();
const searchText = ref('');

// 跳转到加入帖子页
const doCreatePost = () => {
  router.push({
    path: "/post/add"
  })
}

const postList = ref<PostType>([]);

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '') => {
  const res = await myAxios.get("/post/list/my/create", {
    params: {
      currentId: currentID.value,
      searchText: val,
      pageNum: 1,
    },
  });
  if (res?.code === 0) {
    postList.value = res.data;
    console.log(postList.value);
  } else {
    Toast.fail('加载帖子失败，请刷新重试');
  }
}


// 页面加载时只触发一次
onMounted( () => {
  listTeam();
})

const onSearch = (val) => {
  listTeam(val);
};

</script>

<style scoped>
#teamPage {

}
</style>
