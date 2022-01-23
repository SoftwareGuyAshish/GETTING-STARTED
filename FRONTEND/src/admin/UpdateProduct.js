import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getAllCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    createdProduct: "",
    categories: [],
    category: "",
    formData: "",
    error: "",
    getaRedirect: false,
    loading: false,
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    error,
    photo,
    createdProduct,
    formData,
    getaRedirect,
    loading,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          category: data.category._id,
          formData: new FormData(),
        });
      }
    });
  };

  const preloadCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onUpdate = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, token, user._id, formData).then(
      (data) => {
        if (data.err) {
          setValues({ ...values, error: data.err });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            stock: "",
            photo: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      }
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success text-center"
        style={{ display: createdProduct ? "" : "none" }}
      >
        {createdProduct} updated successfully.
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger text-center"
        style={{ display: error ? "" : "none" }}
      >
        Error in updating the Product.
      </div>
    );
  };

  const goBack = () => (
    <div className="mx-2 mb-2">
      <Link
        className="btn btn-sm mb-3 btn-outline-dark btn-info"
        to="/admin/dashboard"
      >
        Admin Home
      </Link>
    </div>
  );

  const previousPage = () => (
    <div className="mx-2">
      <Link
        className="btn btn-sm mb-3 btn-outline-dark btn-warning"
        to="/admin/products"
      >
        Go Back
      </Link>
    </div>
  );

  const updateProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn col-12 btn-primary my-3">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control my-3"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control my-3"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control my-3"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control my-3"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control my-3"
          placeholder="Stocks"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onUpdate}
        className="btn btn-outline-primary col-12 my-3"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Product Updation Zone"
      discription="Update your products here."
      className="container bg-primary p-4 mb-3"
    >
      {goBack()}
      <div className="row bg-white p-4 mx-2 rounded">
        {previousPage()}
        <div className="col-md-8 offset-md-2">
          {errorMessage()}
          {successMessage()}
          {updateProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
