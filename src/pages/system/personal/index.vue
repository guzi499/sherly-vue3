<template>
  <div class="personal_container">
    <el-card class="info" :header="title.header1">
      <Avatar :avatar="curUserInfo.avatar"/>
      <UserInfo :curUserInfo="curUserInfo" @getList="getList"/>
    </el-card>
    <el-card class="operator" :header="title.header2">

    </el-card>
  </div>
</template>

<script>
import {ref, reactive, onMounted} from "vue";
import { useRoute } from "vue-router";
import Avatar from './components/Avatar.vue'
import UserInfo from './components/UserInfo.vue'
import {getSelf} from '@/api/system/personal.js'

export default {
  components: {
    Avatar,
    UserInfo
  },
  setup() {
    onMounted(() => {

    })

    const title = reactive({
      header1: '个人信息',
      header2: '操作日志'
    })

    const route = useRoute()
    const userId = parseInt(route.query.userId) // 获取当前登录用户的userId
    const curUserInfo = ref({})  // 定义当前用户的用户信息
    // 获取当前登录用户的用户信息
    const getList = () => {
      getSelf(userId).then(res => {
        console.log(res)
        curUserInfo.value = res
      })
    }
    getList()

    return {title, userId, curUserInfo, getList};
  },
};
</script>

<style lang="scss" scoped>
.personal_container {
  padding: 12px;
  display: flex;


}

.info {
  width: 400px;
  margin-right: 8px;
}

.operator {
  width: 70%;
  margin-left: 8px;
}
</style>
