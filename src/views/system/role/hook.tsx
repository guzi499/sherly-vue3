import dayjs from "dayjs";
import {roleGetOne, roleListPage, roleRemoveOne, roleSaveOne, roleUpdateOne} from "@/api/role";
import {PageResult, RolePageDTO, RoleSaveOneDTO, RoleUpdateOneDTO} from "@/api/interface/role"
import type {PaginationProps} from "@pureadmin/table";
import {reactive, ref, computed, onMounted} from "vue";
import type {FormRules, FormInstance} from 'element-plus'
import {menuListTree} from "@/api/menu";
import {menuListTreeVO} from "@/api/interface/menu";
import {list} from "postcss";

export function useRole() {
  const form: RolePageDTO = reactive({
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
      hide: ({checkList}) => !checkList.includes("勾选列")
    },
    {
      label: "序号",
      type: "index",
      width: 70,
      hide: ({checkList}) => !checkList.includes("序号列")
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
      formatter: ({createTime}) =>
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
  const title = ref('编辑' as string);
  const type = ref<string>('')
  const ruleForm = ref<RoleUpdateOneDTO>({
    roleId: null,
    roleName: '',
    menuIds: [],
    description: ''
  })
  const rules = reactive<FormRules>({
    roleName: [
      {required: true, message: '请输入角色名称', trigger: 'blur'},
      {min: 1, max: 20, message: '最大输入20个字符', trigger: 'blur'},
    ],
  })
  const menuList = ref<menuListTreeVO[]>([])
  const treeProps = {
    children: 'children',
    label: 'menuName'
  }

  // 新增 / 编辑
  async function handleUpdate(ty, row) {
    ruleForm.value = {}
    if(ty !== 'add') {
      const data = await roleGetOne({'roleId': row.roleId})
      ruleForm.value = data
    }
    type.value = ty
    ty === 'add' ? title.value = '新增' : title.value = '编辑'
    dialogVisible.value = true
  }

  function handleClose() {
    dialogVisible.value = false
  }

  async function handleDelete(row) {
    await roleRemoveOne({'roleId': row.roleId})
    await onSearch()
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
    const data: PageResult = await roleListPage(form);
    dataList.value = data.result;
    pagination.total = data.total;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  // 查询菜单树
  async function menuTree() {
    const data: menuListTreeVO[] = await menuListTree();
    menuList.value = data;
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  const handleCancle = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    dialogVisible.value = false
    onSearch();
  };

  // 调用编辑 / 新增接口
  const update = async (data) => {
    loading.value = true;
    if (type.value === 'add') {
      const _obj: RoleSaveOneDTO = {
        roleName: data.roleName,
        description: data.description
      }
      await roleSaveOne(_obj)
    } else {
      await roleUpdateOne(data)
    }
    setTimeout(() => {
      loading.value = false;
      dialogVisible.value = false
      onSearch()
    }, 500);
  }

  const handleOk = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        await update(ruleForm.value)
        ruleForm.value = {}
      } else {
        return
      }
    })
  }

  onMounted(() => {
    onSearch();
    menuTree()
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
    handleSelectionChange,
    handleClose,
    handleOk,
    handleCancle
  };
}
