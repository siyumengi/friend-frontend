<template>
  <van-pull-refresh v-model="load" @refresh="onRefresh">
    <post-card-list :post-list="postList" :loading="loading"/>
    <van-empty v-if="!postList || postList.length < 1" description="数据为空"/>
    <van-button class="add-button" type="primary" icon="plus" style="z-index: 999;" @click="toAddPost" />
  </van-pull-refresh>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from 'vue';
import myAxios from "../config/myAxios";
import {Toast} from "vant";

import {useRouter} from "vue-router";
import {currentID} from "../states/currentID";
import PostCardList from "../components/PostCardList.vue";

const router = useRouter();
const isMatchMode = ref<boolean>(false);
const count = ref(0);
const load = ref(false);
const postList = ref([]);
const loading = ref(true);
const isListeningToScroll = ref(false); // 添加标志变量
// 页面加载时只触发一次
onMounted(() => {
  loadData();
})


/**
 * 加载数据
 */
const loadData = async () => {

  let postListData;
  loading.value = true;

  // // 普通模式，直接分页查询用户
  let pageNum = 1;
  postListData = null;
  postListData = await myAxios.get('/post/list', {
    params: {
      currentId: currentID.value,
      pageSize: 10,
      pageNum: pageNum,
    },
  })
      .then(function (response) {
        console.log('/post/list succeed', response);
        return response?.data;
      })
      .catch(function (error) {
        console.error('/post/list error', error);
        Toast.fail('请求失败');
      })
  console.log(postListData)
  if (!isListeningToScroll.value) { // 只在需要时添加监听器
    isListeningToScroll.value = true; // 更新标志变量
    window.addEventListener('scroll', async function () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      const distance = scrollHeight - scrollTop - clientHeight;
      if (distance < 50) {
        // 已经滚动到底部
        // do something
        // alert("滚动到了底部")
        pageNum = pageNum + 1;
        const Data = await myAxios.get('/post/list', {
          params: {
            currentId: currentID.value,
            pageSize: 10,
            pageNum: pageNum,
          },
        })
            .then(function (response) {
              console.log('/post/list succeed', response);
              return response?.data;
            })
            .catch(function (error) {
              console.error('/post/list error', error);
              Toast.fail('请求失败');
            })
        console.log(Data)
        if (Data) {
          postList.value = postList.value.concat(Data);
        }
      }
    });
  }

  if (postListData) {
    // postListData.forEach((post: PostType) => {
    //   // if (user.tags) {
    //   //   user.tags = JSON.parse(user.tags);
    //   // }
    // })
    postList.value = postListData;
    console.log("postList:" + postList)
  }
  loading.value = false;
}

const toAddPost = () => {
  router.push({
    path: "/post/add"
  })
}

watchEffect(() => {
  loadData();
})
/**点击搜索小图标 查找队友 */
const toSearch = () => {
  router.push('/search')
}

const onRefresh = () => {
  loadData();
  setTimeout(() => {
    Toast.success('刷新成功');
    load.value = false;
    count.value++;
  }, 1000);
};


</script>

<style scoped>
#search {
  margin: 5px;
  color: #1989FA;
}
</style>
