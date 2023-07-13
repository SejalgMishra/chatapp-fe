import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import userReducer from "./user/userReducer";
import msgReducer from "./chat/chatReducer";

export const rootReducer = combineReducers({
    auth : authReducer,
    user : userReducer,
    msg : msgReducer
  });

export type RootState = ReturnType<typeof rootReducer>;  


