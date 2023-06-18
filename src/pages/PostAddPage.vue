<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>

        <van-field name="uploader" label="图片:">
          <template #input>
            <van-uploader v-model="fileList" multiple :before-read="beforeRead" :after-read="afterRead"/>
          </template>
        </van-field>

        <van-field
            v-model="addPostData.title"
            name="name"
            label="帖子标题:"
            placeholder="请输入标题"
            :rules="[{ required: true, message: '请输入标题' }]"
        />
        <van-field
            v-model="addPostData.content"
            rows="4"
            autosize
            label="帖子描述:"
            type="textarea"
            placeholder="请输入内容"
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

import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../config/myAxios";
import {Toast} from "vant";
import {currentID} from "../states/currentID";

const router = useRouter();
// 展示日期选择器
const showPicker = ref(false);
const initFormData = {
  "title": "",
  "content": "",
  "postTime": "",
  "imageUrl": "",

}

const now = new Date();

// 需要用户填写的表单数据
const addPostData = ref({...initFormData})

const fileList = ref([]);
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
// 提交
const onSubmit = async () => {
  const postData = {
    currentId: currentID.value,
    ...addPostData.value,
  }
  // todo 前端参数校验

    const res = await myAxios.post("/post/add", postData);
    if (res?.code === 0 && res.data) {
      Toast.success('添加成功');
      router.push({
        path: '/post',
        replace: true,
      });
    } else {
      Toast.fail('添加失败');
    }


}
</script>

<style scoped>
#teamPage {

}
</style>
