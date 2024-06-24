import React from "react";
import { Link } from "react-router-dom";

const Canceled = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Payment Canceled</h1>
      <p>
        Your payment was canceled. If this was a mistake, you can try again.
      </p>
      <Link to="/shopping">
        <button className="btn btn-primary">Back to Shopping</button>
      </Link>
    </div>
  );
};

export default Canceled;
