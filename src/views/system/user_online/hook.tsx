import dayjs from "dayjs";
import type { PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted } from "vue";
import { ElMessageBox } from "element-plus";
import { message } from "@/utils/message";
import { userOnlineListAll, userOnlineForceQuit } from "@/api/user_online";
import {
  UserOnlineListAllReqDTO,
  UserOnlineListAllRespDTO
} from "@/api/interface/user_online";

export function useUserOnline() {
  const form: UserOnlineListAllReqDTO = reactive({
    phone: ""
  });
  const pageData = reactive({
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
      label: "手机号",
      prop: "phone",
      minWidth: 100
    },
    {
      label: "姓名",
      prop: "realName",
      minWidth: 120
    },
    {
      label: "登录地址",
      prop: "address",
      minWidth: 120
    },
    {
      label: "浏览器",
      prop: "browser",
      minWidth: 120
    },
    {
      label: "设备",
      prop: "os",
      minWidth: 120
    },
    {
      label: "登录IP",
      prop: "ip",
      minWidth: 120
    },
    {
      label: "登录时间",
      minWidth: 180,
      prop: "loginTime",
      formatter: ({ loginTime }) =>
        dayjs(loginTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];

  function handleLogOut(row) {
    ElMessageBox.confirm("该操作不可撤回，是否要强制退出该账户?", "系统提示", {
      confirmButtonText: "是的，我确定",
      cancelButtonText: "我不想退了",
      type: "warning"
    })
      .then(async () => {
        await userOnlineForceQuit({ sessionId: row.sessionId });
        await onSearch();
      })
      .catch(() => {
        message("取消操作", { type: "info" });
      });
  }

  function handleSizeChange(val: number) {
    pageData.size = val;
    // onSearch();
  }

  function handleCurrentChange(val: number) {
    pageData.current = val;
    // onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const data: UserOnlineListAllRespDTO[] = await userOnlineListAll(form);
    dataList.value = data;
    pagination.total = data.length;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
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
    onSearch,
    resetForm,
    handleSizeChange,
    handleCurrentChange,
    handleLogOut
  };
}
