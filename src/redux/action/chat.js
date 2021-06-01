import axiosApiIntances from "../../utils/axios";

export const chat = (params) => {
  return {
    type: "CHAT",
    payload: axiosApiIntances.get(`/chat?roomChat=${params}`),
  };
};
