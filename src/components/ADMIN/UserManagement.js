import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Drawer,
  Popconfirm,
  Select,
} from "antd";
import { IoReorderThreeOutline } from "react-icons/io5";
import { BiPencil, BiTrash, BiUser } from "react-icons/bi";
import { DeleteAPI, GetAPI, PostAPI, PutAPI } from "../Helper/constants";
import MenuItems from "./MenuItem";
import UpdateUser from "./UpdateUser";
import GetUserData from "../Helper/GetUserData";

const UserManagement = () => {
  const { user } = GetUserData();
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalOpenEdit, setisModalOpenEdit] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const showDrawer = () => {
    setOpen(true);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const EditUser = (record) => {
    setisModalOpenEdit(true);
    setRowData(record);
  };

  const handleAddUser = async () => {
    try {
      const url = "user";
      const data = {
        name,
        email,
        password,
        role,
      };
      await PostAPI(url, data);
      message.success("User added successfully");
      setIsModalVisible(false);
      fetchData(); // Fetch updated user list
    } catch (error) {
      message.error("Failed to add user");
    }
  };

  const deleteUser = async (record) => {
    const id = record._id;
    if (!id) {
      message.error("id needed");
    }
    try {
      const url = `user/${id}`;
      const res = await DeleteAPI(url);
      message.success(res.data.message);
      fetchData(); // Fetch updated user list
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const fetchData = async () => {
    try {
      const url = "user/all";
      const res = await GetAPI(url);
      setUsers(res.data);
    } catch (error) {
      message.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = () => {
    setOpen(false);
    setIsModalVisible(false);
    setisModalOpenEdit(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <span className="flex gap-2">
          <BiPencil
            className="h-6 w-6 cursor-pointer"
            onClick={() => EditUser(record)}
          />
          <Popconfirm
            title={`Delete ${record.name}`}
            description="Are you sure to delete this task?"
            onConfirm={() => deleteUser(record)}
            okText="Yes"
            cancelText="No"
          >
            <BiTrash className="h-6 w-6 cursor-pointer" />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Modal
        footer={false}
        open={isModalOpenEdit}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <UpdateUser
          record={rowData}
          fetchData={fetchData}
          handleCancel={handleCancel}
        />
      </Modal>
      <header className="flex justify-between items-center mb-4">
        <span className="flex gap-3">
          <IoReorderThreeOutline
            className="h-9 w-9 cursor-pointer"
            onClick={showDrawer}
          />

          <Drawer
            placement="left"
            title="Admin Management"
            onClose={handleCancel}
            open={open}
          >
            <MenuItems />
          </Drawer>
          <h1 className="text-xl">Admin User Management</h1>
        </span>
        <span className="flex items-center">
          <Button type="primary" onClick={showModal}>
            Add New User
          </Button>
          <BiUser className="w-6 h-6 ml-4" />
          <div className="flex flex-col items-center rounded-xl">
            <h1 className="text-[11px]">{user.name}</h1>
            <p className="text-[9px]">{user.role}</p>
          </div>
        </span>
      </header>
      <Table columns={columns} dataSource={users} rowKey="id" />

      <Modal
        title="Add New User"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddUser}>
            Add User
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddUser}
          initialValues={{
            name: "",
            email: "",
            password: "",
            role: "",
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter the name",
              },
            ]}
          >
            <Input onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter a password",
              },
            ]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[
              {
                required: true,
                message: "Please enter the role",
              },
            ]}
          >
            <Select
              value={role}
              onChange={(value) => setRole(value)}
              options={[
                { value: "admin", label: "admin" },
                { value: "user", label: "user" },
              ]}
              required
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
