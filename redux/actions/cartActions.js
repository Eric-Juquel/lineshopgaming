import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  SET_CART,
  CART_SAVE_ORDER,
} from '../constants/cartConstants';
import Cookies from 'js-cookie';

// Set from storage
export const setCartFromStorage = () => async (dispatch) => {
  dispatch({ type: SET_CART });
};

export const addToCart = (productId, qty) => async (dispatch) => {
  const { data } = await axios.get(`/api/products/${productId}`);

  const { product } = data;

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    },
  });
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
};

export const saveOrder = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_ORDER,
    payload: data,
  });
};
