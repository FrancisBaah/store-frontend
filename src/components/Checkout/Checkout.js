import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, message } from "antd";
import { AuthContext } from "../AuthProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Checkout = () => {
  const { cart } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (cart) {
      const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
      setAmount(totalAmount);
    }
  }, [cart]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      message.error("Error creating payment method:", error.message);
      return;
    }

    try {
      const response = await fetch("/payment/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount * 100,
          currency: "usd",
          payment_method_id: paymentMethod.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch client secret");
      }

      const data = await response.json();
      const { clientSecret } = data;

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (stripeError) {
        message.error("Payment failed:", stripeError.message);
      } else {
        message.success("Payment succeeded:", paymentIntent.id);
        // Handle success: update order status, redirect user, etc.
      }
    } catch (error) {
      message.error("Error:", error.message);
    }
  };

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
        <Link to="/shopping">
          <Button>Continue Shopping</Button>
        </Link>
        {cart.length > 0 && (
          <div className="w-[300px] h-full">
            <CardElement />
            <br />
            <Button onClick={handleSubmit} type="primary">
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
