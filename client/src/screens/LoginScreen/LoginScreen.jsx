import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { login } from "../../actions/userActions";
import { FiAlertCircle } from "react-icons/fi";
import { IconContext } from "react-icons";
import "./LoginScreen.css";

export default function LoginScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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
          <div className="login-screen-welcome">Welcome to TechShop</div>
          <div className="login-screen-message">
            Sign in to your TechShop account
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
              <label className="login-screen-label" for="login-form-email">
                Email
              </label>
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
              <label className="login-screen-label" for="login-form-password">
                Password
              </label>
              <input
                id="login-form-password"
                className="login-screen-input"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="login-page-submit" type="submit">
              Sign In
            </button>
          </form>
          <div className="login-screen-separator">
            <span>OR</span>
          </div>
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            <button
              className="login-page-submit login-page-create"
              type="submit"
            >
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
