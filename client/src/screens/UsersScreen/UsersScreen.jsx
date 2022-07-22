import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { listUsers } from "../../actions/userActions";
import User from "../../components/User/User";
import "./UsersScreen.css";

export default function UsersScreen({ history }) {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.user.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const renderUsers = () => {
    return users.map((user, i) => (
      <User
        key={i}
        id={user._id}
        name={user.name}
        email={user.email}
        admin={user.isAdmin}
        createdAt={user.createdAt}
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
          <div className="product-list-screen-category">Users List</div>
          <table className="orders-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>EMAIL</th>
                <th>Admin</th>
                <th>Created At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderUsers()}</tbody>
          </table>
        </>
      )}
    </div>
  );
}
