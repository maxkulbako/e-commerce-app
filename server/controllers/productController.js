import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/products.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (products && products.length > 0) {
    return res.json(products);
  }
});

// @desc    Fetch product by ID
// @route   GET /api/products:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  }

  res.status(404);
  throw new Error("Resourse not found");
});

export { getProducts, getProductById };
