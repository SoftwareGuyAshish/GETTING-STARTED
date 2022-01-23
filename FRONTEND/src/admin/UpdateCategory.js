import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
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
      return <h4 className="text-primary">Category updated successfully!</h4>;
    }
  };

  const errorMessage = () => {
    if (error) {
      return <h4 className="text-danger">Category can't be updated</h4>;
    }
  };

  // TODO: NOT Working
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //Firing Backend Request
    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setSuccess(true);
          setError("");
          setName("");
        }
      }
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
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a new Category"
      discription="Add a new category for your next collection of tshirts here."
      className="container bg-primary p-4"
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

export default UpdateCategory;
