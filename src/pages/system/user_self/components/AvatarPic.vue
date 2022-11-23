<template>
  <div class="sherly-page-wrapper">
    <div class="box-avatar">
      <div class="avatar-uploader" @click="() => {
        visible = true
        open = true
      }">
        <img v-if="imageUrl" :src="avatarImg" class="avatar"/>
        <el-icon v-else class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </div>
    </div>
    <!--    头像裁切弹窗-->
    <el-dialog title="头像上传" v-model="open" center append-to-body>
      <div v-if="visible">
        <el-upload
            class="upload-demo"
            drag
            action="#"
            :before-upload="beforeAvatarUpload"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            拖动图片到此处或 <em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              上传头像图片只能是 PNG / jpg 格式、图片不大于2Mb！
            </div>
          </template>
        </el-upload>
      </div>
      <div v-else>
        <el-row>
          <el-col :xs="24" :md="12" :style="{height: '350px'}">
            <div style="width: 100%; height: 100%">
              <vue-cropper
                  ref="cropper"
                  :img="options.img"
                  :autoCrop="options.autoCrop"
                  :autoCropWidth="options.autoCropWidth"
                  :autoCropHeight="options.autoCropHeight"
                  :fixedBox="options.fixedBox"
                  @realTime="realTime"
              >
              </vue-cropper>
            </div>
          </el-col>
          <el-col :xs="24" :md="12" :style="{height: '350px', overflow: hidden}">
            <div :style="previewStyle">
              <div :style="previews.div">
                <img :src="previews.url" :style="previews.img">
              </div>
            </div>
          </el-col>
        </el-row>
        <br/>
        <el-row>
          <el-col :lg="2" :md="2">
            <el-upload action="#" :http-request="requestUpload" :show-file-list="false"
                       :before-upload="beforeAvatarUpload">
              <el-button size="small">
                选择
                <el-icon style="vertical-align: middle">
                  <UploadFilled />
                </el-icon>
              </el-button>
            </el-upload>
          </el-col>
          <el-col :lg="{span: 1, offset: 2}" :md="2">
            <el-button size="small" @click="$refs.cropper.changeScale(1)">
              <el-icon style="vertical-align: middle">
                <Plus/>
              </el-icon>
            </el-button>
          </el-col>
          <el-col :lg="{span: 1, offset: 1}" :md="2">
            <el-button size="small" @click="$refs.cropper.changeScale(-1)">
              <el-icon style="vertical-align: middle">
                <Minus/>
              </el-icon>
            </el-button>
          </el-col>
          <el-col :lg="{span: 1, offset: 1}" :md="2">
            <el-button size="small" @click="$refs.cropper.rotateLeft()">
              <el-icon style="vertical-align: middle">
                <RefreshLeft/>
              </el-icon>
            </el-button>
          </el-col>
          <el-col :lg="{span: 1, offset: 1}" :md="2">
            <el-button size="small" @click="$refs.cropper.rotateRight()">
              <el-icon style="vertical-align: middle">
                <RefreshRight/>
              </el-icon>
            </el-button>
          </el-col>
          <el-col :lg="{span: 2, offset: 6}" :md="2">
            <el-button type="primary" size="small" @click="handleAvatarSuccess()">提 交</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import {ElMessage} from 'element-plus'
import {userSelfUpdateAvatar} from '@/api/system/user_self.js'
import Cookies from "js-cookie";
import {useRouter} from "vue-router";
import 'vue-cropper/dist/index.css'
import { VueCropper }  from "vue-cropper";

export default {
  name: "AvatarPic",
  components: {
    VueCropper
  },
  props: {
    avatar: {
      type: String
    }
  },
  setup() {
    const loading = ref(false)
    const router = useRouter();
    const cropper = ref(null)
    const avatarImg = ref(JSON.parse(Cookies.get("userInfo")).avatar || "");
    const imageUrl = ref(JSON.parse(Cookies.get("userInfo")).avatar || "");
    const action = "/api/oss/upload_one";
    const imgName = ref('')
    const header = reactive({
      token: localStorage.getItem("token"),
      path: "",
    });
    const data = reactive({path: ''})
    const open = ref(false)
    const visible = ref(false)

    const options = reactive({
      img: imageUrl, //裁剪图片的地址
      autoCrop: true, // 是否默认生成截图框
      autoCropWidth: 200, // 默认生成截图框宽度
      autoCropHeight: 200, // 默认生成截图框高度
      fixedBox: true // 固定截图框大小 不允许改变
    })

    const previews = ref({})

    // 覆盖默认的上传行为
    const requestUpload = () => {
    }

    const previewStyle = ref({})
    // 实时预览
    const realTime = (data) => {
      previewStyle.value = {
        width: data.w + "px",
        height: data.h + "px",
        overflow: "hidden",
        margin: "0 auto",
        border: '1px dashed pink',
        borderRadius: '10px',
        zoom: 1
      }
      previews.value = data;
    }


    // 头像上传成功
    const handleAvatarSuccess = () => {
      let fileImg = new FormData()
      cropper.value.getCropBlob(data => {
        let file = new File([data], imgName.value)
        fileImg.append('file', file)
        console.log(fileImg)
        userSelfUpdateAvatar(fileImg).then(() => {
          loading.value = false
          ElMessage.success('头像上传成功!')
          imageUrl.value = options.img
          router.go(0)
        }).catch(() => {
          return false
        }).finally(() => {
          loading.value = false
        })
      })
    }

    // 上传头像前
    const beforeAvatarUpload = (file) => {
      visible.value = false
      imgName.value = file.name
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
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        options.img = reader.result;
      };
      return isPNG && isLt2M;
    }
    return {
      avatarImg,
      imageUrl,
      action,
      header,
      data,
      loading,
      visible,
      open,
      options,
      previews,
      previewStyle,
      cropper,
      handleAvatarSuccess,
      beforeAvatarUpload,
      requestUpload,
      realTime
    }
  }
}
</script>

<style scoped lang="scss">
.box-avatar {
  text-align: center;
}

.avatar-uploader {
  width: 178px;
  height: 178px;
  margin: 0 auto 24px;
  border: 1px dashed pink;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transition: 0.3s;
    opacity: 0.7;
  }
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

.cropper {
  width: 200px;
  height: 200px;
}

.upload-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
