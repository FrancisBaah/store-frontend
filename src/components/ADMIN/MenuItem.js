import React, { useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { BiSolidDashboard } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaUsers } from "react-icons/fa";
import GetUserData from "../Helper/GetUserData";

const MenuItems = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const currentKey = pathname.pop();
  const router = useNavigate();

  const [currentPage, setCurrentPage] = useState(currentKey);
  const { user } = GetUserData();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const getCurrentKey = ({ key }) => {
    setCurrentPage(key);
  };

  const items = [
    getItem(
      <Link to="/listing">Product Management</Link>,
      "listing",
      <BiSolidDashboard />
    ),
    getItem(<Link to={"/users"}>User Management</Link>, "users", <FiUsers />),
    getItem(<Link to={"/users"}>Role Management</Link>, "roles", <FaUsers />),
  ];
  return (
    <div className="h-full flex flex-col justify-between p-3">
      <div>
        <Menu
          className="w-full overflow-auto"
          onClick={getCurrentKey}
          defaultSelectedKeys={[currentPage]}
          defaultOpenKeys={[currentPage]}
          items={items}
        />
      </div>
      <div className="border border-black mt-2 p-1 rounded-lg">
        <div className="w-full flex flex-row items-center justify-evenly border-black border rounded-md">
          <div className="admin-profile">
            <FaUser />
          </div>
          <span className="">
            <h1 className="title">{user.name}</h1>
            <label className="text-center">{user.role}</label>
          </span>
        </div>
        <div
          onClick={() => router("/")}
          className="logout text-center p-2 cursor-pointer"
        >
          Log out <LogoutOutlined className="mt-1" />
        </div>
      </div>
    </div>
  );
};

export default MenuItems;
