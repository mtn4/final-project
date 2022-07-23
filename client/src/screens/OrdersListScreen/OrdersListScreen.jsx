import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { listOrders } from "../../actions/orderActions";
import Order from "../../components/Order/Order";
import "./OrdersListScreen.css";

export default function OrdersListScreen({ history }) {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.user.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const renderOrders = () => {
    return orders.map((order, i) => (
      <Order
        key={i}
        id={order._id}
        name={order.shippingAddress.name}
        createdAt={order.createdAt}
        total={order.totalPrice}
      />
    ));
  };

  return (
    <div className="users-screen">
      {loading ? (
        <div className="spinner">
          <PacmanLoader color={"#0046BE"} size={50} />
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <div className="product-list-screen-category">Orders List</div>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderOrders()}</tbody>
          </table>
        </>
      )}
    </div>
  );
}
