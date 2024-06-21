import React, { useEffect, useState } from "react";
import { GetAPI } from "./constants";
import { message } from "antd";

const GetUserData = () => {
  const [user, setUser] = useState([]);
  const fetchData = async () => {
    try {
      const url = "user";
      const res = await GetAPI(url);
      setUser(res.data);
    } catch (error) {
      message.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return { user, fetchData };
};

export default GetUserData;
