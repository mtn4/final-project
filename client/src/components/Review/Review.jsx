import React from "react";
import Rating from "../Rating/Rating";
import "./Review.css";

export default function Review({
  name,
  title,
  description,
  rating,
  createdAt,
  avatar,
}) {
  return (
    <div className="review-container">
      <div className="review-left">
        <div>{name}</div>
        <div>
          {avatar ? (
            <img
              src={`data:image/png;base64,${avatar.toString("base64")}`}
              alt=""
            />
          ) : (
            <img src="/avatar.png" alt="" />
          )}
        </div>
      </div>
      <div className="review-right">
        <div className="review-right-top">
          <div className="review-rating-title">
            <Rating rating={rating} />
            {title}
          </div>
          <div>{new Date(createdAt).toLocaleString()}</div>
        </div>
        <div className="review-description">{description}</div>
      </div>
    </div>
  );
}
