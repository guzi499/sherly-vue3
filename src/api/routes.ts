import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: Array<any>;
};

export const genericBasicData = () => {
  return http.request<Result>("get", "/getAsyncRoutes");
};
