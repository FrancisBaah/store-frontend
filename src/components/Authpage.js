import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PostAPI } from "./Helper/constants";
import { useNavigate } from "react-router-dom";
import { Select, message } from "antd";

function AuthPage() {
  const navigate = useNavigate();
  const [signUpOrIn, setSignupOrIn] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const { name, password, email, confirmPassword, role } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Register
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      message.error("password and confirm password are not equal");
    }
    const headers = "'Content-Type': 'application/json'";
    const data = {
      name: name,
      email: email,
      password: password,
      role: role,
    };
    try {
      const url = "user";
      const res = await PostAPI(url, data, headers);
      console.log(res);
      if (res.data.role === "admin") {
        navigate("/listing");
      } else {
        navigate("/Shopping");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = "'Content-Type': 'application/json'";
    const data = { email, password };
    try {
      const url = "user/login";
      const res = await PostAPI(url, data, headers);
      if (res.data.role === "admin") {
        navigate("/listing");
      } else {
        navigate("/Shopping");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
      <div className="h-[80%] z-10 w-[80%] flex bg-white shadow-lg relative">
        <span className="w-full relative">
          <h1 className="spin absolute left-2 top-2">shop</h1>
          <img
            src="/store.png"
            className="w-full bg-green-800 h-full object-cover"
            alt="Background"
          />
        </span>
        <span className="w-full px-10 md:px-20 py-5 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {signUpOrIn === "register" ? (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                onSubmit={handleSubmitRegister}
                className="flex flex-col"
              >
                <h1 className="title">Register Here</h1>
                <label>Role</label>
                <Select
                  value={role}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, role: value }))
                  }
                  options={[
                    { value: "admin", label: "admin" },
                    { value: "user", label: "user" },
                  ]}
                  required
                />
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
                <span className="w-full flex gap-2">
                  <label className="w-full">
                    Password
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </label>
                  <label className="w-full">
                    Confirm Password
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleInputChange}
                      className="p-2 mb-2 input-field"
                      required
                    />
                  </label>
                </span>
                <button type="submit" className="btn">
                  Register
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4"
              >
                <h1 className="title">Login</h1>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
                <button type="submit" className="btn">
                  Login
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          <div className="mt-4">
            {signUpOrIn === "register" ? (
              <p>
                Already have an account{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setSignupOrIn("login")}
                >
                  Login
                </span>
              </p>
            ) : (
              <p>
                New member?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setSignupOrIn("register")}
                >
                  register
                </span>
              </p>
            )}
          </div>
        </span>
      </div>
      <div className="bg-blue-500 absolute h-screen w-[30vw] left-0 z-0"></div>
    </div>
  );
}

export default AuthPage;
