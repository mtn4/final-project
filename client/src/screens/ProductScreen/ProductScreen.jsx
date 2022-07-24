import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  listProductDetails,
  createProductReview,
} from "../../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";
import {
  getWishlistStatus,
  changeWishlistStatus,
} from "../../actions/wishlistActions";
import { PacmanLoader } from "react-spinners";
import Rating from "../../components/Rating/Rating";
import { IconContext } from "react-icons";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RiArrowRightSFill } from "react-icons/ri";
import { categoryName } from "../../utils/utils";
import { FiAlertCircle } from "react-icons/fi";
import Review from "../../components/Review/Review";
import "./ProductScreen.css";

export default function ProductScreen({ match, history }) {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(1);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const wishlistStatus = useSelector((state) => state.wishlistStatus);
  const { loading: loadingStatus, status } = wishlistStatus;

  const wishlistChange = useSelector((state) => state.wishlistChange);
  const { loading: loadingChange } = wishlistChange;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(1);
      setDescription("");
      setTitle("");
      setName("");
    }
    dispatch(listProductDetails(match.params.id));
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
  }, [dispatch, match, successProductReview, product._id]);

  useEffect(() => {
    dispatch(getWishlistStatus(match.params.id));
  }, [dispatch, match, loadingChange]);
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${quantity}`);
  };
  const changeStatus = () => {
    dispatch(changeWishlistStatus(match.params.id));
  };
  const renderReviews = () => {
    return product.reviews.map((review, i) => (
      <Review
        key={i}
        name={review.name}
        rating={review.rating}
        description={review.description}
        title={review.title}
        createdAt={review.createdAt}
        avatar={review.owner.avatar}
      />
    ));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        name,
        rating,
        description,
        title,
      })
    );
  };
  return (
    <div className="product-screen">
      {loading || loadingChange || loadingStatus ? (
        <div className="spinner">
          <PacmanLoader color={"#0046BE"} size={50} />
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <div className="main-product-category">
            <Link to={`/`}>
              <span>TechShop</span>
            </Link>
            <RiArrowRightSFill />
            <Link to={`/products`}>
              <span>All Products</span>
            </Link>
            <RiArrowRightSFill />
            <Link to={`/products/${product.category}`}>
              <span>{product.category && categoryName(product.category)}</span>
            </Link>
          </div>
          <div className="main-product-section">
            <div className="main-product-left">
              <img src={product.image} alt="" />
            </div>
            <div className="main-product-right">
              <div className="main-product-name">{product.name}</div>
              <div className="main-product-brand">{product.brand}</div>
              <Rating rating={product.rating} numReviews={product.numReviews} />
              <div className="main-product-price-wishlist">
                <div className="main-product-price">
                  ${product.price && product.price.toLocaleString()}
                </div>
                {userInfo ? (
                  <IconContext.Provider value={{ color: "red", size: 32 }}>
                    {status ? (
                      <AiFillHeart
                        style={{ cursor: "pointer" }}
                        onClick={changeStatus}
                      />
                    ) : (
                      <AiOutlineHeart
                        style={{ cursor: "pointer" }}
                        onClick={changeStatus}
                      />
                    )}
                  </IconContext.Provider>
                ) : (
                  ""
                )}
              </div>
              <div className="main-product-description">
                {product.description}
              </div>
              {product.cntInStock ? (
                <>
                  <IconContext.Provider value={{ size: 24 }}>
                    <div className="main-product-shipping">
                      <span>
                        <FaTruck />
                      </span>
                      <span>FREE Shipping</span>
                    </div>
                  </IconContext.Provider>
                  <IconContext.Provider value={{ size: 10 }}>
                    <div className="main-product-qty-btn">
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      >
                        {[...Array(product.cntInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        className="main-product-btn"
                        onClick={addToCartHandler}
                      >
                        <span>Add to Cart</span>
                        <span>
                          <BsFillCaretRightFill />
                        </span>
                      </button>
                    </div>
                  </IconContext.Provider>
                </>
              ) : (
                <>
                  <div className="main-product-sold-out">
                    <div style={{ color: "red", fontWeight: 700 }}>
                      Sold Out
                    </div>
                    <div>
                      This item is currently sold out but we are working to get
                      more inventory.
                    </div>
                  </div>
                  <IconContext.Provider value={{ size: 10 }}>
                    <button className="main-product-btn sold-out-btn">
                      <span>Sold Out</span>
                    </button>
                  </IconContext.Provider>
                </>
              )}
            </div>
          </div>
          <div className="review-section-title">
            Customer Reviews of the {product.name}
          </div>
          <div className="create-a-review">
            <div className="create-a-review-title">Add a Review</div>
            {errorProductReview && (
              <div className="login-screen-error">
                <IconContext.Provider value={{ size: 24 }}>
                  <FiAlertCircle />
                  {errorProductReview}
                </IconContext.Provider>
              </div>
            )}
            {userInfo ? (
              <>
                <div className="create-a-review-rating">
                  <select
                    className="create-a-review-rating-select"
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option defaultValue value="1">
                      1
                    </option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <form onSubmit={submitHandler}>
                  <div className="login-screen-form-group">
                    <label className="login-screen-label">Full Name</label>
                    <input
                      className="login-screen-input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="login-screen-form-group">
                    <label className="login-screen-label">Title</label>
                    <input
                      className="login-screen-input"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="login-screen-form-group">
                    <label className="login-screen-label">Description</label>
                    <textarea
                      style={{ height: 100 }}
                      className="login-screen-input"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <button className="login-page-submit" type="submit">
                    Submit Review
                  </button>
                </form>
              </>
            ) : (
              <div className="create-a-review-title">
                Sign in to add a review
              </div>
            )}
          </div>
          <div className="review-section-reviews">{renderReviews()}</div>
        </>
      )}
    </div>
  );
}
