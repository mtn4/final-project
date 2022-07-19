import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { myApi } from "../../api/api";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import "./AccountScreen.css";

export default function AccountScreen({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showFile, setShowFile] = useState(false);
  const [file, setFile] = useState("");
  const [view, setView] = useState("profile");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("me"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      myApi(userInfo.token)
        .post("/users/me/avatar", formData, config)
        .then((response) => {
          alert("The file is successfully uploaded");
        })
        .catch((error) => {
          alert("Error, please try again");
        });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let updates = {};
    if (name) {
      updates.name = name;
    }
    if (email) {
      updates.email = email;
    }
    if (password) {
      updates.password = password;
    }
    dispatch(updateUserProfile(updates));
  };

  return (
    <div className="account-screen">
      {loading ? (
        <div className="spinner">
          <PacmanLoader color={"#0046BE"} size={50} />
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <div className="account-screen-hello">Hello, {user.name}</div>
          <div className="account-screen-avatar">
            {user.avatar ? (
              <img
                src={`data:image/png;base64,${user.avatar.toString("base64")}`}
                alt=""
              />
            ) : (
              <img src="avatar.png" alt="" />
            )}
          </div>
          <div className="account-screen-change-avatar">
            {showFile ? (
              <form onSubmit={onFormSubmit}>
                <input
                  type="file"
                  name="avatar"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit">Upload</button>
              </form>
            ) : (
              <button
                className="change-avatar-btn"
                onClick={(e) => setShowFile(true)}
              >
                Change profile photo
              </button>
            )}
          </div>
          <div className="account-screen-navigation">
            <span
              className={view === "profile" ? "navigation-active" : ""}
              onClick={(e) => setView("profile")}
            >
              Update Profile
            </span>
            <span
              className={view === "orders" ? "navigation-active" : ""}
              onClick={(e) => setView("orders")}
            >
              My Orders
            </span>
          </div>
          <div className="account-screen-content">
            {view === "profile" && (
              <>
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
                    <div className="login-screen-form-group">
                      <label className="login-screen-label">Password</label>
                      <input
                        id="login-form-password"
                        className="login-screen-input"
                        type="password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button className="login-page-submit" type="submit">
                      Update Profile
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
