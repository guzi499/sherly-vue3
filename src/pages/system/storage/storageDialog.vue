<!--
 * @Author: lihaoyu
 * @Date: 2022-07-08 23:40:21
 * @LastEditTime: 2022-07-09 23:39:42
 * @LastEditors: lihaoyu
 * @Description: 
 * @FilePath: /sherly-vue3/src/pages/system/storage/storageDialog.vue
-->
<template>
  <el-dialog
    v-if="dialogTableVisible"
    v-model="dialogTableVisible"
    width="500px"
    :title="isEdit ? '配置编辑' : '配置添加'"
    :before-close="handleCancel"
  >
    <el-form
      :model="form"
      ref="formRef"
      style="padding-right: 60px"
      :rules="rules"
    >
      <el-form-item
        label="配置名称："
        required
        :label-width="formLabelWidth"
        prop="configName"
      >
        <el-input v-model="form.configName" />
      </el-form-item>
      <el-form-item
        label="描述："
        :label-width="formLabelWidth"
        prop="description"
      >
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item
        label="存储方式："
        required
        :label-width="formLabelWidth"
        prop="type"
      >
        <el-select v-model="form.type" size="default">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="存储桶："
        required
        :label-width="formLabelWidth"
        prop="config.bucket"
      >
        <el-input v-model="form.config.bucket" />
      </el-form-item>
      <el-form-item
        label="访问域名："
        required
        :label-width="formLabelWidth"
        prop="config.domainName"
      >
        <el-input v-model="form.config.domainName" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref } from "vue";
import { saveStorage } from "@/api/system/storage";
import { ElMessage } from "element-plus";

export default {
  emits: ["updata"],
  setup(props, context) {
    let dialogTableVisible = ref(false);
    let isEdit = ref(false);
    const initForm = () => {
      return {
        configName: "",
        description: "",
        type: "",
        config: {},
      };
    };
    let form = reactive(initForm());
    const resetForm = () => {
      Object.assign(form, initForm());
    };
    const formLabelWidth = "100px";
    const typeOptions = [
      { label: "数据库", value: 1 },
      { label: "本地存储", value: 2 },
      { label: "FTP", value: 3 },
      { label: "SFTP", value: 4 },
      { label: "S3", value: 5 },
    ];
    const formRef = ref(null);
    const rules = {
      configName: [
        {
          required: true,
          message: "请输入配置名称",
          trigger: "blur",
        },
      ],
      type: [
        {
          required: true,
          message: "请选择存储类型",
          trigger: "blur",
        },
      ],
      "config.bucket": [
        {
          required: true,
          message: "请输入存储桶",
          trigger: "blur",
        },
      ],
      "config.domainName": [
        {
          required: true,
          message: "请输入访问域名",
          trigger: "blur",
        },
      ],
    };
    const handleCancel = () => {
      dialogTableVisible.value = false;
      resetForm();
    };
    const handleConfirm = async () => {
      if (!formRef.value) return;
      await formRef.value.validate((valid) => {
        if (valid) {
          if (form.type === 2) {
            form.config["@class"] =
              "com.guzi.upr.storage.client.local.LocalOssClientConfig";
          }
          saveStorage(form).then(() => {
            ElMessage({
              message: "添加成功！",
              type: "success",
            });
            context.emit("updata");
            dialogTableVisible.value = false;
            resetForm();
          });
        }
      });
    };
    return {
      form,
      isEdit,
      formRef,
      rules,
      dialogTableVisible,
      formLabelWidth,
      typeOptions,
      handleCancel,
      handleConfirm,
    };
  },
};
</script>
