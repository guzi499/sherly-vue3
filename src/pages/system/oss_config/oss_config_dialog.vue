<!--
 * @Author: lihaoyu
 * @Date: 2022-07-08 23:40:21
 * @LastEditTime: 2022-08-03 18:04:32
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/src/pages/system/oss_config/oss_config_dialog.vue
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
        :label-width="formLabelWidth"
        prop="type"
      >
        <el-select v-model="form.type" size="default" clearable>
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="form.type === 5"
        label="上传地址："
        :label-width="formLabelWidth"
        prop="config.endpoint"
      >
        <el-input v-model="form.config.endpoint" />
      </el-form-item>
      <el-form-item
        label="存储桶："
        :label-width="formLabelWidth"
        prop="config.bucket"
      >
        <el-input v-model="form.config.bucket" />
      </el-form-item>
      <el-form-item
        label="访问域名："
        :label-width="formLabelWidth"
        prop="config.domainName"
      >
        <el-input v-model="form.config.domainName" />
      </el-form-item>
      <block v-if="form.type === 5">
        <el-form-item
          label="访问Key："
          :label-width="formLabelWidth"
          prop="config.accessKey"
        >
          <el-input v-model="form.config.accessKey" />
        </el-form-item>
        <el-form-item
          label="访问Secret："
          :label-width="formLabelWidth"
          prop="config.accessSecret"
        >
          <el-input v-model="form.config.accessSecret" />
        </el-form-item>
        <el-form-item
          label="访问地区："
          :label-width="formLabelWidth"
          prop="config.region"
        >
          <el-input v-model="form.config.region" />
        </el-form-item>
      </block>
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
import { reactive, ref, watch } from "vue";
import { saveOssConfig, upDataOss } from "@/api/system/oss";
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
    const formLabelWidth = "110px";
    const typeOptions = [
      { label: "数据库", value: 1, disabled: true },
      { label: "本地存储", value: 2 },
      { label: "FTP", value: 3, disabled: true },
      { label: "SFTP", value: 4, disabled: true },
      { label: "S3", value: 5 },
    ];
    const formRef = ref(null);
    const rules = ref({});

    watch(
      form,
      (newVal) => {
        if (newVal.type !== 5) {
          rules.value = {
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
        } else if (newVal.type === 5) {
          rules.value = {
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
            "config.endpoint": [
              {
                required: true,
                message: "请输入上传地址",
                trigger: "blur",
              },
            ],
            "config.accessKey": [
              {
                required: true,
                message: "请输入访问Key",
                trigger: "blur",
              },
            ],
            "config.accessSecret": [
              {
                required: true,
                message: "请输入访问Secret",
                trigger: "blur",
              },
            ],
          };
        }
      },
      { immediate: true, deep: true }
    );
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
            delete form.config.endpoint;
            delete form.config.accessKey;
            delete form.config.accessSecret;
            delete form.config.region;
          } else if (form.type === 5) {
            form.config["@class"] =
              "com.guzi.upr.storage.client.s3.S3OssClientConfig";
          }
          if (isEdit.value) {
            upDataOss(form).then(() => {
              ElMessage({
                message: "修改成功！",
                type: "success",
              });
              context.emit("updata");
              dialogTableVisible.value = false;
            });
          } else {
            saveOssConfig(form).then(() => {
              ElMessage({
                message: "添加成功！",
                type: "success",
              });
              context.emit("updata");
              dialogTableVisible.value = false;
            });
          }
          resetForm();
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
