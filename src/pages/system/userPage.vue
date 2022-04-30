<!--
 * @Author: lihaoyu
 * @Date: 2022-04-18 09:52:49
 * @LastEditTime: 2022-04-19 11:23:13
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/pages/system/userPage.vue
-->
<template>
  <div class="user_container">
    <!-- 查询条件 -->
    <el-form :model="queryParms">
      <el-row>
        <el-form-item label="手机号: " style="margin-left: 20px">
          <el-input
              v-model="queryParms.phone"
              placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名: " style="margin-left: 20px">
          <el-input
              v-model="queryParms.realName"
              placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称: " style="margin-left: 20px">
          <el-input
              v-model="queryParms.nickname"
              placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门: " style="margin-left: 20px">
          <!--          <el-select-->
          <!--              ref="selectTree"-->
          <!--              v-model="queryParms.parentId"-->
          <!--              placeholder="请选择"-->
          <!--          >-->
          <!--            <el-option-->
          <!--                hidden-->
          <!--                :value="queryParms.parentId"-->
          <!--                :label="treeDatas"-->
          <!--            ></el-option>-->
          <!--            <el-tree-->
          <!--                :data="DepartmentList"-->
          <!--                :props="defaultProps"-->
          <!--                :expand-on-click-node="false"-->
          <!--                @node-click="nodeOnclick"-->
          <!--            />-->
          <!--          </el-select>-->
          <TreeSelect ref="selectTree" :treeList=DepartmentList :defaultProps="defaultProps"
                      @treeSelectList="treeSelectList"></TreeSelect>
        </el-form-item>
        <el-form-item style="margin-left: 20px">
          <el-button type="primary" @click="handleQuery">搜索</el-button>
          <el-button @click="resetFn">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- 操作按钮 -->
    <el-row :gutter="5" type="flex" justify="end" style="margin-bottom: 12px">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small" @click="handleEdit('1')">新增</el-button>
      </el-col>
    </el-row>
    <!-- 用户表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="phone" label="手机号" width="180"/>
      <el-table-column prop="realName" label="姓名" width="180"/>
      <el-table-column prop="nickname" label="昵称" width="180"/>
      <el-table-column prop="gender" label="性别" width="180"/>
      <el-table-column prop="departmentId" label="部门" width="180"/>
      <el-table-column prop="enable" label="禁用状态" width="180">
        <template #default="scope">
          <el-switch
              v-model="scope.row.enable"
              class="switch"
              :active-value="1"
              :inactive-value="0"
              @change="handleChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="lastLoginTime" label="创建时间" width="180"/>
      <el-table-column prop="name" label="操作" width="180">
        <template #default="scope">
          <el-button
              type="primary"
              size="small"
              @click="handleEdit('2', scope.$index, scope.row)"
          >修改
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete('2', scope.$index, scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
        style="margin-top: 20px"
        v-model:currentPage="queryParms.pageNum"
        v-model:page-size="queryParms.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
    <!--    新增 / 修改弹框-->
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="600px">
      <el-form :model="form">
        <el-form-item
            label="手机号"
            :label-width="formLabelWidth"
            prop="phone"
        >
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item
            label="姓名"
            :label-width="formLabelWidth"
            prop="realName"
        >
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-input v-model="form.gender"></el-input>
        </el-form-item>
        <el-form-item
            label="部门"
            :label-width="formLabelWidth"
            prop="phone"
        >
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="roleIds">
          <el-input v-model="form.roleIds"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button @click="handleCancle">取消</el-button>
          <el-button type="primary" @click="handleOk">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getCurrentInstance, ref, reactive, toRefs, onMounted} from "vue";
import {getDepartmentList} from '@/api/general.js'
import {pageUser} from '@/api/system/user.js'

export default {
  setup() {
    const {proxy} = getCurrentInstance();
    console.log(proxy);
    onMounted(() => {
      getDepartmentListFn()
      getList(data.queryParms)
    })

    const data = reactive(
        {
          // 查询条件
          queryParms: {
            pageNum: 1,
            pageSize: 10
          },
          // 部门下拉框配置项
          defaultProps: {
            children: "children",
            label: "departmentName",
          },
        }
    );

    // 搜索按钮
    const handleQuery = () => {
      console.log(data.queryParms)
    }

    // 重置按钮
    const resetFn = () => {
      data.queryParms = {
        pageNum: 1,
        pageSize: 10
      }
      console.log(data.queryParms)
      proxy.$refs.selectTree.treeSelectData = {}
      getList(data.queryParms)
    }
    // const treeDatas = ref('')
    // 选中弹框中的树形数据
    const treeSelectList = (e) => {
      console.log(e)
      data.queryParms.parentId = e.parentId;
      // treeDatas.value = e.departmentName;
    }


    // 分页数据
    const total = ref(400)
    const small = ref(false)
    const background = ref(false)
    const disabled = ref(false)
    const handleSizeChange = (val) => {
      console.log(`每页${val} 条`)
    }
    const handleCurrentChange = (val) => {
      console.log(`当前页: ${val}`)
    }

    // 定义表格数据
    const tableData = ref([])
    // 获取用户信息列表
    const getList = (data) => {
      pageUser(data).then(res => {
        tableData.value = res.result
        total.value = res.total
      })
    }

    // 公共部门下拉框
    const DepartmentList = ref([])
    // 获取公共部门下拉框数据
    const getDepartmentListFn = () => {
      getDepartmentList().then(res => {
        console.log('部门下拉框数据 === ', res)
        DepartmentList.value = res

      })
    }

    // 用户更新
    // const updataUserFn = (data) => {
    //   updataUser(data)
    // }

    // 禁用按钮状态改变
    const handleChange = (data) => {
      console.log(data)
    }

    // 新增 / 修改按钮弹框数据
    // 控制弹框是否显示
    const dialogFormVisible = ref(false);
    const formLabelWidth = "140px";
    // 弹框标题
    const dialogTitle = ref("用户");
    // 弹框新增 / 修改弹框绑定数据
    const form = reactive({});

    // 确定按钮
    const handleOk = () => {
      console.log('点击确定按钮')
      dialogFormVisible.value = false
    }
    // 取消按钮
    const handleCancle = () => {
      console.log('点击取消按钮')
      dialogFormVisible.value = false
    }

    // 新增 / 修改按钮
    const handleEdit = (type, index, data) => {
      dialogFormVisible.value = true
      if (type === "1") {
        dialogTitle.value = '用户新增'
        console.log("新增 === ", type, index, data);
      }
      if (type === "2") {
        dialogTitle.value = '用户更新'
        console.log("修改 === ", type, index, data);
      }
    };

    // 删除按钮
    const handleDelete = (type, index, data) => {
      if (type === "2") {
        console.log("删除 === ", type, index, data);
      }
    };

    return {
      ...toRefs(data),
      total,
      small,
      background,
      disabled,
      handleSizeChange,
      handleCurrentChange,
      tableData,
      DepartmentList,
      handleChange,
      dialogTitle,
      formLabelWidth,
      dialogFormVisible,
      form,
      handleOk,
      handleCancle,
      handleEdit,
      handleDelete,
      treeSelectList,
      handleQuery,
      resetFn
    };
  },
};
</script>

<style lang="scss" scoped>
.user_container {
  padding: 16px;
}
</style>
