import { myApi } from "../api/api";
import {
  WISHLIST_CHANGE_REQUEST,
  WISHLIST_CHANGE_SUCCESS,
  WISHLIST_CHANGE_FAIL,
  WISHLIST_LIST_REQUEST,
  WISHLIST_LIST_SUCCESS,
  WISHLIST_LIST_FAIL,
  WISHLIST_STATUS_REQUEST,
  WISHLIST_STATUS_SUCCESS,
  WISHLIST_STATUS_FAIL,
} from "../constants/wishlistConstants";
import { logout } from "./userActions";

export const listWishlistProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: WISHLIST_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await myApi(userInfo.token).get("/wishlist");
    dispatch({ type: WISHLIST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: WISHLIST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getWishlistStatus = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: WISHLIST_STATUS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await myApi(userInfo.token).get(`/wishlist/${id}`);
    dispatch({ type: WISHLIST_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: WISHLIST_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const changeWishlistStatus = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: WISHLIST_CHANGE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await myApi(userInfo.token).post(`/wishlist/${id}`);
    dispatch({ type: WISHLIST_CHANGE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Please authenticate.") {
      dispatch(logout());
    }
    dispatch({
      type: WISHLIST_CHANGE_FAIL,
      payload: message,
    });
  }
};
