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
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [keyword, setKeyword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [hmenu, setHmenu] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const ref = useRef(null);
  const accountRef = useRef(null);
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
  if (keyword) {
    console.log("ds");
  }
  return (
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
              <span>All Products</span>
              <span>
                <BsChevronRight />
              </span>
            </div>
          </Link>
          <div className="category-label">Shop By Category</div>
          <ul className="menu-list">
            <li>
              <span>Audio</span>
              <span>
                <BsChevronRight />
              </span>
            </li>
            <li>
              <span>Cellphones</span>
              <span>
                <BsChevronRight />
              </span>
            </li>
            <li>
              <span>Computers</span>
              <span>
                <BsChevronRight />
              </span>
            </li>
            <li>
              <span>Gaming</span>
              <span>
                <BsChevronRight />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottom-container">
        <div className="bottom-container-content">
          <div className="hamburger-btn" onClick={(e) => setHmenu(true)}>
            <span>
              <IconContext.Provider value={{ color: "white", size: 32 }}>
                <GiHamburgerMenu />
              </IconContext.Provider>
            </span>
            <span className="hamburger-btn-menu">Menu</span>
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
            <span>
              <IconContext.Provider value={{ color: "white", size: 32 }}>
                <AiOutlineUser />
              </IconContext.Provider>
            </span>
            <span className="hamburger-btn-menu">Account</span>
            <div
              id="myDropdown"
              className={
                accountOpen ? "dropdown-content show" : "dropdown-content"
              }
            >
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="hamburger-btn">
            <span>
              <IconContext.Provider value={{ color: "white", size: 32 }}>
                <AiOutlineHeart />
              </IconContext.Provider>
            </span>
            <span className="hamburger-btn-menu">Wishlist</span>
          </div>
          <div className="hamburger-btn">
            <span>
              <IconContext.Provider value={{ color: "white", size: 32 }}>
                <AiOutlineShoppingCart />
              </IconContext.Provider>
            </span>
            <span className="hamburger-btn-menu">Cart</span>
          </div>
        </div>
      </div>
    </header>
  );
}
