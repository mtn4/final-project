import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listWishlistProducts } from "../../actions/wishlistActions";
import { PacmanLoader } from "react-spinners";
import { IconContext } from "react-icons";
import { FaTh, FaThList } from "react-icons/fa";
import ProductListView from "../../components/ProductListView/ProductListView";
import ProductGridView from "../../components/ProductGridView/ProductGridView";
import "./WishlistScreen.css";

export default function WishlistScreen() {
  const [view, setView] = useState("list");
  const [sort, setSort] = useState("0");
  const dispatch = useDispatch();
  const wishlistList = useSelector((state) => state.wishlistList);
  const { loading, products, error } = wishlistList;
  useEffect(() => {
    dispatch(listWishlistProducts());
  }, [dispatch]);
  const renderListProducts = () => {
    return products
      .sort((a, b) => {
        if (sort === "1")
          return a.product.name.toLowerCase() < b.product.name.toLowerCase();
        if (sort === "2") return a.product.price - b.product.price;
        if (sort === "3") return b.product.price - a.product.price;
        if (sort === "4") return b.product.numReviews - a.product.numReviews;
        else return b.product.name.toLowerCase() < a.product.name.toLowerCase();
      })
      .map((elem, i) => (
        <ProductListView
          key={i}
          id={elem.product._id}
          image={elem.product.image}
          name={elem.product.name}
          brand={elem.product.brand}
          model={elem.product.model}
          category={elem.product.category}
          description={elem.product.description}
          price={elem.product.price}
          rating={elem.product.rating}
          numReviews={elem.product.numReviews}
          cntInStock={elem.product.cntInStock}
        />
      ));
  };
  const renderGridProducts = () => {
    return products
      .sort((a, b) => {
        if (sort === "1")
          return a.product.name.toLowerCase() < b.product.name.toLowerCase();
        if (sort === "2") return a.product.price - b.product.price;
        if (sort === "3") return b.product.price - a.product.price;
        if (sort === "4") return b.product.numReviews - a.product.numReviews;
        else return b.product.name.toLowerCase() < a.product.name.toLowerCase();
      })
      .map((elem, i) => (
        <ProductGridView
          key={i}
          id={elem.product._id}
          image={elem.product.image}
          name={elem.product.name}
          brand={elem.product.brand}
          model={elem.product.model}
          category={elem.product.category}
          description={elem.product.description}
          price={elem.product.price}
          rating={elem.product.rating}
          numReviews={elem.product.numReviews}
          cntInStock={elem.product.cntInStock}
        />
      ));
  };
  return (
    <div className="product-list-screen">
      {loading ? (
        <div className="spinner">
          <PacmanLoader color={"#0046BE"} size={50} />
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <div className="product-list-screen-left">
            <div className="left-nav" style={{ height: 1000 }}></div>
          </div>
          <div className="product-list-screen-right">
            <div className="product-list-screen-category">Wishlist</div>
            <div className="list-tools-bar">
              <div className="list-tools-bar-first">
                <div className="list-sort">
                  <div>Sort By:</div>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="0">Product Name A - Z</option>
                    <option value="1">Product Name Z - A</option>
                    <option value="2">Lowest Price</option>
                    <option value="3">Highest Price</option>
                    <option value="4">Most Reviews</option>
                  </select>
                </div>
                <div className="list-tool-view">
                  <IconContext.Provider value={{ size: 16 }}>
                    <div className="btn-group">
                      <div className="btn-group-cell">
                        <button
                          style={{
                            backgroundColor:
                              view === "list" ? "#707070" : "white",
                          }}
                          onClick={(e) => setView("list")}
                        >
                          <FaThList
                            style={{
                              color: view === "list" ? "white" : "black",
                            }}
                          />
                        </button>
                      </div>
                      <div className="btn-group-cell">
                        <button
                          style={{
                            backgroundColor:
                              view === "grid" ? "#707070" : "white",
                          }}
                          onClick={(e) => setView("grid")}
                        >
                          <FaTh
                            style={{
                              color: view === "grid" ? "white" : "black",
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </IconContext.Provider>
                </div>
              </div>
            </div>
            <div className="items-list-container">
              {view === "list" ? (
                renderListProducts()
              ) : (
                <div className="product-grid-view">{renderGridProducts()}</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
