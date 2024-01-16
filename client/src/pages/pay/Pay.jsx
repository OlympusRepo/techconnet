import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { Axios } from "../../config";
import requests from "../../libs/request";
import CheckoutForm from "../../components/PayContents/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51OPujsGtiWlekgp2NSbDVq0Ne20b0KAHHAM3QWuz42Lzyp6g3Sp0qJfmUrQLHu0kqg5gdIQ0MFEMqDnZGS9MEkSz00QfSqxWlH"
);

const Pay = () => {
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await Axios.post(
          `${requests.orders}/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}


export default Pay;
