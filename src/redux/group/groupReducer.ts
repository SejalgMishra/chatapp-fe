import { TYPES } from "./groupAction";

const initialState: any = {
    gruops: [],
    grpMessage: [],
};

const groupReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TYPES.GROUP:
      return {
        data: action.payload,
      };
    // case TYPES.POST_MESSAGE:
    //   console.log(state);

    //   return {
    //     data: [...state.data, action.payload],
    //   };
    //   console.log(state);
      

    default:
      return state;
  }
};

export default groupReducer;
