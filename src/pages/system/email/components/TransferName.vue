<template>
  <el-row class="el_row">
    <!--    左侧穿梭框-->
    <el-col class="el-col" :span="9">
      <ul class="left">
        <li v-for="item in list1" :key="item.userId" :hidden="activeName !== 'user'">
          <el-checkbox-group v-model="checked1" @change="handleCheckbox">
            <el-checkbox :disabled="item.email === null"
                         :label="item.realName + (item.email === null ? '' : '|' + item.email)"
                         size="large"/>
          </el-checkbox-group>
        </li>
        <li v-for="item in list1" :key="item.roleId" :hidden="activeName !== 'role'">
          <el-checkbox-group v-model="checked1" @change="handleCheckbox">
            <el-checkbox :label="item.roleId" size="large">
              {{ item.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </li>
        <li :hidden="activeName !== 'department'">
          <el-tree ref='tree' :data="list1" :props="defaultProps" show-checkbox @check-change="handleCheckbox"/>
        </li>
      </ul>
    </el-col>
    <!--    右侧穿梭框-->
    <el-col class="el-col" :span="9">
      <ul class="right">
        <li v-for="item in list2" :key="item.value" :hidden="activeName !== 'user'">
          <el-checkbox-group v-model="checked2" @change="handleRightCheck">
            <el-checkbox :label="item" size="large"/>
          </el-checkbox-group>
        </li>
        <li v-for="item in list2" :key="item.userId" :hidden="activeName === 'user'">
          <el-checkbox-group v-model="checked2" @change="handleRightCheck">
            <el-checkbox :label="item.realName + (item.email === null ? '' : '|' +  item.email)" size="large"
                         :disabled="item.email === null "/>
          </el-checkbox-group>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
import {getCurrentInstance, ref, toRefs, watch} from 'vue'
import {getUserList_all} from '@/api/system/user.js'

export default {
  name: "transferName",
  props: {
    activeName: {
      type: String,
      default: 'user'
    },
    list1: {
      type: Array,
      default: () => {
        []
      }
    },
    list2: {
      type: Array,
      default: () => {
        []
      }
    },
    users: {
      type: Array,
      default: () => {
        []
      }
    }
  },
  setup(props, {emit}) {
    const proxy = getCurrentInstance()
    const checked1 = ref([])
    const checked2 = ref([])
    const {activeName, list2} = toRefs(props)
    const departmentIds = ref([])
    // 左边复选框选中
    const handleCheckbox = async (val) => {
      if (activeName.value === 'user') {
        emit('update:list2', val)
      }
      if (activeName.value === 'role') {
        const res = await getUserList_all({roleIds: val.join(',')})
        val.length === 0 ? emit('update:list2', []) : emit('update:list2', res)
      }
      if (activeName.value === 'department') {
        departmentIds.value = []
        proxy.refs.tree.getCheckedNodes().forEach(item => {
          departmentIds.value.push(item.departmentId)
        })
        const res = await getUserList_all({departmentIds: (departmentIds.value).join(',')})
        departmentIds.value.length === 0 ? emit('update:list2', []) : emit('update:list2', res)
      }
      if(!val.length) {
        emit('sonUsers', [])
      }
    }
    // 右边复选框选中
    const handleRightCheck = (val) => {
      emit('sonUsers', val)
    }

    const defaultProps = {
      children: 'children',
      label: 'departmentName',
    }

    watch(list2, (val) => {
      if(val.length === 0) {
        checked1.value = []
        checked2.value = []
      }
    })



    return {
      checked1,
      checked2,
      handleCheckbox,
      handleRightCheck,
      defaultProps
    }
  }
}
</script>

<style lang="scss" scoped>
/* 滚动条整体部分 */
::-webkit-scrollbar {
  width: 20px;
}

/*滚动条轨道、滚动条*/
::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 50px;
  border: 6px solid transparent;
}

/*滚动条轨道*/
::-webkit-scrollbar-track {
  box-shadow: 1px 1px 10px #fff inset;
}

/*滚动条*/
::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgb(204, 204, 204) inset;
}

/*边角*/
::-webkit-scrollbar-corner {
  background: transparent;
}

.el_row {
  display: flex;
  justify-content: center;
  margin: 12px 0;

  .el-col {
    height: 320px;
    border: 1px solid #efefef;
    border-radius: 8px;
    margin: 0 8px;
    padding: 0 20px;
    overflow: hidden;

    ul {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow-y: scroll;
    }
  }
}


</style>
