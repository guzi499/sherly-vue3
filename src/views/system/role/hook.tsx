import dayjs from "dayjs";
import {
  roleGetOne,
  roleListPage,
  roleRemoveOne,
  roleSaveOne,
  roleUpdateOne
} from "@/api/role";
import {
  PageResult,
  RolePageReqDTO,
  RoleSaveOneReqDTO,
  RoleUpdateOneReqDTO
} from "@/api/interface/role";
import type { PaginationProps } from "@pureadmin/table";
import { reactive, ref, computed, onMounted } from "vue";
import type { FormRules, FormInstance } from "element-plus";
import { menuListTree } from "@/api/menu";
import { MenuListTreeRespDTO } from "@/api/interface/menu";

export function useRole() {
  const form: RolePageReqDTO = reactive({
    roleName: "",
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
      label: "角色编号",
      prop: "roleId",
      minWidth: 100
    },
    {
      label: "角色名称",
      prop: "roleName",
      minWidth: 120
    },
    {
      label: "描述",
      prop: "description",
      minWidth: 120
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
  const ruleForm = ref<RoleUpdateOneReqDTO>({
    roleId: null,
    roleName: "",
    menuIds: [],
    description: ""
  });
  const rules = reactive<FormRules>({
    roleName: [
      { required: true, message: "请输入角色名称", trigger: "blur" },
      { min: 1, max: 20, message: "最大输入20个字符", trigger: "blur" }
    ]
  });
  const menuList = ref<MenuListTreeRespDTO[]>([]);
  const treeProps = {
    children: "children",
    label: "menuName"
  };

  // 新增 / 编辑
  async function handleUpdate(ty, row) {
    ruleForm.value = {};
    if (ty !== "add") {
      const data = await roleGetOne({ roleId: row.roleId });
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
    await roleRemoveOne({ roleId: row.roleId });
    await onSearch();
  }

  function handleSizeChange(val: number) {
    form.size = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    form.current = val;
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const data: PageResult = await roleListPage(form);
    dataList.value = data.result;
    pagination.total = data.total;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  // 查询菜单树
  async function menuTree() {
    const data: MenuListTreeRespDTO[] = await menuListTree();
    menuList.value = data;
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  const handleCancel = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    dialogVisible.value = false;
    onSearch();
  };

  // 调用编辑 / 新增接口
  const update = async data => {
    loading.value = true;
    if (type.value === "add") {
      const _obj: RoleSaveOneReqDTO = {
        roleName: data.roleName,
        description: data.description
      };
      await roleSaveOne(_obj);
    } else {
      await roleUpdateOne(data);
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
    menuTree();
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
    menuList,
    treeProps,
    onSearch,
    resetForm,
    handleUpdate,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleClose,
    handleOk,
    handleCancel
  };
}
