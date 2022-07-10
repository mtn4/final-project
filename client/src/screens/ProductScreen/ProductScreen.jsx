import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productActions";
import { PacmanLoader } from "react-spinners";
import Rating from "../../components/Rating/Rating";
import { IconContext } from "react-icons";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import "./ProductScreen.css";

export default function ProductScreen({ match }) {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <div className="product-screen">
      {loading ? (
        <div className="spinner">
          <PacmanLoader color={"#0046BE"} size={50} />
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <div className="main-product-category">Category</div>
          <div className="main-product-section">
            <div className="main-product-left">
              <img src={product.image} alt="" />
            </div>
            <div className="main-product-right">
              <div className="main-product-name">{product.name}</div>
              <div className="main-product-brand">{product.brand}</div>
              <Rating rating={product.rating} numReviews={product.numReviews} />
              <div className="main-product-price">
                ${product.price.toLocaleString()}
              </div>
              <IconContext.Provider value={{ size: 24 }}>
                <div className="main-product-shipping">
                  <span>
                    <FaTruck />
                  </span>
                  <span>FREE Shipping</span>
                </div>
              </IconContext.Provider>
              <IconContext.Provider value={{ size: 10 }}>
                <button className="main-product-btn">
                  <span>Add to Cart</span>
                  <span>
                    <BsFillCaretRightFill />
                  </span>
                </button>
              </IconContext.Provider>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
