export const TYPES = {
    GROUP : "GROUP",
    POST_GROUP_MESSAGE : "POST_GROUP_MESSAGE",
    GET_GROUP_MESSAGE : "GET_GROUP_MESSAGE"
  };

  export const getGroup = (Data: any) => {
    return {
      type: "GROUP",
      payload: Data,
    };
  };

  export const postmsg = (Data : any) => {
    return {
        type: "POST_MESSAGE",
        payload: Data,
      };
  }