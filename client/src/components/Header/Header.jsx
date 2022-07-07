import React, { useState } from "react";
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineHeart,
} from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import "./Header.css";

export default function Header() {
  const [keyword, setKeyword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  return (
    <header>
      <div className="top-container">
        <div className="top-container-content">
          FREE Shipping on all orders!
        </div>
      </div>
      <div className="middle-container">
        <div className="middle-container-content">
          Get Cash Today for your Phones, Electronics & Games!
        </div>
      </div>
      <div className="bottom-container">
        <div className="bottom-container-content">
          <div className="hamburger-btn">
            <span>
              <IconContext.Provider value={{ size: 32 }}>
                <GiHamburgerMenu />
              </IconContext.Provider>
            </span>
            <span className="hamburger-btn-menu">Menu</span>
          </div>
          <div className="logo">
            <span>T</span>ECH<span>S</span>HOP
          </div>
          <div
            className={
              isFocused ? "search-bar search-bar-focused" : "search-bar"
            }
            style={
              isFocused
                ? { boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }
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
          <div className="hamburger-btn">
            <span>
              <IconContext.Provider value={{ size: 32 }}>
                <AiOutlineUser />
              </IconContext.Provider>
            </span>
            <span className="hamburger-btn-menu">Account</span>
          </div>
          <div className="hamburger-btn">
            <span>
              <IconContext.Provider value={{ size: 32 }}>
                <AiOutlineHeart />
              </IconContext.Provider>
            </span>
            <span className="hamburger-btn-menu">Wishlist</span>
          </div>
          <div className="hamburger-btn">
            <span>
              <IconContext.Provider value={{ size: 32 }}>
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
