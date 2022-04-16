<template>
  <div class="departmentPage">
    <el-row type="flex" class="search">
      <el-col :span="1.5" class="searchName">部门名称：</el-col>
      <el-col :span="5">
        <el-input v-model="input" placeholder="请输入部门名称" />
      </el-col>
      <el-col :span="1.2" class="btn">
        <el-button type="primary" :icon="Search" @click="searchBtn"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="1.2" class="btn">
        <el-button :icon="Refresh" @click="resetBtn">重置</el-button>
      </el-col>
      <el-col :span="1.2" class="btn">
        <el-button type="primary" :icon="Plus" @click="handleClick('')"
          >新增</el-button
        >
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      class="table"
    >
      <el-table-column
        prop="departmentName"
        label="部门名称"
        width="300"
        align="center"
      />
      <el-table-column
        prop="description"
        label="描述"
        width="502"
        align="center"
      />
      <el-table-column prop="sort" label="排序" width="100" align="center" />
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="300"
        align="center"
      />
      <el-table-column prop="date" label="操作" width="300" align="center">
        <template #default="{ row, $index }">
          <el-button type="text" size="small" @click="handleClick(row, $index)"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="tips = true"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 表单 -->
    <el-dialog v-model="dialogFormVisible" title="部门表单" center>
      <el-form :model="form">
        <el-form-item label="部门名称：" :label-width="200">
          <el-input v-model="form.permissionName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述：" :label-width="200">
          <el-input v-model="form.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="父级部门：" :label-width="200">
          <el-select v-model="form.parentId" placeholder="请选择">
            <el-option label="一级" value="shanghai" />
            <el-option label="二级" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 提示框 -->
    <el-dialog
      v-model="tips"
      title="提示"
      width="30%"
      :before-close="handleClose"
      center
    >
      <span>确定要删除本条数据吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="tips = false">取消</el-button>
          <el-button type="primary" @click="delConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
const input = ref('')
const tableData = reactive([
  {
    // parentId: '0', // id
    createTime: '2020', // 创建时间
    description: '描述', // 描述
    departmentName: '研发部', // 部门名称
    sort: '1' // 排序
  }
])
const dialogFormVisible = ref(false)
const form = reactive({
  permissionName: '',
  description: '',
  parentId: ''
})
const tips = ref(false)

// 方法;;
// 编辑，新增
const handleClick = (row, $index) => {
  console.log(row, $index)
  dialogFormVisible.value = true
}
// 删除
const handleDelect = (row, $index) => {
  console.log(row, $index)
  tips.value = true
  // console.log('这是删除')
}
// 提交表单
const confirm = () => {
  dialogFormVisible.value = false
}
// 搜索
const searchBtn = () => {}

// 重置
const resetBtn = () => {}

// 删除确认
const delConfirm = () => {
  handleDelect()
}
</script>

<style lang="scss" scope>
.departmentPage {
  padding: 30px 100px;
  box-sizing: border-box;
  .search {
    margin-top: 20px;
    .searchName {
      align-self: center;
    }
    .btn {
      margin-left: 10px;
    }
    .btn:last-child {
      margin-left: auto;
    }
  }
  .table {
    margin-top: 50px;
  }
}
</style>
