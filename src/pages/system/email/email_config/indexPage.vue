<template>
  <div class="sherly-page-wrapper">
    <el-form
        ref="ruleFormRef1"
        :model="form1"
        :rules="rules1"
        label-width="120px"
        style="width: 500px"
    >
      <el-form-item label="发送人邮箱" prop="senderEmail">
        <el-input v-model="form1.senderEmail"/>
      </el-form-item>
      <el-form-item label="发件人名称" prop="senderUser">
        <el-input v-model="form1.senderUser"/>
      </el-form-item>
      <el-form-item label="邮箱密码" prop="password">
        <el-input type="password" v-model="form1.password" show-password/>
      </el-form-item>
      <el-form-item label="SMTP地址" prop="host">
        <el-input v-model="form1.host"/>
      </el-form-item>
      <el-form-item label="SMTP端口" prop="port">
        <el-input v-model="form1.port"/>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col>
            <el-popconfirm
                confirm-button-text="是"
                cancel-button-text="否"
                :icon="InfoFilled"
                icon-color="#626AEF"
                title="此操作将更新配置，是否继续？"
                @confirm="handleUpdate('ruleFormRef1')"
            >
              <template #reference>
                <el-button type="primary" v-permission="['email_save_or_update']">更新配置</el-button>
              </template>
            </el-popconfirm>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {getCurrentInstance, reactive, ref} from 'vue'
import {emailGetOne, emailSaveOrUpdate} from '@/api/system/email.js'
import {ElMessage} from "element-plus";

export default {
  setup() {
    const {proxy} = getCurrentInstance()
    // 默认选中第一个tab栏
    const activeName = ref('first')
    // tab栏点击事件
    const handleClick = (tab, event) => {
      console.log(tab.props.name, event)
    }
    // 邮箱配置 - 表单数据
    const form1 = ref({})
    const rules1 = reactive({
      senderEmail: [
        {required: true, message: '发件人邮箱不能为空', trigger: 'blur'}
      ],
      senderUser: [
        {required: true, message: '发件人名称不能为空', trigger: 'blur'}
      ],
      password: [
        {required: true, message: '邮箱密码不能为空', trigger: 'blur'}
      ],
      host: [
        {required: true, message: '邮件服务器SMTP地址不能为空', trigger: 'blur'}
      ],
      port: [
        {required: true, message: '邮件服务器SMTP端口不能为空', trigger: 'blur'}
      ],
    })
    const getEmailOneFn = () => {
      emailGetOne().then((res) => {
        form1.value = res
      })
    }
    getEmailOneFn()
    // 邮箱配置 - 更新配置按钮
    const handleUpdate = (formName) => {
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log('验证通过', form1.value)
          emailSaveOrUpdate(form1.value).then(() => {
            ElMessage({
              showClose: true,
              message: '邮箱配置更新成功',
              type: 'success',
            })
            getEmailOneFn()
          })
        } else {
          return false;
        }
      })
    }
    return {
      activeName,
      form1,
      rules1,
      mode: 'default',
      handleClick,
      handleUpdate
    }
  }
}
</script>
