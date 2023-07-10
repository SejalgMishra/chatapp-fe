import { TYPES } from "./userAction";

interface AuthState {}

const initialState: AuthState = {
  serchUserDetails: [],
};

const userReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case TYPES.USER:
      return {
        data: action.payload,
      };
    
    default:
      return state;
  }
};

export default userReducer;
