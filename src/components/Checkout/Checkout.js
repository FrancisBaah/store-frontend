import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Spin, message } from "antd";
import { AuthContext } from "../AuthProvider";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { baseURL } from "../Helper/constants";

const Checkout = () => {
  const { cart } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length > 0) {
      const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
      setAmount(totalAmount);

      fetch(`${baseURL}/payment/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount * 100 }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => {
          console.error("Error fetching payment intent:", error);
          message.error("Failed to initialize payment.");
        });
    }
  }, [cart]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      navigate("/success");
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return <Spin />;
  }

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
        <p>Total Amount: ${amount}</p>
      </div>
      <div className="flex justify-between items-center">
        <Link to="/shopping" className="w-full">
          <Button>Continue Shopping</Button>
        </Link>
        {cart.length > 0 && (
          <div className="h-full w-full">
            {clientSecret && <PaymentElement />}
            {errorMessage && <div>{errorMessage}</div>}
            <br />
            <Button onClick={handleSubmit} type="primary" loading={loading}>
              Pay {amount}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
