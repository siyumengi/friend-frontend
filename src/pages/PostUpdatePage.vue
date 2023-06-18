<template>
  <div id="postAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>

        <van-field name="uploader" label="帖子图片:">
          <template #input>
            <van-uploader v-model=" fileList" multiple :before-read="beforeRead" :after-read="afterRead"/>
          </template>
        </van-field>

        <van-field
            v-model="addPostData.title"
            name="title"
            label="标题"
            placeholder="请输入标题"
            :rules="[{ required: true, message: '请修改标题' }]"
        />
        <van-field
            v-model="addPostData.content"
            rows="10"
            autosize
            label="帖子内容"
            type="textarea"
            placeholder="请修改内容"
        />

      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../config/myAxios";
import {Toast} from "vant";
import {currentID} from "../states/currentID";
import {PostType} from "../models/post";

const router = useRouter();
const route = useRoute();

// 展示日期选择器
const showPicker = ref(false);

const minDate = new Date();
const id = route.query.id;
// 需要用户填写的表单数据
const addPostData = ref<PostType>({})
const fileList = ref([
  {url: addPostData.value.avatarUrl, isImage: true},
  // Uploader 根据文件后缀来判断是否为图片文件
  // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明

]);
// 获取之前的队伍信息
onMounted(async () => {

      if (id <= 0) {
        Toast.fail('加载队伍失败');
        return;
      }
      const res = await myAxios.get("/post/get", {
        params: {
          id,
        }
      });
  console.log(addPostData.value)

      if (res?.code === 0) {
        addPostData.value = res.data;
        fileList.value[0].url = addPostData.value.imageUrl;
        addPostData.value.status = addPostData.value.status + "";
      } else {
        Toast.fail('更新帖子，请重试');
      }
    }
)

// 提交
const onSubmit = async () => {
  const postData = {
    currentId: currentID.value,
    ...addPostData.value,
    // status: Number(addPostData.value.status)
  }
  console.log(addPostData.value.imageUrl)
  // todo 前端参数校验
  const res = await myAxios.post("/post/update", postData);
  if (res?.code === 0 && res.data) {
    Toast.success('更新成功');
    router.push({
      path: '/post',
      replace: true,
    });
  } else {
    Toast.success('更新失败');
  }
}
console.log(addPostData.value.avatarUrl)

console.log("fileList:" + fileList.value.values())
console.log(fileList)
const beforeRead = (file: any) => {
  if (file.type !== 'image/jpeg') {
    Toast('请上传 jpg 格式图片');
    return false;
  }
  return true;
};

const afterRead = (file: any) => {
  // 返回图片信息
  console.log(file);
  const ImgUploadFile = async (params: any) => {
    // 要把数据变成file格式
    const formData = new FormData(); // 下面有备注
    formData.append('file', params);
    console.log(formData)
    return await myAxios.post('/upload/img', formData, {
      headers: {
        // 注意修改请求头file格式
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  ImgUploadFile(file.file)
  addPostData.value.imageUrl = "http://rw8frd8c7.bkt.clouddn.com/" + file.file.name;
}

</script>

<style scoped>
#teamPage {

}
</style>
