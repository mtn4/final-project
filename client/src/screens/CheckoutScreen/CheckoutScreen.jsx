import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { saveShippingAddress } from "../../actions/cartActions";
import { CgRadioCheck } from "react-icons/cg";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { createOrder } from "../../actions/orderActions";
import { USER_DETAILS_RESET } from "../../constants/userConstants";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";
import "./CheckoutScreen.css";

export default function CheckoutScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.totalPrice = Number(cart.itemsPrice).toFixed(2);

  const [stage, setStage] = useState("shipping");
  const [name, setName] = useState(shippingAddress.name);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [phone, setPhone] = useState(shippingAddress.phone);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, loading, success, error } = orderCreate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ name, address, city, postalCode, country, phone })
    );
    setStage("paymentMethod");
  };

  const submitMethodHandler = (e) => {
    e.preventDefault();
    setStage("confirm");
  };

  const renderProducts = () => {
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
          <div className="cart-product-name">x{item.qty}</div>
          <div className="cart-product-price">
            ${item.price.toLocaleString()}
          </div>
        </div>
      </div>
    ));
  };

  const confirmOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className="checkout-screen">
      {loading ? (
        <div className="spinner">
          <PacmanLoader color={"#0046BE"} size={50} />
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <IconContext.Provider value={{ size: 50 }}>
            <div className="checkout-screen-title">
              <div style={{ position: "relative" }}>
                <div className="checkout-step">
                  {stage === "shipping"
                    ? "1"
                    : stage === "paymentMethod"
                    ? "2"
                    : "3"}
                </div>
                <CgRadioCheck />
              </div>
              {stage === "shipping"
                ? "Shipping Address"
                : stage === "paymentMethod"
                ? "Payment Method"
                : "Place Order"}
            </div>
          </IconContext.Provider>
          {stage === "shipping" && (
            <>
              <div className="checkout-screen-shipping">
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
                    <label className="login-screen-label">Address</label>
                    <input
                      className="login-screen-input"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="login-screen-form-group">
                    <label className="login-screen-label">City</label>
                    <input
                      className="login-screen-input"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="login-screen-form-group">
                    <label className="login-screen-label">Postal Code</label>
                    <input
                      className="login-screen-input"
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                    />
                  </div>
                  <div className="login-screen-form-group">
                    <label className="login-screen-label">Country</label>
                    <input
                      className="login-screen-input"
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </div>
                  <div className="login-screen-form-group">
                    <label className="login-screen-label">Phone</label>
                    <input
                      className="login-screen-input"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <button className="login-page-submit" type="submit">
                    Continue to Payment
                  </button>
                </form>
              </div>
            </>
          )}
          {stage === "paymentMethod" && (
            <div className="checkout-screen-shipping">
              <div className="checkout-method">Select Payment Method:</div>
              <form onSubmit={submitMethodHandler}>
                <input
                  type="radio"
                  name="credit"
                  value="credit"
                  defaultChecked
                />
                <label style={{ margin: "0 5px" }}>Credit Card</label>
                <button className="login-page-submit" type="submit">
                  Continue
                </button>
              </form>
            </div>
          )}
          {stage === "confirm" && (
            <div className="cart-screen">
              <div className="cart-section">
                <div className="cart-section-left">
                  <div className="confirm-address">
                    <div style={{ fontWeight: 700 }}>Shipping Address:</div>
                    <div>{name}</div>
                    <div>{address}</div>
                    <div>{city}</div>
                    <div>{postalCode}</div>
                    <div>{country}</div>
                    <div>{phone}</div>
                  </div>
                  <div className="confirm-address">
                    <div style={{ fontWeight: 700 }}>Payment Method:</div>
                    <div>Credit Card</div>
                  </div>
                  {renderProducts()}
                </div>
                <div className="cart-section-right">
                  <div className="cart-summary">
                    <div className="cart-summary-content">
                      <div className="cart-summary-title">Order Summary</div>
                      <div className="cart-summary-row">
                        <div>
                          <span style={{ fontWeight: 700 }}>Subtotal</span> (
                          {cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                          items)
                        </div>
                        <div style={{ fontWeight: 700 }}>
                          $
                          {Number(
                            cartItems
                              .reduce(
                                (acc, item) => acc + item.qty * item.price,
                                0
                              )
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
                              .reduce(
                                (acc, item) => acc + item.qty * item.price,
                                0
                              )
                              .toFixed(2)
                          ).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <button
                          className="main-product-btn checkout-btn"
                          onClick={confirmOrder}
                        >
                          <span>Confirm Order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
