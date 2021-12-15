import Product from '../models/product';

import cloudinary from 'cloudinary';

import ErrorHandler from '../utils/errorHandler';
import APIFeatures from '../utils/apiFeatures';

// Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

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

// @desc   Create a new product
// @route  POST /api/admin/products
// @acces  Admin
export const newProduct = async (req, res) => {
  console.log('user', req.user);

  const { name, brand, category, price, countInStock, description } = req.body;

  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: category === 'Game' ? 'Lineshop/games' : 'Lineshop/consoles',
  });

  const product = await Product.create({
    name,
    brand,
    category,
    price,
    countInStock,
    description,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  res.status(201).json({
    success: `New Product ${name} created`,
    product,
  });
};

// @desc   Update a product
// @route  PUT /api/products/:id
// @acces  Private/Admin
export const updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};
