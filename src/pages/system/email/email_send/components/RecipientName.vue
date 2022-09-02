<template>
  <!--  <el-dialog v-model="visible" title="Warning" width="30%" center>-->
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="用户" name="user" :disabled="list2.length > 0">
      <TransferName ref="transferName" :activeName="activeName" :users="users" @sonUsers="handleUsers"
                    :list1="list1" v-model:list2="list2" @dialogVisible="handleDialogVisible"></TransferName>
    </el-tab-pane>
    <el-tab-pane label="角色" name="role" :disabled="list2.length > 0">
      <TransferName ref="transferName" :activeName="activeName" :users="users" @sonUsers="handleUsers"
                    :list1="list1" v-model:list2="list2" @dialogVisible="handleDialogVisible"></TransferName>
    </el-tab-pane>
    <el-tab-pane label="部门" name="department" :disabled="list2.length > 0">
      <TransferName ref="transferName" :activeName="activeName" :users="users" @sonUsers="handleUsers"
                    :list1="list1" v-model:list2="list2" @dialogVisible="handleDialogVisible"></TransferName>
    </el-tab-pane>
  </el-tabs>
  <!--  </el-dialog>-->
</template>

<script>
import {ref, toRefs, watch} from 'vue'
import {userListAll} from '@/api/system/user.js'
import {roleListAll} from '@/api/system/role.js'
import {departmentListTree} from '@/api/system/department.js'

export default {
  name: "RecipientName",
  props: {
    users: {
      type: Array,
      default: () => {
        []
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    // 默认tab栏选项
    const activeName = ref('user')
    const list1 = ref([])
    const list2 = ref([])
    const isDisabled = ref(false)
    const {dialogVisible, users} = toRefs(props)
    const transferName = ref()
    // tab栏切换
    const handleClick = (tab, event) => {
      console.log(tab.props.name, event)
      getList()
    }
    const getList = async () => {
      list1.value = []
      if (activeName.value === 'user') {
        const res = await userListAll()
        list1.value = res
      }
      if (activeName.value === 'role') {
        const res = await roleListAll()
        list1.value = res
      }
      if (activeName.value === 'department') {
        const res = await departmentListTree()
        list1.value = res
      }
    }
    getList()
    const handleUsers = (val) => {
      emit('update:users', val)
    }
    const handleDialogVisible = (val) => {
      emit('update:dialogVisible', val)
    }
    watch(dialogVisible, (val) => {
      if (val) {
        if(!users.value.length) {
          activeName.value = 'user'
          list2.value = []
          getList()
        }
      }
    })
    return {
      activeName,
      list1,
      list2,
      isDisabled,
      transferName,
      handleUsers,
      getList,
      handleClick,
      handleDialogVisible
    }
  }
}
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

:deep(.el-transfer__buttons) {
  display: none;
}

:deep(.el-transfer-panel) {
  margin: 0 8px;
}

:deep(.el-transfer) {
  display: flex;
  justify-content: center;
}
</style>
