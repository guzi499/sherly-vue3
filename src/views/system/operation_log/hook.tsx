import dayjs from "dayjs";
import type {PaginationProps} from "@pureadmin/table";
import {reactive, ref, computed, onMounted} from "vue";
import {ElMessageBox} from 'element-plus'
import {operationLogListPage, operationLogRemoveAll} from "@/api/operation_log";
import {operationLogGetOneVO, operationLogListPageDTO, operationLogListPageVO} from "@/api/interface/operation_log";
import {message} from "@/utils/message";

export function useOperationLog() {
  const datetimeRange = ref(['', ''],)
  const form: operationLogListPageDTO = reactive({
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
      label: "日志id",
      prop: "logId",
      minWidth: 100
    },
    {
      label: "操作用户",
      prop: "operateUser",
      minWidth: 120
    },
    {
      label: "描述",
      prop: "description",
      minWidth: 120
    },
    {
      label: "请求方式",
      prop: "requestMethod",
      minWidth: 120
    },
    {
      label: "请求uri",
      prop: "uri",
      minWidth: 120
    },
    {
      label: "请求设备",
      prop: "os",
      minWidth: 120
    },
    {
      label: "请求地址",
      prop: "address",
      minWidth: 120
    },
    {
      label: "请求浏览器",
      prop: "browser",
      minWidth: 120
    },
    {
      label: "耗时(ms)",
      prop: "duration",
      minWidth: 120
    },
    {
      label: "操作时间",
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
  // 请求方式枚举
  const requestType = reactive([
    {
      value: '0',
      label: 'GET'
    }, {
      value: '1',
      label: 'POST'
    }, {
      value: '2',
      label: 'PUT'
    }, {
      value: '3',
      label: 'DELETE'
    }
  ])

  const dialogVisible = ref(false as boolean);
  const title = ref("详情" as string);
  const type = ref<string>("");
  const ruleForm = ref<operationLogGetOneVO>({
    // ....
  });

  function handleRemove() {
    ElMessageBox.confirm(
      '该操作不可撤回，确认清除全部操作日志吗?',
      '提示',
      {
        confirmButtonText: '是的，我确定',
        cancelButtonText: '我不想删了',
        type: 'warning',
      }
    )
      .then(async () => {
        await operationLogRemoveAll();
        await onSearch();
      })
      .catch(() => {
        message('取消操作', {type: "info"})
      })
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
    let _obj = {
      ...form,
      beginTime: datetimeRange.value[0],
      endTime: datetimeRange.value[1],
    }
    const data: operationLogListPageVO = await operationLogListPage(_obj);
    dataList.value = data.result;
    pagination.total = data.total;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    datetimeRange.value = []
    form.beginDuration = null
    form.endDuration = null
    onSearch();
  };

  const handleDetail = (data) => {
    dialogVisible.value = true
  };

  const handleClose = () => {
    dialogVisible.value = false;
  };

  const handleOk = () => {
    dialogVisible.value = false
  };

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    dataList,
    loading,
    columns,
    pagination,
    buttonClass,
    dialogVisible,
    title,
    ruleForm,
    type,
    requestType,
    datetimeRange,
    onSearch,
    resetForm,
    handleRemove,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    handleOk,
    handleClose,
    handleDetail
  };
}
