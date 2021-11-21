import axios from 'axios';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  CLEAR_ERRORS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from '../constants/userConstants';

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/auth/register', userData, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOAD_REQUEST });

    const { data } = await axios.get('/api/auth');

    dispatch({
      type: USER_LOAD_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_LOAD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const logout = () => (dispatch) => {
//   localStorage.removeItem('userInfo');
//   localStorage.removeItem('cartItems');
//   localStorage.removeItem('shippingAddress');
//   localStorage.removeItem('paymentMethod');
//   dispatch({ type: USER_LOGOUT });
//   dispatch({ type: USER_DETAILS_RESET });
//   dispatch({ type: ORDER_LIST_MY_RESET });
//   dispatch({ type: USER_LIST_RESET });
//   document.location.href = '/login';
// };

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put('/api/auth/update', userData, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Forgot password action
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/password/forgot', email, config);

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
};

// Reset password action
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/password/${token}`,
      passwords,
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
};

// export const listUsers = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: USER_LIST_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.get('/api/users', config);

//     console.log('data', data);
//     dispatch({
//       type: USER_LIST_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: USER_LIST_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const deleteUser = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: USER_DELETE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     await axios.delete(`/api/users/${id}`, config);

//     dispatch({ type: USER_DELETE_SUCCESS });
//   } catch (error) {
//     dispatch({
//       type: USER_DELETE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const updateUser = (user) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: USER_UPDATE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.put(`/api/users/${user._id}`, user, config);

//     dispatch({ type: USER_UPDATE_SUCCESS });

//     dispatch({
//       type: USER_DETAILS_SUCCESS,
//       payload: data,
//     });
//     dispatch({ type: USER_DETAILS_RESET });
//   } catch (error) {
//     dispatch({
//       type: USER_UPDATE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

//Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
