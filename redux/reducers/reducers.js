import { combineReducers } from 'redux';

import { productListReducer, productDetailsReducer } from './productReducers';

import { authReducer, forgotPasswordReducer, updateProfileReducer } from './userReducers';

const reducer = combineReducers({
  productsList: productListReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  updateProfile: updateProfileReducer,
  forgotPassword: forgotPasswordReducer
});

export default reducer;
