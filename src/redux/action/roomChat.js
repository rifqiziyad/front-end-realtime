import axiosApiIntances from "../../utils/axios";

export const roomChat = (id) => {
  return {
    type: "ROOM_CHAT",
    payload: axiosApiIntances.get(`/room-chat/${id}`),
  };
};
