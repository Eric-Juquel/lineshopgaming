import Order from '../models/order';

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
