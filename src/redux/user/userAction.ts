export const TYPES = {
  USER: "USER",
  RECENT_USERS:"RECENT_USERS"
};

export const userDetails = (Data: any) => {
    return {
      type: "USER",
      payload: Data,
    };
  };

  export const recentUser = (Data: any) => {
    return {
      type: "RECENT_USERS",
      payload: Data,
    };
  };