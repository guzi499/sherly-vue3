import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import { isEmpty } from "@/globalType";
import {
  EmailGetOneVO,
  EmailSaveOrUpdateDTO,
  EmailSendDTO
} from "@/api/interface/email";

/** 邮件配置详情 */
export const emailGetOne = (params?: isEmpty) => {
  return http.request<EmailGetOneVO>("get", baseUrlApi("/email/get_one"), {
    params
  });
};

/** 邮件配置保存或修改 */
export const emailSaveOrUpdate = (data?: EmailSaveOrUpdateDTO) => {
  return http.request<isEmpty>("post", baseUrlApi("/email/save_or_update"), {
    data
  });
};

/** 邮件发送 */
export const emailSend = (data?: EmailSendDTO) => {
  return http.request<isEmpty>("post", baseUrlApi("/email/send"), {
    data
  });
};
