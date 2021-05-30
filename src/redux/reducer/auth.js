const initialState = {
  data: {}, // kita gunakan untk menyimpan data user ketika berhasil login
  isLoading: false,
  isError: false,
  msg: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_PENDING": // pending = proses sedang dijalankan
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "LOGIN_FULFILLED": // fulfilld = prosos ketika berhasil
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
      };
    case "LOGIN_REJECTED": // rejected = proses ketika gagal
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    case "REGISTER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "REGISTER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

    case "REGISTER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default auth;
