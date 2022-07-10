import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productActions";
import { PacmanLoader } from "react-spinners";
import Rating from "../../components/Rating/Rating";
import { IconContext } from "react-icons";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import "./ProductScreen.css";

export default function ProductScreen({ match, history }) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${quantity}`);
  };
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
                ${product.price && product.price.toLocaleString()}
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
        </>
      )}
    </div>
  );
}
