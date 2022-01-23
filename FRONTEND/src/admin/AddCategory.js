import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-primary">Category created successfully!</h4>;
    }
  };

  const errorMessage = () => {
    if (error) {
      return <h4 className="text-danger">Category can't be created</h4>;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //Firing Backend Request
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setSuccess(true);
        setError("");
        setName("");
      }
    });
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

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the Category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            required
            autoFocus
            placeholder="For Ex. Summer"
          />
          <button onClick={onSubmit} className="btn btn-outline-primary">
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a new Category"
      discription="Add a new category for your next collection of tshirts here."
      className="container bg-primary p-4 mb-5"
    >
      {goBack()}
      <div className="row bg-white p-4 mx-2 rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
