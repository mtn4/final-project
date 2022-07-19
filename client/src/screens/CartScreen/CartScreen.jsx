import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { FaTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import "./CartScreen.css";

export default function CartScreen({ match, location, history }) {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const renderCartProducts = () => {
    return cartItems.map((item, i) => (
      <div key={i} className="cart-product">
        <div className="cart-product-flex">
          <div className="cart-product-image">
            <Link to={`/product/${item.product}`}>
              <img src={item.image} alt="" />
            </Link>
          </div>
          <Link to={`/product/${item.product}`}>
            <div className="cart-product-name">{item.name}</div>
          </Link>
        </div>
        <div className="cart-product-flex">
          <div>
            <select
              className="cart-product-qty-select"
              value={item.qty}
              onChange={(e) =>
                dispatch(addToCart(item.product, Number(e.target.value)))
              }
            >
              {[...Array(item.cntInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <IconContext.Provider value={{ size: 14 }}>
              <button
                className="remove-cart-btn"
                onClick={() => removeFromCartHandler(item.product)}
              >
                <span>
                  <FaTrashAlt />
                </span>
                <span>Remove</span>
              </button>
            </IconContext.Provider>
          </div>
          <div className="cart-product-price">
            ${item.price.toLocaleString()}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="cart-screen">
      <div className="cart-section">
        <div className="cart-section-left">{renderCartProducts()}</div>
        <div className="cart-section-right">
          <div className="cart-summary">
            <div className="cart-summary-content">
              <div className="cart-summary-title">Order Summary</div>
              <div className="cart-summary-row">
                <div>
                  <span style={{ fontWeight: 700 }}>Subtotal</span> (
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
                </div>
                <div style={{ fontWeight: 700 }}>
                  $
                  {Number(
                    cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)
                  ).toLocaleString()}
                </div>
              </div>
              <div className="cart-summary-row">
                <div>Shipping & Handling</div>
                <div style={{ color: "red" }}>FREE</div>
              </div>
              <div className="cart-summary-row">
                <div>Estimated Tax</div>
                <div>$0.00</div>
              </div>
              <div
                className="cart-summary-row"
                style={{ borderTop: "1px solid #d9d9d9" }}
              ></div>
              <div className="cart-summary-row summary-total">
                <div>Estimated Total</div>
                <div>
                  $
                  {Number(
                    cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)
                  ).toLocaleString()}
                </div>
              </div>
              <div>
                <button className="main-product-btn checkout-btn">
                  <span>Proceed To Checkout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
