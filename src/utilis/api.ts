import axiosInstance from './axiosInstance';

export const getDataAPI = async (url : string, token : string) => {
    const res = await axiosInstance.get(`/${url}`, {
        headers: { Authorization: token}
    })
    return res;
}

export const postDataAPI = async (url : string, post : any, token : string) => {
    const res = await axiosInstance.post(`/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const postData = async (url : string, post : any, token : string) => {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(post),
    });
  };
  

export const putDataAPI = async (url : string, post : any, token : string) => {
    const res = await axiosInstance.put(`/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const patchDataAPI = async (url : string, post : any, token : string) => {
    const res = await axiosInstance.patch(`/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const deleteDataAPI = async (url : string, token : string) => {
    const res = await axiosInstance.delete(`/${url}`, {
        headers: { Authorization: token}
    })
    return res;
}