import { combineReducers } from 'redux';

import { cartReducer } from './cartReducers';

import {
  userOrdersReducer,
  orderDetailsReducer,
  newOrderReducer,
  orderPayReducer,
} from './orderReducers';

import {
  productListReducer,
  productDetailsReducer,
  productReviewReducer,
} from './productReducers';

import {
  authReducer,
  forgotPasswordReducer,
  loadedUserReducer,
  updateProfileReducer,
} from './userReducers';

const reducer = combineReducers({
  productsList: productListReducer,
  productDetails: productDetailsReducer,
  productReview: productReviewReducer,
  auth: authReducer,
  loadedUser: loadedUserReducer,
  updateProfile: updateProfileReducer,
  forgotPassword: forgotPasswordReducer,
  userOrders: userOrdersReducer,
  orderDetails: orderDetailsReducer,
  newOrder: newOrderReducer,
  orderPay:orderPayReducer,
  cart: cartReducer,
});

export default reducer;
