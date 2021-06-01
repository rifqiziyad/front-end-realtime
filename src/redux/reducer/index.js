import { combineReducers } from "redux";

// import counter from "./counter";
import auth from "./auth";
import roomChat from "./roomChat";
import chat from "./chat";

export default combineReducers({
  // counter,
  auth,
  roomChat,
  chat,
});
