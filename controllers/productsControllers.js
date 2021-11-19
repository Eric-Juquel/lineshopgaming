import next from 'next';
import Product from '../models/product';

import ErrorHandler from '../utils/errorHandler';
import APIFeatures from '../utils/apiFeatures';

// @desc   Fetch all products
// @route  Get  /api/products
// @acces  Public
export const allProducts = async (req, res) => {
  const resPerPage = 9;
  const currentPage = Number(req.query.pageNumber) || 1;
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
    numOfPages: Math.ceil(productsCount / resPerPage),
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
