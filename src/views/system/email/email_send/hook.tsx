import { emailSendDTO } from "@/api/interface/email";
import { emailSend } from "@/api/email";
import { reactive, ref, computed, onMounted } from "vue";
import type { FormRules, FormInstance } from "element-plus";
import { menuListTree } from "@/api/menu";
import { menuListTreeVO } from "@/api/interface/menu";
import type { TabsPaneContext } from "element-plus";

export function useEmailSend() {
  const dataList = ref([]);
  const loading = ref(true);
  const buttonClass = computed(() => {
    return [
      "!h-[20px]",
      "reset-margin",
      "!text-gray-500",
      "dark:!text-white",
      "dark:hover:!text-primary"
    ];
  });
  const dialogVisible = ref(false as boolean);
  const title = ref("编辑" as string);
  const type = ref<string>("");
  const ruleForm = ref<emailSendDTO>({
    subject: "",
    tos: "",
    content: ""
  });
  const rules = reactive<FormRules>({
    subject: [{ required: true, message: "请输入邮件标题", trigger: "blur" }],
    tos: [{ required: true, message: "请选择收件用户", trigger: "change" }],
    content: [{ required: true, message: "请输入邮件正文", trigger: "blur" }]
  });
  const menuList = ref<menuListTreeVO[]>([]);
  const treeProps = {
    children: "children",
    label: "menuName"
  };

  const activeName = ref("first");

  // 查询菜单树
  async function menuTree() {
    const data: menuListTreeVO[] = await menuListTree();
    menuList.value = data;
  }

  const handleSelectEmail = () => {
    dialogVisible.value = true;
  };

  const handleClickTab = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
  };

  function handleClose() {
    dialogVisible.value = false;
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
  };

  const handleCancel = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    dialogVisible.value = false;
  };

  const handleSend = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async valid => {
      if (valid) {
        await emailSend(ruleForm.value);
      } else {
        return;
      }
    });
  };

  onMounted(() => {
    menuTree();
  });

  return {
    loading,
    dataList,
    buttonClass,
    dialogVisible,
    title,
    ruleForm,
    rules,
    type,
    menuList,
    treeProps,
    activeName,
    resetForm,
    handleSend,
    handleCancel,
    handleSelectEmail,
    handleClose,
    handleClickTab
  };
}
