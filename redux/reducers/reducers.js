import { combineReducers } from 'redux';

import { cartReducer } from './cartReducers';

import {
  userOrdersReducer,
  orderDetailsReducer,
  newOrderReducer,
  orderPayReducer,
  ordersListReducer,
  orderDeliverReducer,
  orderDeleteReducer,
} from './orderReducers';

import {
  productListReducer,
  productDetailsReducer,
  productReviewReducer,
  newProductReducer,
  productUpdateReducer,
} from './productReducers';

import {
  authReducer,
  forgotPasswordReducer,
  loadedUserReducer,
  updateProfileReducer,
  userDetailsReducer,
  userRoleReducer,
  usersListReducer,
} from './userReducers';

const reducer = combineReducers({
  productsList: productListReducer,
  productDetails: productDetailsReducer,
  productReview: productReviewReducer,
  newProduct: newProductReducer,
  productUpdate:productUpdateReducer,
  auth: authReducer,
  loadedUser: loadedUserReducer,
  updateProfile: updateProfileReducer,
  forgotPassword: forgotPasswordReducer,
  usersList:usersListReducer,
  userDetails:userDetailsReducer,
  userRole:userRoleReducer,
  userOrders: userOrdersReducer,
  orderDetails: orderDetailsReducer,
  newOrder: newOrderReducer,
  orderPay:orderPayReducer,
  orderDeliver:orderDeliverReducer,
  ordersList: ordersListReducer,
  orderDelete:orderDeleteReducer,
  cart: cartReducer,
});

export default reducer;
