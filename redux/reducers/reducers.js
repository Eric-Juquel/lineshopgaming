import { combineReducers } from 'redux';

import { productListReducer, productDetailsReducer } from './productReducers';

import {authReducer} from './userReducers'

const reducer = combineReducers({
  productsList: productListReducer,
  productDetails: productDetailsReducer,
  auth:authReducer
});

export default reducer;
