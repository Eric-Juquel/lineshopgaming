import Order from '../models/order';

import ErrorHandler from '../utils/errorHandler';

// @desc   Get logged in user orders
// @route  GET /api/auth/orders
// @acces  Private
export const userOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders: orders.reverse(),
  });
};

// @desc   Get all orders
// @route  GET /api/admin/orders
// @acces  Admin
export const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id firstName lastName');

  res.json({
    success: true,
    orders: orders.reverse(),
  });
};

// @desc   Get order by ID
// @route  GET /api/auth/orders/:id
// @acces  Private
export const orderDetails = async (req, res) => {
  const order = await Order.findById(req.query.orderID).populate(
    'user',
    'firstName lastName email role'
  );

  res.status(200).json({
    success: true,
    order,
  });
};

// @desc   Create new order
// @route  POST  /api/orders
// @acces  Public
export const createOrder = async (req, res) => {
  const {
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0)
    return next(new ErrorHandler('No Order Items', 400));

  const order = await Order.create({
    orderItems,
    user,
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
};

// @desc   Pay order
// @route  PATCH  /api/orders/:orderID/pay
// @acces  Public
export const payOrder = async (req, res, next) => {
  const order = await Order.findById(req.query.orderID);

  if (!order) {
    return next(new ErrorHandler('Order Not Found', 404));
  }

  const result = await Order.updateOne(
    { _id: order._id },
    {
      $set: {
        isPaid: true,
        paidAt: new Date(),
      },
    }
  );
  res.status(201).json({ message: 'Order Paid' });
};



// @desc   Update order to delivered
// @route  PUT /api/admin/orders/:id/deliver
// @acces  Private/Admin
export const updateOrderToDelivered = async (req, res, next) => {
  const order = await Order.findById(req.query.orderID);

  if (!order) {
    return next(new ErrorHandler('Order Not Found', 404));
  }

  const result = await Order.updateOne(
    { _id: order._id },
    {
      $set: {
        isDelivered: true,
        deliveredAt: Date.now(),
      },
    }
  );

  res.status(201).json({ message: 'Order Delivered' });
};

// @desc   Delete a order
// @route  DELETE  /api/admin/orders/:id/delete
// @acces  Private/Admin
export const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.query.orderID);

  if (!order) {
    return next(new ErrorHandler('Order Not Found', 404));
  }

  await order.remove();
  res.status(200).json({ message: 'Order removed' });
};
