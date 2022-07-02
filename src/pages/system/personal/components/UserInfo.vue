<template>
  <div class="box-userInfo">
    <el-form :model="curUserInfo" style="margin-bottom: 24px">
      <el-form-item>
        <strong slot="label" class="icon">
          <i class="iconfont icon-nicheng"></i>
           昵称：
        </strong>
        <span>{{ curUserInfo.nickname }}</span>
      </el-form-item>
      <el-form-item>
        <strong slot="label" class="icon">
          <i class="iconfont icon-zuoxixingming"></i>
           姓名：
        </strong>
        <span>{{ curUserInfo.realName }}</span>
      </el-form-item>
      <el-form-item>
        <strong slot="label" class="icon">
          <i class="iconfont icon-xingbie"></i>
           性别：
        </strong>
        <span>{{ curUserInfo.genderStr }}</span>
      </el-form-item>
      <el-form-item>
        <strong slot="label" class="icon">
          <i class="iconfont icon-shoujihao"></i>
           手机号：
        </strong>
        <span>{{ curUserInfo.phone }}</span>
      </el-form-item>
      <el-form-item>
        <strong slot="label" class="icon">
          <i class="iconfont icon-youxiang"></i>
           邮箱：
        </strong>
        <span>{{ curUserInfo.email }}</span>
      </el-form-item>
      <el-form-item>
        <strong slot="label" class="icon">
          <i class="iconfont icon-jiaoseguanlizuhu"></i>
           租户：
        </strong>
        <span>{{ curUserInfo.tenantName }}</span>
      </el-form-item>
      <el-form-item>
        <strong slot="label" class="icon">
          <i class="iconfont icon-bumen"></i>
           部门：
        </strong>
        <span>{{ curUserInfo.departmentName }}</span>
      </el-form-item>
      <el-form-item>
        <strong slot="label" class="icon">
          <i class="iconfont icon-jiaose"></i>
           角色：
        </strong>
        <span>
          <text v-for="(item, index) in curUserInfo.roleNames">{{ item + '、 ' }}</text>
        </span>
      </el-form-item>
      <el-form-item>
        <strong slot="label" class="icon">
          <i class="iconfont icon-nicheng"></i>
           创建时间：
        </strong>
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

::v-deep .el-form-item__content {
  display: flex;
  justify-content: space-between;
  .icon {
    width: 30%;
    display: flex;
    align-items: center;
    i{
      margin-right: 4px;
    }
  }
  span {
    width: 70%;
  }
}


</style>
