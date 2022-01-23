import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper";

import { isAuthenticated } from "../auth/helper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const [cartingError, setcartingError] = useState(false);

  const addToCart = () => {
    if (isAuthenticated()) {
      addItemToCart(product, () => setRedirect(true));
    } else {
      setcartingError(true);
    }
  };

  const cartingErrorMessage = () => {
    return (
      <div className=" mt-3 text-left">
        <div
          className="alert alert-danger"
          style={{ display: cartingError ? "" : "none" }}
        >
          Please login first to continue.
        </div>
      </div>
    );
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const cardTitle = product ? product.name : "A photo from pexels";
  const cardDescription = product ? product.description : "Default Description";
  const cardPrice = product ? product.price : "DEFAULT";

  const showAddToCart = (addtoCart) =>
    addtoCart && (
      <button
        onClick={addToCart}
        className="btn col-12 btn-outline-primary mt-2 mb-2"
      >
        Add to Cart
      </button>
    );

  const showRemoveFromCart = (removeFromCart) =>
    removeFromCart && (
      <button
        onClick={() => {
          removeItemFromCart(product._id);
          setReload(!reload);
        }}
        className="btn col-12 btn-outline-danger mt-2 mb-2"
      >
        Remove from cart
      </button>
    );

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-primary font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-primary rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          {!isAuthenticated() && cartingErrorMessage()}
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
