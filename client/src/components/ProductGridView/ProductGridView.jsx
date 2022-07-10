import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import { IconContext } from "react-icons";
import { BsFillCaretRightFill } from "react-icons/bs";
import "./ProductGridView.css";

export default function ProductGridView({
  name,
  brand,
  id,
  rating,
  numReviews,
  image,
  price,
}) {
  return (
    <div className="product-grid-view-container">
      <div className="product-grid-view-image">
        <Link to={`/products/${id}`}>
          <img src={`${image}`} alt={`${name}`} />
        </Link>
      </div>
      <Rating rating={rating} numReviews={numReviews} />
      <div className="product-grid-view-brand">{brand}</div>
      <Link to={`/products/${id}`}>
        <div className="product-grid-view-name">{name}</div>
      </Link>
      <div className="product-grid-view-price">${price.toLocaleString()}</div>
      <div style={{ fontSize: 12, weight: 400, marginTop: 5 }}>
        Free Shipping
      </div>
      <IconContext.Provider value={{ size: 10 }}>
        <Link to={`/products/${id}`}>
          <button className="product-list-view-cart-btn">
            <span>Add to Cart</span>
            <span>
              <BsFillCaretRightFill />
            </span>
          </button>
        </Link>
      </IconContext.Provider>
    </div>
  );
}
