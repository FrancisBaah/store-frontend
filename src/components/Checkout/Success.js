import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Success = () => {
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl mb-4">Payment Successful!</h1>
      <p className="mb-4">Thank you for your purchase.</p>
      <Link to="/shopping">
        <Button type="primary">Continue Shopping</Button>
      </Link>
    </div>
  );
};

export default Success;
