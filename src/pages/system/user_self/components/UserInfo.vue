<template>
  <div class="box-userInfo">
    <ul>
      <li>
        <span class="icon">
          <i class="iconfont icon-nicheng"></i>
          昵称：
        </span>
        <span>{{ curUserInfo.nickname }}</span>
      </li>
      <li>
        <span class="icon">
          <i class="iconfont icon-zuoxixingming"></i>
          姓名：
        </span>
        <span>{{ curUserInfo.realName }}</span>
      </li>
      <li>
        <span class="icon">
          <i class="iconfont icon-xingbie"></i>
          性别：
        </span>
        <span>{{ curUserInfo.genderStr }}</span>
      </li>
      <li>
        <span class="icon">
          <i class="iconfont icon-shoujihao"></i>
          手机号：
        </span>
        <span>{{ curUserInfo.phone }}</span>
      </li>
      <li>
        <span class="icon">
          <i class="iconfont icon-youxiang"></i>
          邮箱：
        </span>
        <span>{{ curUserInfo.email }}</span>
      </li>
      <li>
        <span class="icon">
          <i class="iconfont icon-jiaoseguanlizuhu"></i>
          租户：
        </span>
        <span>{{ curUserInfo.tenantName }}</span>
      </li>
      <li>
        <span class="icon">
          <i class="iconfont icon-bumen"></i>
          部门：
        </span>
        <span>{{ curUserInfo.departmentName }}</span>
      </li>
      <li>
        <span class="icon">
          <i class="iconfont icon-jiaose"></i>
          角色：
        </span>
        <span>{{
            curUserInfo.roleNames && curUserInfo.roleNames.join('、')
          }}
        </span>
      </li>
      <li>
        <span class="icon">
          <i class="iconfont icon-chuangjianshijian"></i>
          创建时间：
        </span>
        <span>{{ curUserInfo.createTime }}</span>
      </li>
    </ul>
    <el-row class="btn">
      <el-col :push="5">
        <el-button type="primary" plain @click="handleEdit(curUserInfo)"
          >编辑用户</el-button
        >
        <el-button type="warning" plain @click="handlePwd">修改密码</el-button>
      </el-col>
    </el-row>
    <!--添加编辑用户弹框-->
    <el-dialog v-model="EditDialogVisible" title="信息编辑" width="25%" center>
      <el-form :model="formEdit" label-width="60px"  ref="formEditRef" :rules="formEditRules">
        <el-form-item label="手机号">
          <el-input v-model="formEdit.phone" disabled />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="formEdit.nickname" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formEdit.realName" disabled />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formEdit.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formEdit.email" />
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="formEdit.departmentName" disabled />
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="formEdit.roleNames" disabled />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="EditDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleOk('formEditRef')">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--添加修改密码弹框-->
    <el-dialog v-model="PwdDialogVisible" title="修改密码" width="25%" center>
      <el-form
        :model="formPwd"
        label-width="80px"
        ref="ruleFormRef"
        :rules="rules"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input
            type="password"
            v-model="formPwd.oldPassword"
            style="text-align: right"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="formPwd.newPassword" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword">
          <el-input v-model="formPwd.rePassword" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="PwdDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handlePwdOk('ruleFormRef')"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {ref, reactive, getCurrentInstance} from "vue";
import { updateSelf, updatePassword } from "@/api/system/personal.js";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

export default {
  name: "UserInfo",
  props: {
    curUserInfo: {
      type: Object,
      require: true
    }
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    // 添加编辑弹框是否可见
    const EditDialogVisible = ref(false);
    // 添加编辑弹框 - 表单数据
    const formEdit = ref({});
    // 重置编辑用户表单
    const reset = () => {
      formEdit.value = {};
    };
    // 编辑用户 按钮
    const handleEdit = (userInfo) => {
      reset();
      formEdit.value = JSON.parse(JSON.stringify(userInfo));
      EditDialogVisible.value = true;
      setTimeout(() => {
        proxy.$refs['formEditRef'].resetFields();
      }, 50)
    };
    // 编辑用户 - 确定按钮
    const handleOk = (formName) => {
      proxy.$refs[formName].validate((valid) => {
        if(valid){
          updateSelf(formEdit.value).then(() => {
            ElMessage({
              showClose: true,
              message: "更新用户信息成功",
              type: "success",
            });
            // 初始化数据
            emit('getList')
          }).finally(() => {
            EditDialogVisible.value = false
          })
        } else {
          return false;
        }
      })
    }

    // 添加修改密码弹框是否可见
    const PwdDialogVisible = ref(false)
    // 添加修改密码弹框 - 表单数据
    const formPwd = ref()

    /* 编辑用户表单校验 */
    const formEditRules = reactive({
      nickname: [
        {required: true, message: '用户昵称不能为空', trigger: 'blur'},
        { min: 3, max: 7, message: '用户昵称长度在 3 到 7 个字符', trigger: 'blur' }
      ],
      gender: [
        {required: true, message: '用户性别不能为空', trigger: 'change'}
      ],
      email: [
        {required: true, message: '用户邮箱不能为空', trigger: 'blur'},
        {
          pattern: '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$',
          message: '邮箱格式错误！'
        }
      ],
    })

    /* 密码表单校验 */
    const rules = reactive({
      oldPassword: [
        {required: true, message: '旧密码不能为空', trigger: 'blur'}
      ],
      newPassword: [
        {required: true, message: '新密码不能为空', trigger: 'blur'}
      ],
      rePassword: [
        {required: true, message: '确认密码不能为空', trigger: 'blur'}
      ],
    })

    // 重置修改密码表单
    const resetPwd = () => {
      formPwd.value = {}
      setTimeout(() => {
        proxy.$refs.ruleFormRef.resetFields()
      }, 50)
    }
    // 修改密码 按钮
    const handlePwd = () => {
      resetPwd()
      PwdDialogVisible.value = true
    }
    // 修改密码 - 确定按钮
    const handlePwdOk = (formName) => {
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(formPwd.value.newPassword, formPwd.value.rePassword)
          if (formPwd.value.newPassword === formPwd.value.rePassword) {
            updatePassword(formPwd.value).then(() => {
              ElMessage({
                showClose: true,
                message: '密码修改成功',
                type: 'success',
              })
              // 初始化数据
              // emit('getList')
              PwdDialogVisible.value = false
              setTimeout(() => {
                proxy.$alert('token过期，请重新登录！', '警告', {
                  confirmButtonText: '好的',
                  callback: () => {
                    Cookies.remove("metaTitle");
                    Cookies.remove("routePath");
                    localStorage.removeItem("token");
                    router.push("/login");
                  }
                });
              }, 1000)
            })
          } else {
            ElMessage({
              showClose: true,
              message: '两次密码输入不一致，请重新输入！',
              type: 'error',
            })
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    }

    return {
      EditDialogVisible,
      PwdDialogVisible,
      formEdit,
      formPwd,
      formEditRules,
      rules,
      handleEdit,
      handlePwd,
      handleOk,
      handlePwdOk,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-userInfo {
  padding: 0 12px;
}

ul {
  margin: 32px 0;
  padding: 0;

  li {
    margin-bottom: 8px;
    padding: 4px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: space-between;

    .icon {
      width: 40%;
      display: flex;
      align-items: center;

      i {
        margin-right: 4px;
      }
    }

    span {
      width: 60%;
      text-align: right;
    }
  }
}

:deep(.el-dialog__body)  {
  padding: 24px 40px;
}
</style>
