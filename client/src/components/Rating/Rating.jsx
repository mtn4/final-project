import React from "react";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import "./Rating.css";
export default function Rating({ rating, numReviews }) {
  return (
    <div className="rating">
      <IconContext.Provider value={{ color: "gold" }}>
        <div className="stars">
          <span>
            {rating >= 1 ? (
              <BsStarFill />
            ) : rating >= 0.5 ? (
              <BsStarHalf />
            ) : (
              <BsStar />
            )}
          </span>
          <span>
            {rating >= 2 ? (
              <BsStarFill />
            ) : rating >= 1.5 ? (
              <BsStarHalf />
            ) : (
              <BsStar />
            )}
          </span>
          <span>
            {rating >= 3 ? (
              <BsStarFill />
            ) : rating >= 2.5 ? (
              <BsStarHalf />
            ) : (
              <BsStar />
            )}
          </span>
          <span>
            {rating >= 4 ? (
              <BsStarFill />
            ) : rating >= 3.5 ? (
              <BsStarHalf />
            ) : (
              <BsStar />
            )}
          </span>
          <span>
            {rating >= 5 ? (
              <BsStarFill />
            ) : rating >= 4.5 ? (
              <BsStarHalf />
            ) : (
              <BsStar />
            )}
          </span>
        </div>
      </IconContext.Provider>
      <span className="rating-num-reviews">({numReviews})</span>
    </div>
  );
}
