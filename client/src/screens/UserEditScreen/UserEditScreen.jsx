import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { FiAlertCircle } from "react-icons/fi";
import { IconContext } from "react-icons";
import { getUserDetails, updateUser } from "../../actions/userActions";
import { USER_UPDATE_RESET } from "../../constants/userConstants";
import "./UserEditScreen.css";

export default function UserEditScreen({ match, history }) {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userslist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(userId, { name, email, isAdmin }));
  };

  return (
    <div className="user-edit-screen">
      {loading || loadingUpdate ? (
        <div className="spinner">
          <PacmanLoader color={"#0046BE"} size={50} />
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <div className="product-list-screen-category">
            Edit User {user._id}
          </div>
          {errorUpdate && (
            <div className="login-screen-error">
              <IconContext.Provider value={{ size: 24 }}>
                <FiAlertCircle />
                {errorUpdate}
              </IconContext.Provider>
            </div>
          )}
          <div className="account-screen-content">
            <div className="update-profile-data">
              <form onSubmit={submitHandler}>
                <div className="login-screen-form-group">
                  <label className="login-screen-label">Full Name</label>
                  <input
                    id="login-form-password"
                    className="login-screen-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="login-screen-form-group">
                  <label className="login-screen-label">Email</label>
                  <input
                    id="login-form-email"
                    className="login-screen-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <br />
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label> Is Admin</label>
                <button className="login-page-submit" type="submit">
                  Update User
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
