import { combineReducers } from 'redux';

import { userOrdersReducer, orderDetailsReducer } from './orderReducers';

import { productListReducer, productDetailsReducer } from './productReducers';

import {
  authReducer,
  forgotPasswordReducer,
  loadedUserReducer,
  updateProfileReducer,
} from './userReducers';

const reducer = combineReducers({
  productsList: productListReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  loadedUser: loadedUserReducer,
  updateProfile: updateProfileReducer,
  forgotPassword: forgotPasswordReducer,
  userOrders: userOrdersReducer,
  orderDetails: orderDetailsReducer,
});

export default reducer;
