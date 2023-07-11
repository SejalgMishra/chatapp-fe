import { TYPES } from "./userAction";

interface AuthState {
  [x: string]: any;
}

const initialState: AuthState = {
  serchUserDetails: [],
  recentUser : []
};

const userReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case TYPES.USER:
      return {
        serchUserDetails : action.payload,
      };
      case TYPES.RECENT_USERS:
      return {
        recentUser : [...state.recentUser , action.payload]
      };
    
    default:
      return state;
  }
};

export default userReducer;
