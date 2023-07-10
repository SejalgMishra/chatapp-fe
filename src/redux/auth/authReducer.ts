import { TYPES } from "./authAction";

interface AuthState {}

const initialState: AuthState = {
  userDetails: [],
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case TYPES.AUTH:
      return {
        token: action.payload,
      };
    case TYPES.DATA:
      return {
        data: action.payload,
      };
    
    default:
      return state;
  }
};

export default authReducer;
