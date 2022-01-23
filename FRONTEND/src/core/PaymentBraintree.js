import DropIn from "braintree-web-drop-in-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import { processPayment, getmeToken } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const PaymentBraintree = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    // console.log(userId, token);
    getmeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const showBTDropin = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn-primary col-12" onClick={onPurchase}>
              Buy Now
            </button>
          </div>
        ) : (
          <h3>Please add something to Cart</h3>
        )}
      </div>
    );
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          const orderData = {
            products: products,
            amount: response.transaction.amount,
            transaction_id: response.transaction.id,
          };
          createOrder(userId, token, orderData);

          cartEmpty(() => console.log("Order Filled"));

          setReload(!reload);
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>Your total amount is ${getAmount()}</h3>
      {showBTDropin()}
    </div>
  );
};

export default PaymentBraintree;
