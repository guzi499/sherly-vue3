import dayjs from "dayjs";
import type {PaginationProps} from "@pureadmin/table";
import {reactive, ref, onMounted} from "vue";
import {ElMessageBox} from 'element-plus'
import {message} from "@/utils/message";
import {loginLogListPage, loginLogRemoveAll} from "@/api/login_log";
import {loginLogListPageDTO, loginLogListPageVO} from "@/api/interface/login_log";

export function useLoginLog() {
  const datetimeRange = ref(['', ''],)
  const form: loginLogListPageDTO = reactive({
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
      label: "登录账号",
      prop: "username",
      minWidth: 120
    },
    {
      label: "登录方式",
      prop: "type",
      minWidth: 120
    },
    {
      label: "浏览器",
      prop: "browser",
      minWidth: 120
    },
    {
      label: "登录设备",
      prop: "os",
      minWidth: 120
    },
    {
      label: "登录ip",
      prop: "ip",
      minWidth: 120
    },
    {
      label: "登录地址",
      prop: "address",
      minWidth: 120
    },
    {
      label: "登录结果",
      prop: "result",
      minWidth: 120
    },
    {
      label: "登录时间",
      minWidth: 180,
      prop: "createTime",
      formatter: ({createTime}) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    }
  ];
  // 登录方式枚举
  const loginType = reactive([
    {
      value: 'PASSWORD',
      label: '密码'
    }
  ])

  // 登录结果枚举
  const loginResults = reactive([
    {
      value: 'SUCCESS',
      label: '成功'
    },{
      value: 'DISABLE',
      label: '用户禁用'
    },{
      value: 'CHECK_FAIL',
      label: '其他'
    }
  ])

  function handleRemove() {
    ElMessageBox.confirm(
      '该操作不可撤回，确认清除全部登录日志吗?',
      '提示',
      {
        confirmButtonText: '是的，我确定',
        cancelButtonText: '我不想删了',
        type: 'warning',
      }
    )
      .then(async () => {
        await loginLogRemoveAll();
        await onSearch();
      })
      .catch(() => {
        message('取消操作', {type: "info"})
      })
  }

  function handleSizeChange(val: number) {
    form.size = val
    onSearch()
  }

  function handleCurrentChange(val: number) {
    form.current = val
    onSearch()
  }

  async function onSearch() {
    loading.value = true;
    let _obj = {
      ...form,
      beginTime: datetimeRange.value[0],
      endTime: datetimeRange.value[1],
    }
    const data: loginLogListPageVO = await loginLogListPage(_obj);
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
    onSearch();
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
    loginType,
    loginResults,
    datetimeRange,
    onSearch,
    resetForm,
    handleRemove,
    handleSizeChange,
    handleCurrentChange,
  };
}
