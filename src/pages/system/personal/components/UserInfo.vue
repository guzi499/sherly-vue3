<template>
  <div class="box-userInfo">
    <el-form :model="curUserInfo" style="margin-bottom: 24px">
      <el-form-item label="昵称：">
        <span>{{ curUserInfo.nickname }}</span>
      </el-form-item>
      <el-form-item label="姓名：">
        <span>{{ curUserInfo.realName }}</span>
      </el-form-item>
      <el-form-item label="性别：">
        <span>{{ curUserInfo.genderStr }}</span>
      </el-form-item>
      <el-form-item label="手机号：">
        <span>{{ curUserInfo.phone }}</span>
      </el-form-item>
      <el-form-item label="邮箱：">
        <span>{{ curUserInfo.email }}</span>
      </el-form-item>
      <el-form-item label="租户：">
        <span>{{ curUserInfo.tenantName }}</span>
      </el-form-item>
      <el-form-item label="部门：">
        <span>{{ curUserInfo.departmentName }}</span>
      </el-form-item>
      <el-form-item label="角色：">
        <span>
          <text v-for="(item, index) in curUserInfo.roleNames">{{ item + '、 ' }}</text>
        </span>
      </el-form-item>
      <el-form-item label="创建时间：">
        <span>{{ curUserInfo.createTime }}</span>
      </el-form-item>
    </el-form>
    <el-row class="btn">
      <el-col :push="5">
        <el-button type="primary" plain>编辑用户</el-button>
        <el-button type="warning" plain>修改密码</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "UserInfo",
  props: {
    curUserInfo: {
      type: Object,
      require: true
    }
  },
  setup() {
  }
}
</script>

<style lang="scss" scoped>
.box-userInfo {
  padding: 0 12px;
}

::v-deep .el-form-item {
  margin-bottom: 4px;
  border-bottom: 1px solid #efefef;
}

span {
  width: 100%;
  text-align: right;
}
</style>
