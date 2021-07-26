const initialState = {
  data: [], // kita gunakan untk menyimpan data user ketika berhasil ROOM_CHAT
  isLoading: false,
  isError: false,
  msg: "",
};

const roomChat = (state = initialState, action) => {
  switch (action.type) {
    case "ROOM_CHAT_PENDING": // pending = proses sedang dijalankan
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "ROOM_CHAT_FULFILLED": // fulfilld = prosos ketika berhasil
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "ROOM_CHAT_REJECTED": // rejected = proses ketika gagal
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default roomChat;
