import dayjs from "dayjs";
import { roleListPage } from "@/api/role";
import { RolePageVO } from "@/api/interface/role";
import { userGetOneVO, userListPageVO } from "@/api/interface/userManagement";
import type { PaginationProps } from "@pureadmin/table";
import { reactive, ref, computed, onMounted } from "vue";
import type { FormRules, FormInstance } from "element-plus";
import {
  userBanOne,
  userGetOne,
  userListPage,
  userRemoveOne,
  userSaveOne,
  userUpdateOne
} from "@/api/userManagement";
import { userListPageDTO } from "@/api/interface/userManagement";
import { departmentListTreeVO } from "@/api/interface/department";
import { departmentListTree } from "@/api/department";

export function useDepartment() {
  const form: userListPageDTO = reactive({
    realName: "",
    nickname: "",
    phone: "",
    email: "",
    departmentIds: [],
    enable: null,
    createTime: ["", ""],
    current: 1,
    size: 10
  });
  const dataList = ref([]);
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      type: "selection",
      width: 55,
      align: "left",
      hide: ({ checkList }) => !checkList.includes("勾选列")
    },
    {
      label: "序号",
      type: "index",
      width: 70,
      hide: ({ checkList }) => !checkList.includes("序号列")
    },
    {
      label: "姓名",
      prop: "realName",
      minWidth: 100
    },
    {
      label: "昵称",
      prop: "nickname",
      minWidth: 120
    },
    {
      label: "性别",
      prop: "gender",
      minWidth: 120,
      cellRenderer: ({ row }) => {
        function name() {
          if (row.gender === "MALE") {
            return "男";
          } else if (row.gender === "FEMALE") {
            return "女";
          } else {
            return "";
          }
        }

        return <div>{name()}</div>;
      }
    },
    {
      label: "手机号",
      prop: "phone",
      minWidth: 120
    },
    {
      label: "邮箱",
      prop: "email",
      minWidth: 120
    },
    {
      label: "部门",
      prop: "departmentName",
      minWidth: 120
    },
    {
      label: "状态",
      prop: "departmentName",
      minWidth: 120,
      cellRenderer: ({ row }) => {
        function isDisabled() {
          if (row.enable === "ENABLE") {
            return true;
          } else {
            return false;
          }
        }

        return (
          <el-switch
            value={isDisabled()}
            onChange={async val => {
              await userBanOne({
                enable: val ? "ENABLE" : "DISABLE",
                userId: row.userId
              });
              await onSearch();
            }}
          />
        );
      }
    },
    {
      label: "创建时间",
      minWidth: 180,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];
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
  const ruleForm = ref<userGetOneVO>({
    phone: "",
    departmentId: null,
    gender: "",
    realName: "",
    roleIds: [],
    nickname: ""
  });
  const rules = reactive<FormRules>({
    phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
    realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
    departmentId: [{ required: true, message: "请选择部门", trigger: "blur" }],
    roleIds: [{ required: true, message: "请选择角色", trigger: "blur" }]
  });
  const departmentList = ref<departmentListTreeVO[]>([]);
  const treeProps = {
    children: "children",
    label: "departmentName"
  };

  const roleList = ref<RolePageVO[]>([]);

  // 查询角色
  async function getRoleList() {
    const data = await roleListPage({ current: 1 });
    roleList.value = data.result;
  }

  // 新增 / 编辑
  async function handleUpdate(ty, row) {
    ruleForm.value = {};
    if (ty !== "add") {
      const data = await userGetOne({ userId: row.userId });
      ruleForm.value = data;
    }
    type.value = ty;
    ty === "add" ? (title.value = "新增") : (title.value = "编辑");
    dialogVisible.value = true;
  }

  function handleClose() {
    dialogVisible.value = false;
  }

  async function handleDelete(row) {
    await userRemoveOne({ userId: row.userId });
    await onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const _obj = {
      ...form,
      beginTime: form.createTime[0],
      endTime: form.createTime[1]
    };
    delete _obj["createTime"];
    const data: userListPageVO = await userListPage(_obj);
    dataList.value = data.result;
    pagination.total = data.total;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  // 查询菜单树
  async function departmentTree() {
    const data: departmentListTreeVO[] = await departmentListTree();
    departmentList.value = data;
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  const handleCancle = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    dialogVisible.value = false;
    onSearch();
  };

  // 调用编辑 / 新增接口
  const update = async data => {
    loading.value = true;
    if (type.value === "add") {
      await userSaveOne(data);
    } else {
      await userUpdateOne(data);
    }
    setTimeout(() => {
      loading.value = false;
      dialogVisible.value = false;
      onSearch();
    }, 500);
  };

  const handleOk = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async valid => {
      if (valid) {
        await update(ruleForm.value);
        ruleForm.value = {};
      } else {
        return;
      }
    });
  };

  onMounted(() => {
    onSearch();
    departmentTree();
    getRoleList();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    buttonClass,
    dialogVisible,
    title,
    ruleForm,
    rules,
    type,
    departmentList,
    treeProps,
    roleList,
    onSearch,
    resetForm,
    handleUpdate,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    handleClose,
    handleOk,
    handleCancle
  };
}
