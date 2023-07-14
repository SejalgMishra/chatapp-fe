import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import userReducer from "./user/userReducer";
import msgReducer from "./chat/chatReducer";
import groupReducer from "./group/groupReducer";

export const rootReducer = combineReducers({
    auth : authReducer,
    user : userReducer,
    msg : msgReducer,
    grp : groupReducer
  });

export type RootState = ReturnType<typeof rootReducer>;  


