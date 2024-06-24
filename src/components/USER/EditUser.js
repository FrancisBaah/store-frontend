import React, { useEffect, useState } from "react";
import { PutAPI } from "../Helper/constants";
import { message } from "antd";

const EditUser = ({ record, fetchData, handleCancel }) => {
  const [formData, setFormData] = useState({});

  const { name, email } = formData;

  useEffect(() => {
    record &&
      setFormData({
        name: record.name,
        email: record.email,
        role: record.role,
      });
  }, [record]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleEditUser = async () => {
    try {
      const url = `user/${record._id}`;
      const data = {
        name,
        email,
      };
      const res = await PutAPI(url, data);
      message.success(res.data.message);
      handleCancel();
      fetchData(); // Fetch updated user list
    } catch (error) {
      message.error("Failed to add user");
    }
  };
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h1 className="title">Update User</h1>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        className="input-field"
        required
      />
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleInputChange}
        className="input-field"
        required
      />

      <button onClick={handleEditUser} className="btn">
        Update
      </button>
    </div>
  );
};

export default EditUser;
