import React, { useContext, useEffect, useState } from "react";
import { Input, Modal, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { GetAPI, baseURL } from "../Helper/constants";
import GetUserData from "../Helper/GetUserData";
import { BiUser } from "react-icons/bi";
import EditUser from "./EditUser";

const Shopping = () => {
  const { user, fetchData } = GetUserData();
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpenEdit, setisModalOpenEdit] = useState(false);
  const handleCancel = () => {
    setisModalOpenEdit(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "products";
        const res = await GetAPI(url);
        setProducts(res.data);
      } catch (error) {
        message.error("Failed to fetch products");
      }
    };

    fetchData();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    message.success(`${product?.name} added to cart`);
  };

  const filteredProducts = products?.filter((product) =>
    product?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full">
      <header className="flex flex-wrap w-full min-h-16 bg-yellow-400 items-center justify-between px-4 md:px-10">
        <h1 className="text-lg md:text-xl">Shopping</h1>
        <Input
          prefix={<SearchOutlined />}
          className="w-full md:w-[60%] my-2 md:my-0"
          placeholder="What are you looking for?"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center">
          <BiUser
            onClick={() => setisModalOpenEdit(true)}
            className="w-6 h-6 ml-4 cursor-pointer"
          />
          <span className="flex flex-col items-end">
            <h1 className="text-base md:text-lg">{user.name}</h1>
            <p className="text-sm md:text-base">{user.role}</p>
          </span>
          <Modal
            footer={false}
            open={isModalOpenEdit}
            onOk={handleCancel}
            onCancel={handleCancel}
          >
            <EditUser
              record={user}
              fetchData={fetchData}
              handleCancel={handleCancel}
            />
          </Modal>
        </div>
        <Link to="/checkout" className="text-base md:text-lg">
          Cart: {cart.length}
        </Link>
      </header>
      <main className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product?._id}
              className="border p-4 flex flex-col justify-between"
            >
              <img
                src={`${product?.image}`}
                alt={product?.name}
                className="w-full h-40 object-cover mb-4"
              />
              <h2 className="text-lg mb-2">{product?.name}</h2>
              <p className="mb-2">${product?.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Shopping;
