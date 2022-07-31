<template>
  <div class="box-avatar">
    <el-upload
        v-loading="loading"
        class="avatar-uploader"
        :action="action"
        :headers="header"
        :data="data"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
      <el-icon v-else class="avatar-uploader-icon">
        <Plus/>
      </el-icon>
    </el-upload>
<!--    {{ avatar }}-->
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import {ElMessage} from 'element-plus'
import {updateAvatar} from '@/api/system/user_self.js'
import Cookies from "js-cookie";
import {useRouter} from "vue-router";

export default {
  name: "AvatarPic",
  props: {
    avatar: {
      type: String
    }
  },
  setup() {
    const loading = ref(false)
    const router = useRouter();
    const imageUrl = ref(JSON.parse(Cookies.get("userInfo")).avatar || "");
    const action = "/api/oss/upload_one";
    const header = reactive({
      token: localStorage.getItem("token"),
      path: "",
    });
    const data = reactive({path: ''})

    const handleAvatarSuccess = (res, file) => {
      imageUrl.value = URL.createObjectURL(file.raw);
      let fileImg = new FormData()
      fileImg.append('file', file.raw)
      updateAvatar(fileImg).then(() => {
        loading.value = false
        ElMessage.success('头像上传成功!')
        router.go(0)
      }).catch(() => {
        ElMessage.info('头像上传超时!')
      }).finally(() => {
        loading.value = false
      })
    }
    const beforeAvatarUpload = (file) => {
      loading.value = true
      const isPNG = file.type === 'image/png' || file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isPNG) {
        ElMessage.error('上传头像图片只能是 PNG / jpg 格式!')
        loading.value = false
      }
      if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!')
        loading.value = false
      }
      return isPNG && isLt2M;
    }

    return {
      imageUrl,
      action,
      header,
      data,
      loading,
      handleAvatarSuccess,
      beforeAvatarUpload
    }
  }
}
</script>

<style scoped>
.box-avatar {
  text-align: center;
}
.avatar-uploader {
  margin-bottom: 24px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
