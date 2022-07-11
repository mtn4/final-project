import React, { useRef, useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsChevronRight } from "react-icons/bs";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineHeart,
} from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { RiArrowUpSFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import "./Header.css";

export default function Header() {
  const [keyword, setKeyword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [hmenu, setHmenu] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const ref = useRef(null);
  const accountRef = useRef(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setHmenu(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <>
      <header>
        <div
          id="hmenu-container"
          style={{
            visibility: hmenu ? "visible" : "hidden",
            width: hmenu ? "100%" : "0",
          }}
        >
          <div id="hmenu-canvas-background"></div>
          <div
            id="hmenu-canvas"
            style={{ transform: hmenu ? "translateX(0)" : "translateX(-100%)" }}
            ref={ref}
          >
            <div className="menu-label">
              <p>Menu</p>
            </div>
            <Link to="/products" onClick={(e) => setHmenu(false)}>
              <div className="all-label">
                <span className="menu-list-item">All Products</span>
                <span>
                  <BsChevronRight />
                </span>
              </div>
            </Link>
            <div className="category-label">Shop By Category</div>
            <ul className="menu-list">
              <Link to="/products/audio" onClick={(e) => setHmenu(false)}>
                <li>
                  <span className="menu-list-item">Audio</span>
                  <span>
                    <BsChevronRight />
                  </span>
                </li>
              </Link>
              <Link to="/products/cellphones" onClick={(e) => setHmenu(false)}>
                <li>
                  <span className="menu-list-item">Cellphones</span>
                  <span>
                    <BsChevronRight />
                  </span>
                </li>
              </Link>
              <Link to="/products/computers" onClick={(e) => setHmenu(false)}>
                <li>
                  <span className="menu-list-item">Computers</span>
                  <span>
                    <BsChevronRight />
                  </span>
                </li>
              </Link>
              <Link to="/products/videogames" onClick={(e) => setHmenu(false)}>
                <li>
                  <span className="menu-list-item">Gaming</span>
                  <span>
                    <BsChevronRight />
                  </span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="bottom-container">
          <div className="bottom-container-content">
            <div className="hamburger-btn" onClick={(e) => setHmenu(true)}>
              <IconContext.Provider value={{ color: "white", size: 32 }}>
                <GiHamburgerMenu />
              </IconContext.Provider>
              <div className="hamburger-btn-menu">Menu</div>
            </div>
            <Link to="/">
              <div className="logo">
                <span>T</span>ECH<span>S</span>HOP
              </div>
            </Link>
            <div
              className={
                isFocused ? "search-bar search-bar-focused" : "search-bar"
              }
              style={
                isFocused
                  ? { boxShadow: "0 0 10px rgba(255, 255, 255, 1)" }
                  : { boxShadow: "none" }
              }
            >
              <IconContext.Provider value={{ size: 24 }}>
                <BiSearch />
              </IconContext.Provider>
              <input
                id="search-bar"
                type="search"
                placeholder={isFocused ? "" : "Search phones, computers & more"}
                onChange={(e) => setKeyword(e.target.value)}
                onFocus={(e) => setIsFocused(true)}
                onBlur={(e) => setIsFocused(false)}
              />
            </div>
            <div
              className="hamburger-btn"
              onClick={(e) => setAccountOpen(!accountOpen)}
              ref={accountRef}
            >
              <IconContext.Provider value={{ color: "white", size: 32 }}>
                {userInfo ? (
                  <AiOutlineUser />
                ) : (
                  <Link to="/login">
                    <AiOutlineUser />
                  </Link>
                )}
              </IconContext.Provider>
              <div className="hamburger-btn-menu">
                {userInfo ? (
                  `${userInfo.user.name}`
                ) : (
                  <Link to="/login">
                    <span style={{ color: "white" }}>Sign In</span>
                  </Link>
                )}
              </div>
              {userInfo ? (
                <>
                  <RiArrowUpSFill
                    className={accountOpen ? "arrow-up show" : "arrow-up"}
                  />
                  <div
                    id="myDropdown"
                    className={
                      accountOpen ? "dropdown-content show" : "dropdown-content"
                    }
                  >
                    <Link to="/account">Account Overview</Link>
                    <div onClick={logoutHandler}>Sign Out</div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            {userInfo ? (
              <Link to="/wishlist">
                <div className="hamburger-btn">
                  <IconContext.Provider value={{ color: "white", size: 32 }}>
                    <AiOutlineHeart />
                  </IconContext.Provider>
                  <div className="hamburger-btn-menu">Wishlist</div>
                </div>
              </Link>
            ) : (
              ""
            )}
            <Link to="/cart">
              <div className="hamburger-btn">
                <IconContext.Provider value={{ color: "white", size: 32 }}>
                  <AiOutlineShoppingCart />
                </IconContext.Provider>
                <div className="hamburger-btn-menu">Cart</div>
              </div>
            </Link>
          </div>
        </div>
      </header>
      <div style={{ height: 107 }}></div>
    </>
  );
}
