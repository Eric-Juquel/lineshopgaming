import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  CLEAR_ERRORS,
} from '../constants/productConstants';

// Get all products
export const listProducts =
  (req, currentPage = 1, keyword = '', category) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const { origin } = absoluteUrl(req);

      let link = `${origin}/api/products?page=${currentPage}&search=${keyword}`;

      if (category) link = link.concat(`&category=${category}`);

      const { data } = await axios.get(link);

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//Get  single product details
export const getProductDetails = (req, id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { origin } = absoluteUrl(req);

    const { data } = await axios.get(`${origin}/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const deleteProduct = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: PRODUCT_DELETE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };
//     await axios.delete(`/api/products/${id}`, config);

//     dispatch({
//       type: PRODUCT_DELETE_SUCCESS,
//     });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_DELETE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const createProduct = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: PRODUCT_CREATE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };
//     const { data } = await axios.post(`/api/products`, {}, config);

//     dispatch({
//       type: PRODUCT_CREATE_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_CREATE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const updateProduct = (product) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: PRODUCT_UPDATE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };
//     const { data } = await axios.put(
//       `/api/products/${product._id}`,
//       product,
//       config
//     );

//     dispatch({
//       type: PRODUCT_UPDATE_SUCCESS,
//       payload: data,
//     });

//     dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_UPDATE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const createProductReview = (productId, review) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });

    // const { origin } = absoluteUrl(req);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `/api/auth/addreview/${productId}`,
      review,
      config
    );

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const listTopProducts = () => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_TOP_REQUEST });

//     const { data } = await axios.get(`/api/products/top`);

//     dispatch({
//       type: PRODUCT_TOP_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_TOP_FAIL,
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
