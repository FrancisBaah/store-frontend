import axios from "axios";

export const baseURL = "https://store-backend-r05l.onrender.com";

axios.defaults.withCredentials = true;

export const GetAPI = async (url, navigate) => {
  try {
    const res = await axios.get(`${baseURL}/${url}`);
    return res;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 401) {
      navigate("/");
    } else {
      console.error("Error fetching data", error);
    }
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
