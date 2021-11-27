import Order from '../models/order';

import ErrorHandler from '../utils/errorHandler';

// @desc   Get logged in user orders
// @route  GET /api/auth/orders
// @acces  Private
export const userOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
};

// @desc   Get order by ID
// @route  GET /api/auth/orders/:id
// @acces  Private
export const orderDetails = async (req, res) => {
  const order = await Order.findById(req.query.orderID).populate(
    'user',
    'firstName lastName email'
  );

  console.log(req.query.id);

  res.status(200).json({
    success: true,
    order,
  });
};

// @desc   Create new order
// @route  POST  /api/auth/orders
// @acces  Private
export const createOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return next(new ErrorHandler('No Order Items', 400));
  } else {
    const order = await Order.create({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json({
      message: 'New order saved',
      order,
    });
  }
};
