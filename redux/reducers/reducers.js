import { combineReducers } from 'redux';

import { productListReducer, productDetailsReducer } from './productReducers';

import { authReducer, forgotPasswordReducer, loadedUserReducer, updateProfileReducer } from './userReducers';

const reducer = combineReducers({
  productsList: productListReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  loadedUser: loadedUserReducer,
  updateProfile: updateProfileReducer,
  forgotPassword: forgotPasswordReducer
});

export default reducer;
