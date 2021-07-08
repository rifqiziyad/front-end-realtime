import axiosApiIntances from "../../utils/axios";

export const roomChat = (id, search) => {
  if (search === undefined) search = "";
  return {
    type: "ROOM_CHAT",
    payload: axiosApiIntances.get(`/room-chat/${id}?search=${search}`),
  };
};
