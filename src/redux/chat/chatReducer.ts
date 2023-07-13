import { TYPES } from "./chatAction";

const initialState: any = {
  message: [],
};

const msgReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TYPES.MESSAGE:
      return {
        data: action.payload,
      };
    case TYPES.POST_MESSAGE:
      console.log(state);

      return {
        data: [...state.data, action.payload],
      };
      console.log(state);
      

    default:
      return state;
  }
};

export default msgReducer;
