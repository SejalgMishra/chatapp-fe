export const TYPES = {
  AUTH: "AUTH",
  DATA: "DATA",
  USER: "USER",
  USER_ADDRESS: "USER_ADDRESS",
  LOGOUT: "LOGOUT",
};

export const login = (Data: any) => {
  return {
    type: "DATA",
    payload: Data,
  };
};

export const register = (Data: any) => {
  return {
    type: "DATA",
    payload: Data,
  };
};


