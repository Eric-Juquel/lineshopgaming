import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  USER_ORDERS_REQUEST,
  USER_ORDERS_SUCCESS,
  USER_ORDERS_FAIL,
  USER_ORDERS_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
  CLEAR_ERRORS,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
} from '../constants/orderConstants';

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        order: action.payload.order,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CREATE_RESET:
      return {};

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload.message,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const userOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case USER_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case USER_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case USER_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_ORDERS_RESET:
      return {
        orders: [],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const ordersListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        ordersCount: action.payload.ordersCount,
        resPerPage: action.payload.resPerPage,
        currentPage: action.payload.currentPage,
        numOfPages: action.payload.numOfPages,
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELETE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case ORDER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
