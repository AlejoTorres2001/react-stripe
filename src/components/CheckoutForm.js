import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);
    if (!error) {
      try {
        const { id } = paymentMethod;
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout",
          {
            id,
            amount: 10000, //amount in cents
          }
        );
        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <img
        src={
          "https://http2.mlstatic.com/D_NQ_NP_612478-MLA31356418245_072019-O.webp"
        }
        alt="mouse"
        className="img-fluid m-2"
      />
      <h3 className="text-center my-2">Price: $100</h3>
      <div className="form-group">
        <CardElement className="form-control" />
      </div>
      <button className="btn btn-success m-md-2" disabled={!stripe}>
          {loading ? <div className="spinner-border text-light" role="status">
          </div> : "Buy"}
      </button>
    </form>
  );
};
export default CheckoutForm;
