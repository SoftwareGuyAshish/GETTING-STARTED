import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import PaymentBraintree from "./PaymentBraintree";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This Section is for your Cart</h2>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div className="p-2  mb-4">
                <Card
                  key={index}
                  product={product}
                  addtoCart={false}
                  removeFromCart={true}
                  setReload={setReload}
                  reload={reload}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Base title="Your Cart" discription="Ready for Checkout">
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h2>Your cart is empty.</h2>
          )}
        </div>
        <div className="col-6">
          <PaymentBraintree products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
