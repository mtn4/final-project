import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { FiAlertCircle } from "react-icons/fi";
import { IconContext } from "react-icons";
import {
  listProductDetails,
  updateProduct,
} from "../../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";

import "./ProductEditScreen.css";

export default function ProductEditScreen({ match, history }) {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [cntInStock, setCntInStock] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setModel(product.model);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCntInStock(product.cntInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct(productId, {
        name,
        model,
        price,
        image,
        brand,
        category,
        description,
        cntInStock,
      })
    );
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
            Edit Product {productId}
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
                  <label className="login-screen-label">Name</label>
                  <input
                    id="login-form-password"
                    className="login-screen-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="login-screen-form-group">
                  <label className="login-screen-label">Image Link</label>
                  <input
                    id="login-form-password"
                    className="login-screen-input"
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="login-screen-form-group">
                  <label className="login-screen-label">Brand</label>
                  <input
                    id="login-form-password"
                    className="login-screen-input"
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="login-screen-form-group">
                  <label className="login-screen-label">Model</label>
                  <input
                    id="login-form-password"
                    className="login-screen-input"
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                </div>
                <div className="login-screen-form-group">
                  <label className="login-screen-label">Category</label>
                  <input
                    id="login-form-password"
                    className="login-screen-input"
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="login-screen-form-group">
                  <label className="login-screen-label">Description</label>
                  <textarea
                    id="login-form-password"
                    className="login-screen-input"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="login-screen-form-group">
                  <label className="login-screen-label">Price</label>
                  <input
                    id="login-form-password"
                    className="login-screen-input"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="login-screen-form-group">
                  <label className="login-screen-label">Count in Stock</label>
                  <input
                    id="login-form-password"
                    className="login-screen-input"
                    type="number"
                    value={cntInStock}
                    onChange={(e) => setCntInStock(e.target.value)}
                  />
                </div>
                <button className="login-page-submit" type="submit">
                  Update Product
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
