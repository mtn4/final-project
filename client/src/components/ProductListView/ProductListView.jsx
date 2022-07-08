import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import { IconContext } from "react-icons";
import { BsFillCaretRightFill } from "react-icons/bs";
import "./ProductListView.css";

export default function ProductListView({
  name,
  brand,
  id,
  rating,
  numReviews,
  image,
  price,
  description,
}) {
  return (
    <div className="product-list-view-container">
      <Link to={`/products/${id}`}>
        <img src={`${image}`} alt={`${name}`} />
      </Link>
      <div className="product-list-view-mid">
        <div className="product-list-view-branding">
          <Rating rating={rating} numReviews={numReviews} />
          <div className="product-list-view-brand">{brand}</div>
        </div>
        <Link to={`/products/${id}`}>
          <div className="product-list-view-name">{name}</div>
        </Link>
        <div className="product-list-description">{description}</div>
      </div>
      <div className="product-list-view-right">
        <div className="product-list-view-price">${price.toLocaleString()}</div>
        <div>Free Shipping</div>
        <IconContext.Provider value={{ size: 10 }}>
          <button className="product-list-view-cart-btn">
            <span>Add to Cart</span>
            <span>
              <BsFillCaretRightFill />
            </span>
          </button>
        </IconContext.Provider>
      </div>
    </div>
  );
}
