import { combineReducers } from 'redux';
import { productListReducer, productDetailsReducer } from './productReducers';

const reducer = combineReducers({
  productsList: productListReducer,
  productDetails: productDetailsReducer,
});

export default reducer;
