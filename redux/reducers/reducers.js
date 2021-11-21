import { combineReducers } from 'redux';

import { productListReducer, productDetailsReducer } from './productReducers';

import { authReducer, updateProfileReducer } from './userReducers';

const reducer = combineReducers({
  productsList: productListReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  updateProfile: updateProfileReducer,
});

export default reducer;
