const express = require("express");
var router = express.Router();

const {
  getCategoryById,
  createCategory,
  getCategory,
  updateCategory,
  removeCategory,
  getAllCategory,
} = require("../controllers/category");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//PARAMS
router.param("categoryId", getCategoryById);
router.param("userId", getUserById);

//Here are the actual routes
//Create
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//Read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//Update
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//Delete
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;
