import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { GetAPI, PostAPI, baseURL } from "../Helper/constants";

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const fetchData = async () => {
    try {
      const url = "products";
      const res = await GetAPI(url);
      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      message.error("Failed to fetch products");
    }
  };
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      if (values.image && values.image[0]) {
        formData.append("image", values.image[0].originFileObj);
      }

      const headers = { "Content-Type": "multipart/form-data" };
      const url = "products";
      const res = await PostAPI(url, formData, headers);

      setProducts((prevProducts) => [...prevProducts, res.data]);
      form.resetFields();
      setIsModalVisible(false);
      fetchData();
      message.success("Product added successfully");
    } catch (error) {
      message.error("Failed to add product");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img
          src={`${baseURL}/${record?.image}`}
          alt={record?.name}
          className="w-10 h-10 object-cover mb-4"
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl">Admin Product Listing</h1>
        <Button type="primary" onClick={showModal}>
          Add New Product
        </Button>
      </header>
      <Table columns={columns} dataSource={products} rowKey="name" />

      <Modal
        title="Add New Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="productForm">
          <Form.Item
            name="name"
            label="Product Name"
            rules={[
              { required: true, message: "Please input the product name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please input the product price!" },
            ]}
          >
            <Input type="number" min="0" step="0.01" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              { required: true, message: "Please upload the product image!" },
            ]}
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the product description!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProductPage;
