import dayjs from "dayjs";
import { reactive, ref, computed, onMounted } from "vue";
import type { FormRules, FormInstance } from "element-plus";
import {
  departmentListTree,
  departmentRemoveOne,
  departmentSaveOne,
  departmentUpdateOne
} from "@/api/department";
import {
  departmentListTreeVO,
  departmentUpdateOneDTO
} from "@/api/interface/department";

export function useDepartment() {
  const form = reactive({
    departmentName: ""
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
      label: "部门名称",
      prop: "departmentName",
      minWidth: 100
    },
    {
      label: "描述",
      prop: "description",
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
  const ruleForm = ref<departmentUpdateOneDTO>({
    departmentId: null,
    departmentName: "",
    description: "",
    parentId: null,
    sort: null
  });
  const rules = reactive<FormRules>({
    parentId: [{ required: true, message: "请选择父级部门", trigger: "blur" }],
    departmentName: [
      { required: true, message: "请输入部门名称", trigger: "blur" }
    ],
    sort: [{ required: true, message: "请输入排序", trigger: "blur" }]
  });
  const departmentList = ref({
    children: [] as Array<departmentListTreeVO>,
    departmentId: 0,
    departmentName: "主目录",
    parentId: null
  });
  const treeProps = {
    children: "children",
    label: "departmentName"
  };

  // 新增 / 编辑
  async function handleUpdate(ty, row) {
    ruleForm.value = {};
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
    await departmentRemoveOne({ departmentId: row.departmentId });
    await onSearch();
  }

  async function onSearch() {
    loading.value = true;
    if (!form.departmentName) {
      const data: departmentListTreeVO[] = await departmentListTree();
      dataList.value = data;
      departmentList.value.children = data;
    } else {
      dataList.value = handleTree(dataList.value, form.departmentName);
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
        // 判断该层级是否包含当前部门 若不包含则判断是否有children，有则继续调用
        if (item.departmentName.indexOf(value) === -1) {
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
      await departmentSaveOne(data);
    } else {
      await departmentUpdateOne(data);
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
    departmentList,
    onSearch,
    resetForm,
    handleUpdate,
    handleDelete,
    handleClose,
    handleOk,
    handleCancle
  };
}
