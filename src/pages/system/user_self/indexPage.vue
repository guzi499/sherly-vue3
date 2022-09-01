<template>
  <div class="sherly-page-wrapper">
    <div class="personal_container">
      <el-card class="info" :header="title.header1">
        <Avatar :avatar="curUserInfo.avatar"/>
        <UserInfo :curUserInfo="curUserInfo" @getList="getList"/>
      </el-card>
      <el-card class="operator" :header="title.header2">
        <OperationLog :userId="userId"></OperationLog>
      </el-card>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import Avatar from './components/AvatarPic.vue'
import UserInfo from './components/UserInfo.vue'
import OperationLog from './components/OperationLog.vue'
import { userSelfGetSelf } from '@/api/system/user_self.js'

export default {
  components: {
    Avatar,
    UserInfo,
    OperationLog
  },
  setup() {
    onMounted(() => {
      getList()
    })

    const title = reactive({
      header1: '个人信息',
      header2: '操作日志'
    })

    const route = useRoute()
    // 获取当前登录用户的userId
    const userId = parseInt(route.query.userId)
    // 定义当前用户的用户信息
    const curUserInfo = ref({})
    // 获取当前登录用户的用户信息
    const getList = () => {
      userSelfGetSelf().then(res => {
        console.log(res)
        curUserInfo.value = res
      })
    }

    return {
      title,
      userId,
      curUserInfo,
      getList
    };
  },
};
</script>

<style lang="scss" scoped>
.personal_container {
  display: flex;
}

.info {
  width: 400px;
  height: 700px;
  margin-right: 8px;
}

.operator {
  width: 70%;
  margin-left: 8px;
}
</style>
