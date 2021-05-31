import { combineReducers } from "redux";

// import counter from "./counter";
import auth from "./auth";
import roomChat from "./roomChat";

export default combineReducers({
  // counter,
  auth,
  roomChat,
});
