export const TYPES = {
  USER: "USER",
};

export const userDetails = (Data: any) => {
    return {
      type: "USER",
      payload: Data,
    };
  };