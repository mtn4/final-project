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

export const wishlistListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case WISHLIST_LIST_REQUEST:
      return { loading: true };
    case WISHLIST_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case WISHLIST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const wishlistStatusReducer = (state = { status: {} }, action) => {
  switch (action.type) {
    case WISHLIST_STATUS_REQUEST:
      return { loading: true };
    case WISHLIST_STATUS_SUCCESS:
      return { loading: false, status: action.payload };
    case WISHLIST_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const wishlistChangeReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_CHANGE_REQUEST:
      return { loading: true };
    case WISHLIST_CHANGE_SUCCESS:
      return { loading: false };
    case WISHLIST_CHANGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
