import dayjs from "dayjs";
import type { PaginationProps } from "@pureadmin/table";
import { reactive, ref, computed, onMounted } from "vue";
import type { FormRules, FormInstance } from "element-plus";
import {
  tenantListPage,
  tenantRemoveOne,
  tenantSaveOne,
  tenantUpdateOne
} from "@/api/tenant_list";
import {
  TenantListPageReqDTO,
  TenantListPageRespDTO,
  TenantSaveOneReqDTO
} from "@/api/interface/tenant_list";

export function useTenantList() {
  const form: TenantListPageReqDTO = reactive({
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
  // 开始时间
  const datetimerangeCreateTime = ref([]);
  // 过期时间
  const datetimerangeExpireTime = ref([]);
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
      label: "租户代码",
      prop: "tenantCode",
      minWidth: 100
    },
    {
      label: "租户名称",
      prop: "tenantName",
      minWidth: 120
    },
    {
      label: "联系人",
      prop: "contactUser",
      minWidth: 120
    },
    {
      label: "联系电话",
      prop: "contactPhone",
      minWidth: 120
    },
    {
      label: "过期时间",
      prop: "expireTime",
      minWidth: 150,
      formatter: ({ expireTime }) =>
        dayjs(expireTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "用户上限",
      prop: "userLimit",
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
      width: 240,
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
  const ruleForm = ref<TenantSaveOneReqDTO>({
    tenantName: "",
    tenantCode: "",
    expireTime: "",
    contactPhone: "",
    contactUser: "",
    userLimit: null
  });
  const rules = reactive<FormRules>({
    tenantName: [
      { required: true, message: "请输入租户名称", trigger: "blur" }
    ],
    tenantCode: [
      { required: true, message: "请输入租户代码", trigger: "blur" }
    ],
    expireTime: [
      { required: true, message: "请选择过期时间", trigger: "blur" }
    ],
    contactPhone: [
      { required: true, message: "请输入联系电话", trigger: "blur" }
    ],
    contactUser: [{ required: true, message: "请输入联系人", trigger: "blur" }],
    userLimit: [{ required: true, message: "请输入用户上限", trigger: "blur" }]
  });

  // 套餐选择
  function handleSelect(data) {
    type.value = "select";
    console.log(data);
  }

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
    await tenantRemoveOne({ tenantId: row.tenantId });
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
    const _obj = {
      ...form,
      beginTime: datetimerangeCreateTime.value[0],
      endTime: datetimerangeCreateTime.value[1],
      beginExpireTime: datetimerangeExpireTime.value[0],
      endExpireTime: datetimerangeExpireTime.value[1]
    };
    delete _obj["createTime"];
    const data: TenantListPageRespDTO = await tenantListPage(_obj);
    dataList.value = data.result;
    pagination.total = data.total;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    datetimerangeCreateTime.value = [];
    datetimerangeExpireTime.value = [];
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
      await tenantSaveOne(data);
    } else {
      await tenantUpdateOne(data);
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
    pagination,
    buttonClass,
    dialogVisible,
    title,
    ruleForm,
    rules,
    type,
    datetimerangeCreateTime,
    datetimerangeExpireTime,
    onSearch,
    resetForm,
    handleUpdate,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleClose,
    handleOk,
    handleCancel,
    handleSelect
  };
}
