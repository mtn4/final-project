import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import { PacmanLoader } from "react-spinners";
import { IconContext } from "react-icons";
import { FaTh, FaThList } from "react-icons/fa";
import ProductListView from "../../components/ProductListView/ProductListView";
import ProductGridView from "../../components/ProductGridView/ProductGridView";
import "./ProductListScreen.css";

export default function ProductListScreen() {
  const [view, setView] = useState("list");
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  const renderListProducts = () => {
    return products.map((product, i) => (
      <ProductListView
        key={i}
        id={product._id}
        image={product.image}
        name={product.name}
        brand={product.brand}
        model={product.model}
        category={product.category}
        description={product.description}
        price={product.price}
        rating={product.rating}
        numReviews={product.numReviews}
        cntInStock={product.cntInStock}
      />
    ));
  };
  const renderGridProducts = () => {
    return products.map((product, i) => (
      <ProductGridView
        key={i}
        id={product._id}
        image={product.image}
        name={product.name}
        brand={product.brand}
        model={product.model}
        category={product.category}
        description={product.description}
        price={product.price}
        rating={product.rating}
        numReviews={product.numReviews}
        cntInStock={product.cntInStock}
      />
    ));
  };
  return (
    <div className="product-list-screen margin">
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
            <div className="product-list-screen-category">All Products</div>
            <div className="list-tools-bar">
              <div className="list-tools-bar-first">
                <div>dasdas</div>
                <div>dasdas</div>
              </div>
              <div className="list-tools-bar-second">
                <div>dasdas</div>
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