<template>
  <div class="email_container">
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
      <el-input v-model="form2.tos" style="width: 600px" placeholder="点击选择收件人" @click="handleClickInput"
                clearable/>
      <el-button type="primary" size="small" style="margin-left: 8px" v-show="form2.tos.length>0"
                 @click="handleReChoose">重新选择
      </el-button>
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
          <el-popconfirm
              confirm-button-text="是"
              cancel-button-text="否"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="是否确定发送？"
              @confirm="handleSend('ruleFormRef2')"
          >
            <template #reference>
              <el-button type="primary">发送邮件</el-button>
            </template>
          </el-popconfirm>
          <el-button type="info" @click="handleReset">内容重置</el-button>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
  <el-dialog v-model="dialogVisible" title="选择收件人" width="40%" center>
    <RecipientName ref="recipientName" v-model:dialogVisible="dialogVisible"
                   v-model:users="form2.tos"></RecipientName>
  </el-dialog>
  </div>
</template>

<script>
import {getCurrentInstance, onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch} from "vue";
import {sendEmail} from "@/api/system/email";
import {ElMessage, ElLoading} from "element-plus";
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {Editor, Toolbar} from "@wangeditor/editor-for-vue";
import RecipientName from './components/RecipientName.vue'

export default {
  name: "indexPage",
  components: {Editor, Toolbar, RecipientName},
  setup() {
    const {proxy} = getCurrentInstance()
    const loading = ref(false)
    // 发送邮件 - 表单数据
    const form2 = reactive({
      tos: [], // 	收件人邮箱
      content: '', //	正文
      subject: '' //	主题
    })
    // 重置表单
    const resetForm2 = () => {
      form2.content = ''
      form2.subject = ''
    }
    // 邮箱配置 - 表单数据校验
    const rules2 = reactive({
      subject: [
        {required: true, message: '请输入邮件标题', trigger: 'blur'}
      ],
      tos: [
        {required: true, message: '未选择收件人', trigger: 'change'}
      ],
      content: [
        {required: true, message: '请输入邮件正文', trigger: 'blur'}
      ],
    })
    const dialogVisible = ref(false)
    // 点击选择收件人
    const handleClickInput = () => {
      dialogVisible.value = true
    }

    const handleReChoose = () => {
      form2.tos = []
      dialogVisible.value = true
    }
    // 发送邮件按钮
    const handleSend = (formName) => {
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          loading.value = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          let _obj = form2
          _obj.tos = _obj.tos.map(item => {
            if(item.indexOf('|') == -1) {
              return item
            } else {
              return item.split('|')[1]
            }
          })
          console.log('验证通过', _obj)
          sendEmail(_obj).then(() => {
            loading.value.close()
            ElMessage({
              showClose: true,
              message: '邮件发送成功',
              type: 'success',
            })
            // resetForm2()
            handleReset()
          }).catch(() => {
            console.log('catch666666666666')
          })
        } else {
          return false;
        }
      })
    }

    // 内容重置
    const handleReset = () => {
      resetForm2()
      form2.subject = ''
      form2.content = ''
      valueHtml.value = '<p></p>'
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
    const editorConfig = {
      placeholder: '请输入内容...',
      MENU_CONF: {}
    }
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
    editorConfig.MENU_CONF['uploadImage'] = {
      // 自定义上传
      async customUpload(file) {
        // file 即选中的文件
        filesToBase64(file)
      },

      // 小于该值就插入 base64 格式（而不上传），默认为 0
      base64LimitSize: 1000 * 1024 // 1M
    }

    // 图片转base64
    const filesToBase64 = (file) => {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result  // base64格式的图片
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          ElMessage({
            showClose: true,
            message: '图片上传失败，请重新选择图片上传！',
            type: 'error',
          })
          resolve(imgResult)
        }
      })
    }



    watch(valueHtml, (val) => {
      // console.log(val)
      val === '<p><br></p>' ? form2.content = '' : form2.content = val
    })
    return {
      form2,
      rules2,
      handleClickInput,
      handleReChoose,
      dialogVisible,
      handleSend,
      handleReset,
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
    }
  }
}
</script>

<style lang="scss" scoped>
.email_container {
  padding: 16px;
}
</style>
