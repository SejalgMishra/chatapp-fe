export const TYPES = {
    MESSAGE : "MESSAGE",
    POST_MESSAGE : "POST_MESSAGE"

  };

  export const getMessage = (Data: any) => {
    return {
      type: "MESSAGE",
      payload: Data,
    };
  };

  export const postmsg = (Data : any) => {
    return {
        type: "POST_MESSAGE",
        payload: Data,
      };
  }