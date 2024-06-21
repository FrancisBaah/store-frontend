import axios from "axios";

export const baseURL = "https://store-backend-r05l.onrender.com";

export const GetAPI = async (url) => {
  try {
    const res = await axios.get(`${baseURL}/${url}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const PostAPI = async (url, data, headers) => {
  try {
    const res = await axios.post(`${baseURL}/${url}`, data, { headers });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const PutAPI = async (url, data, headers) => {
  try {
    const res = await axios.put(`${baseURL}/${url}`, data, { headers });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const DeleteAPI = async (url) => {
  try {
    const res = await axios.delete(`${baseURL}/${url}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
