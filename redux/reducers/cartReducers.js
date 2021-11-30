import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
  SET_CART,
  CART_SAVE_ORDER,
} from '../constants/cartConstants';

import Cookies from 'js-cookie';

// Get Cart  from storage
const cartItemsFromStorage = Cookies.get('cartItems')
  ? JSON.parse(Cookies.get('cartItems'))
  : [];
const shippingAddressFromStorage = Cookies.get('shippingAddress')
? JSON.parse(Cookies.get('shippingAddress'))
: {};
const paymentMethodFromStorage = Cookies.get('paymentMethod')
? JSON.parse(Cookies.get('paymentMethod'))
: null;
const placeOrderFromStorage = Cookies.get('placeOrder')
? JSON.parse(Cookies.get('placeOrder'))
: null;

export const cartReducer = (
  state = {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
    placeOrder: placeOrderFromStorage
  },
  action
) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
      };
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_SAVE_ORDER:
      return {
        ...state,
        placeOrder: action.payload,
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
