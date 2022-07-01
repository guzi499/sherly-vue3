<template>
  <div class="box-avatar">
    <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
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
export default {
  name: "Avatar",
  props: {
    avatar: {
      type: String
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
