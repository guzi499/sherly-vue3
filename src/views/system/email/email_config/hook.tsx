import { reactive, ref, onMounted } from "vue";
import type { FormRules, FormInstance } from "element-plus";
import {
  EmailGetOneRespDTO,
  EmailSaveOrUpdateReqDTO
} from "@/api/interface/email";
import { emailGetOne, emailSaveOrUpdate } from "@/api/email";

export function useEmailConfig() {
  const loading = ref(true);
  const ruleForm = ref<EmailSaveOrUpdateReqDTO>({
    senderEmail: "",
    senderUser: "",
    password: "",
    host: "",
    port: "",
    sslFlag: "",
    startTlsFlag: ""
  });
  const rules = reactive<FormRules>({
    senderEmail: [
      { required: true, message: "请输入发件人邮箱", trigger: "blur" }
    ],
    senderUser: [
      { required: true, message: "请输入发件人名称", trigger: "blur" }
    ],
    password: [{ required: true, message: "请输入邮箱密码", trigger: "blur" }],
    host: [{ required: true, message: "请输入SMTP地址", trigger: "blur" }],
    port: [{ required: true, message: "请输入SMTP端口", trigger: "blur" }]
  });
  async function onSearch() {
    loading.value = true;
    const data: EmailGetOneRespDTO = await emailGetOne();
    ruleForm.value = data;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const handleCancel = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  const handleOk = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async valid => {
      if (valid) {
        loading.value = true;
        await emailSaveOrUpdate(ruleForm.value);
        setTimeout(() => {
          loading.value = false;
        }, 500);
      } else {
        return;
      }
    });
  };

  onMounted(() => {
    onSearch();
  });

  return {
    loading,
    ruleForm,
    rules,
    onSearch,
    handleOk,
    handleCancel
  };
}
