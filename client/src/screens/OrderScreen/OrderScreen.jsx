import React, { useEffect } from "react";
import { PacmanLoader } from "react-spinners";
import { getOrderDetails } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./OrderScreen.css";

export default function OrderScreen({ match, history }) {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, order, userInfo, history]);

  const renderProducts = () => {
    return order.orderItems.map((item, i) => (
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

  return (
    <div className="order-screen">
      {loading ? (
        <div className="spinner">
          <PacmanLoader color={"#0046BE"} size={50} />
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <div className="cart-screen">
            <div className="order-number-title">Order {order._id}</div>
            <div className="cart-section">
              <div className="cart-section-left">
                <div className="confirm-address">
                  <div style={{ fontWeight: 700 }}>Shipping Address:</div>
                  <div>{order.shippingAddress.name}</div>
                  <div>{order.shippingAddress.address}</div>
                  <div>{order.shippingAddress.city}</div>
                  <div>{order.shippingAddress.postalCode}</div>
                  <div>{order.shippingAddress.country}</div>
                  <div>{order.shippingAddress.phone}</div>
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
                        <span style={{ fontWeight: 700 }}>Subtotal</span>
                      </div>
                      <div style={{ fontWeight: 700 }}>${order.totalPrice}</div>
                    </div>
                    <div className="cart-summary-row">
                      <div>Shipping & Handling</div>
                      <div style={{ color: "red" }}>FREE</div>
                    </div>
                    <div className="cart-summary-row">
                      <div>Tax</div>
                      <div>$0.00</div>
                    </div>
                    <div
                      className="cart-summary-row"
                      style={{ borderTop: "1px solid #d9d9d9" }}
                    ></div>
                    <div className="cart-summary-row summary-total">
                      <div>Total</div>
                      <div>${order.totalPrice}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
