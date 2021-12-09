import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  USER_ORDERS_REQUEST,
  USER_ORDERS_SUCCESS,
  USER_ORDERS_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  CLEAR_ERRORS,
} from '../constants/orderConstants';

export const newOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/orders', order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (authCookie, req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    const config = {
      headers: {
        cookie: authCookie,
      },
    };

    const { data } = await axios.get(`${origin}/api/auth/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.patch(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder = (orderID) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const { data } = await axios.put(`/api/admin/orders/${orderID}/deliver`);

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userOrders = (authCookie, req) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    const config = {
      headers: {
        cookie: authCookie,
      },
    };

    const { data } = await axios.get(`${origin}/api/auth/orders`, config);

    dispatch({
      type: USER_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: USER_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrders =
  (authCookie, req, page = 1) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
      });

      const { origin } = absoluteUrl(req);

      const config = {
        headers: {
          cookie: authCookie,
        },
      };

      const { data } = await axios.get(
        `${origin}/api/admin/orders?page=${page}`,
        config
      );

      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DELETE_REQUEST,
    });

    const { data } = await axios.delete(`/api/admin/orders/${id}/delete`);

    dispatch({
      type: ORDER_DELETE_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
