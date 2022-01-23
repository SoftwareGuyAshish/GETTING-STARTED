import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  discription = "My Discription",
  className = "bg-dark text-white p-5",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center m-4">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{discription}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto">
      <div className="container-fluid bg-primary text-white text-center py-3">
        <h4>If you have any problem, feel free to reach out!</h4>
        <button className="btn btn-warning btn-large ">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          The Only <span className="text-white">STORE</span> You Need To Visit.
        </span>
      </div>
    </footer>
  </div>
);
export default Base;
