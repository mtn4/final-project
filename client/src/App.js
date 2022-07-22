import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProductListScreen from "./screens/ProductListScreen/ProductListScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import AccountScreen from "./screens/AccountScreen/AccountScreen";
import CartScreen from "./screens/CartScreen/CartScreen";
import WishlistScreen from "./screens/WishlistScreen/WishlistScreen";
import CheckoutScreen from "./screens/CheckoutScreen/CheckoutScreen";
import OrderScreen from "./screens/OrderScreen/OrderScreen";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import "./App.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/products" exact component={ProductListScreen} />
          <Route path="/products/:name" component={ProductListScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/account" component={AccountScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/wishlist" exact component={WishlistScreen} />
          <Route path="/checkout" exact component={CheckoutScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/search/:keyword" exact component={SearchScreen} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
