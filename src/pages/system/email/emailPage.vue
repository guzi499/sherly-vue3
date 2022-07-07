<template>
  <div class="email_container">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="邮箱配置" name="first">
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
                <el-button type="primary" @click="handleUpdata('ruleFormRef1')">更新配置</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>

      </el-tab-pane>
      <el-tab-pane label="发送邮件" name="second">
        <el-form
            ref="ruleFormRef2"
            :model="form2"
            :rules="rules2"
            label-width="120px"
        >
          <el-form-item label="邮件标题" prop="subject">
            <el-input v-model="form2.subject" style="width: 600px" placeholder="请输入邮件标题" />
          </el-form-item>
          <el-form-item label="收件用户" prop="tos">
            <!--            <el-input v-model="form2.tos" style="width: 380px"/>-->
            <el-select
                style="width: 600px" v-model="form2.tos" multiple filterable allow-create default-first-option
                remote reserve-keyword :loading="loading" :remote-method="remoteMethod" placeholder="请输入收件人邮箱" clearable>
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮件正文" prop="content">
            <div style="border: 1px solid #ccc">
              <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editorRef"
                  :defaultConfig="toolbarConfig"
                  :mode="mode"
              />
              <Editor
                  style="height: 500px; overflow-y: hidden;"
                  v-model="valueHtml"
                  :defaultConfig="editorConfig"
                  :mode="mode"
                  @onCreated="handleCreated"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col>
                <el-button type="primary" @click="handleSend('ruleFormRef2')">发送邮件</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {getCurrentInstance, reactive, ref, onBeforeUnmount, shallowRef, onMounted, watch} from 'vue'
import {getEmailOne, saveOrUpdateEmail, sendEmail} from '@/api/system/email.js'
import {ElMessage} from "element-plus";
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'

export default {
  components: {Editor, Toolbar},
  setup() {
    const {proxy} = getCurrentInstance()
    const loading = ref(false)
    // 默认选中第一个tab栏
    const activeName = ref('first')
    // tab栏点击事件
    const handleClick = (tab, event) => {
      console.log(tab.props.name, event)
    }
    // 邮箱配置 - 表单数据
    const form1 = ref({})
    // 邮箱配置 - 表单数据校验
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
      getEmailOne().then((res) => {
        console.log(res)
        form1.value = res
      })
    }
    getEmailOneFn()
    // 邮箱配置 - 更新配置按钮
    const handleUpdata = (formName) => {
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('验证通过', form1.value)
          saveOrUpdateEmail(form1.value).then(() => {
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

    //
    // 发送邮件 - 表单数据
    const form2 = ref({})
    // 邮箱配置 - 表单数据校验
    const rules2 = reactive({
      subject: [
        {required: true, message: '请输入邮件标题', trigger: 'blur'}
      ],
      tos: [
        {required: true, message: '请输入收件人邮箱', trigger: 'blur'}
      ],
      content: [
        {required: true, message: '请输入邮件正文', trigger: 'blur'}
      ],
    })
    const options = ref([])
    const suffix = reactive(['@qq.com', '@163.com', '@gmail.com', '@126.com', '@yeah.net', '@vip.163.com',
      '@wo.cn', '@188.com', '@aliyun.com', '@vip.sina.com', '@sina.com', '@sina.cn', '@sohu.com'])
    const remoteMethod = (query) => {
      if (query != '') {
        loading.value = true
        // 如果输入的没有@符
        if (query.indexOf('@') < 0) {
          options.value = []
          for (let i = 0; i < suffix.length; i++) {
            options.value.push({
              value: query + suffix[i],
              label: query + suffix[i]
            })
          }
          loading.value = false
        } else {
          options.value = []
          let ary = ref([])
          ary.value = suffix.filter(item => {
            return item.indexOf(query.split('@')[1]) > 0
          })
          ary.value.map(item => {
            return options.value.push({
              value: query.split('@')[0] + item,
              label: query.split('@')[0] + item
            })
          })
        }
      } else {
        options.value = []
      }

    }


    // 邮箱配置 - 更新配置按钮
    const handleSend = (formName) => {
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('验证通过', form2.value)
          sendEmail(form2.value).then(() => {
            ElMessage({
              showClose: true,
              message: '邮件发送成功',
              type: 'success',
            })
          })
        } else {
          return false;
        }
      })
    }

    // 富文本编辑器 ---------------------------------
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    // 内容 HTML
    const valueHtml = ref('<p></p>')
    // 模拟 ajax 异步获取内容
    onMounted(() => {
      setTimeout(() => {
        valueHtml.value = '<p></p>'
      }, 1500)
    })
    const toolbarConfig = {}
    const editorConfig = {placeholder: '请输入内容...'}
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
    watch(valueHtml, (val) => {
      val === '<p><br></p>' ? form2.value.content = '' : form2.value.content = val
    })


    return {
      activeName,
      handleClick,
      form1,
      form2,
      rules1,
      rules2,
      handleUpdata,
      handleSend,
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      remoteMethod,
      options

    }
  }
}
</script>
<style lang="scss" scoped>
.email_container {
  padding: 16px;
}
</style>
