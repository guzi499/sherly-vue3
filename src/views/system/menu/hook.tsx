import dayjs from "dayjs";
import { reactive, ref, computed, onMounted } from "vue";
import type { FormRules, FormInstance } from "element-plus";
import {
  menuListTree,
  menuRemoveOne,
  menuSaveOne,
  menuUpdateOne
} from "@/api/menu";
import { MenuListTreeVO, MenuUpdateOneDTO } from "@/api/interface/menu";

export function useMenu() {
  const form = reactive({
    menuName: ""
  });
  const dataList = ref([]);
  const loading = ref(true);
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
      label: "菜单名称",
      prop: "menuName",
      minWidth: 200,
      align: "left"
    },
    {
      label: "菜单路径",
      prop: "path",
      minWidth: 100
    },
    {
      label: "图标",
      prop: "icon",
      minWidth: 120
    },
    {
      label: "权限",
      prop: "permission",
      minWidth: 120
    },
    {
      label: "排序",
      prop: "sort",
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
  // 菜单类型枚举
  const EXmenuType = [
    {
      label: "目录",
      value: "DIR"
    },
    {
      label: "菜单",
      value: "MENU"
    },
    {
      label: "按钮",
      value: "BUTTON"
    }
  ];
  const ruleForm = ref<MenuUpdateOneDTO>({
    icon: "",
    menuId: null,
    menuName: "",
    menuType: "",
    parentId: null,
    path: "",
    permission: "",
    sort: null
  });
  const rules = reactive<FormRules>({
    menuType: [
      {
        required: true,
        message: "请选择菜单类型",
        trigger: "blur"
      }
    ],
    menuName: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
    path: [{ required: true, message: "请输入菜单路径", trigger: "blur" }],
    icon: [{ required: true, message: "请选择图标", trigger: "blur" }],
    sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
    parentId: [{ required: true, message: "请选择父级菜单", trigger: "blur" }]
  });
  const menuList = ref({
    children: [] as Array<MenuListTreeVO>,
    menuId: 0,
    menuName: "主菜单",
    parentId: null
  });
  const treeProps = {
    children: "children",
    label: "menuName"
  };

  // 新增 / 编辑
  async function handleUpdate(ty, row) {
    ruleForm.value = {};
    ruleForm.value.menuType = "DIR";
    if (ty !== "add") {
      ruleForm.value = row;
    }
    type.value = ty;
    ty === "add" ? (title.value = "新增") : (title.value = "编辑");
    dialogVisible.value = true;
  }

  function handleClose() {
    dialogVisible.value = false;
  }

  async function handleDelete(row) {
    await menuRemoveOne({ menuId: row.menuId });
    await onSearch();
  }

  async function onSearch() {
    loading.value = true;
    if (!form.menuName) {
      const data: MenuListTreeVO[] = await menuListTree();
      dataList.value = data;
      menuList.value.children = data;
    } else {
      dataList.value = handleTree(dataList.value, form.menuName);
    }
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  // 自定义查询
  const handleTree = (list, value) => {
    const arr = [];
    const handleTreeInner = (lis, val) => {
      lis.forEach(item => {
        // 判断该层级是否包含当前菜单 若不包含则判断是否有children，有则继续调用
        if (item.menuName.indexOf(value) === -1) {
          if (item.children.length !== 0) {
            handleTreeInner(item.children, val);
          }
        } else {
          arr.push(item);
        }
      });
    };
    handleTreeInner(list, value);
    return arr;
  };

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  const handleCancel = formEl => {
    resetForm(formEl);
    dialogVisible.value = false;
  };

  // 调用编辑 / 新增接口
  const update = async data => {
    loading.value = true;
    if (type.value === "add") {
      await menuSaveOne(data);
    } else {
      await menuUpdateOne(data);
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
  });

  return {
    form,
    loading,
    columns,
    dataList,
    buttonClass,
    dialogVisible,
    title,
    ruleForm,
    rules,
    type,
    treeProps,
    menuList,
    EXmenuType,
    onSearch,
    resetForm,
    handleUpdate,
    handleDelete,
    handleClose,
    handleOk,
    handleCancel
  };
}
