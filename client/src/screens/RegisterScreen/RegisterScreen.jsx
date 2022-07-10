import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { FiAlertCircle } from "react-icons/fi";
import { IconContext } from "react-icons";
import { register } from "../../actions/userActions";
import "./RegisterScreen.css";

export default function RegisterScreen({ location, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <>
      {loading && (
        <div className="spinner">
          <PacmanLoader color={"#0046BE"} size={50} />
        </div>
      )}
      <div className="login-screen">
        <div className="login-screen-container">
          <div className="login-screen-welcome">Create Account</div>
          <div className="login-screen-message">
            Create your TechShop account
          </div>
          {error && (
            <div className="login-screen-error">
              <IconContext.Provider value={{ size: 24 }}>
                <FiAlertCircle />
                {error}
              </IconContext.Provider>
            </div>
          )}
          <form onSubmit={submitHandler}>
            <div className="login-screen-form-group">
              <label className="login-screen-label">Full Name</label>
              <input
                id="login-form-password"
                className="login-screen-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
                required
              />
            </div>
            <div className="login-screen-form-group">
              <label className="login-screen-label">Password</label>
              <input
                id="login-form-password"
                className="login-screen-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="login-page-submit" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
