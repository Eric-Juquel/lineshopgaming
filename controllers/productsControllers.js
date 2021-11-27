import Product from '../models/product';

import ErrorHandler from '../utils/errorHandler';
import APIFeatures from '../utils/apiFeatures';

// @desc   Fetch all products
// @route  Get  /api/products
// @acces  Public
export const allProducts = async (req, res) => {
  const resPerPage = 9;
  const currentPage = Number(req.query.page) || 1;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product, req.query).search().filter();

  let products = await apiFeatures.model;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.model.clone();

  res.status(200).json({
    success: true,
    productsCount,
    currentPage,
    numOfPages: Math.ceil(filteredProductsCount / resPerPage),
    resPerPage,
    filteredProductsCount,
    products,
  });
};

// @desc   Fetch single product
// @route  Get  /api/products/:id
// @acces  Public
export const productDetails = async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler('Product not found with thi Id', 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};

// @desc   Create new review
// @route  POST /api/auth/addreview/:id
// @acces  Private
export const createProductReview = async (req, res, next) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.query.productID);

  if (!product) {
    return next(new ErrorHandler('Product not found with thi Id', 404));
  }

  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    return next(new ErrorHandler('Product already reviewed', 400));
  }

  const review = {
    name: req.user.firstName + ' ' + req.user.lastName,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json({
    message: 'review added',
  });
};
