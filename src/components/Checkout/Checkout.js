import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { AuthContext } from "../AuthProvider"; // Assuming you have an AuthProvider

const Checkout = () => {
  const { cart } = useContext(AuthContext); // Assuming you have a cart in your AuthContext

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Checkout</h1>
      <div className="mb-4">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="mb-2">
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-between items-center">
        <Link to="/shopping">
          <Button>Continue Shopping</Button>
        </Link>
        {cart.length > 0 && <Button type="primary">Proceed to Checkout</Button>}
      </div>
    </div>
  );
};

export default Checkout;
