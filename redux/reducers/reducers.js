import { combineReducers } from 'redux';

import { userOrdersReducer, orderDetailsReducer } from './orderReducers';

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
});

export default reducer;
