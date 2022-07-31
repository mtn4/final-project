import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { FiAlertCircle } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import { IconContext } from "react-icons";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../../actions/productActions";
import Product from "../../components/Product/Product";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";
import "./AllProductsScreen.css";

export default function AllProductsScreen({ history, match }) {
  const [view, setView] = useState("list");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [cntInStock, setCntInStock] = useState(1);

  const createProductHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        image,
        brand,
        model,
        category,
        description,
        price,
        cntInStock,
      })
    );
  };

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.user.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      setView("list");
    }
    dispatch(listProducts());
  }, [dispatch, history, userInfo, successDelete, successCreate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const renderProducts = () => {
    return products.map((product, i) => (
      <Product
        key={i}
        id={product._id}
        name={product.name}
        price={product.price}
        cntInStock={product.cntInStock}
        category={product.category}
        brand={product.brand}
        createdAt={product.createdAt}
        deleteHandler={deleteHandler}
      />
    ));
  };

  return (
    <div className="users-screen">
      {loading || loadingDelete || loadingCreate ? (
        <div className="spinner">
          <PacmanLoader color={"#0046BE"} size={50} />
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          {view === "list" && (
            <>
              <div className="product-list-screen-category">
                <span>Products List</span>
                <IoIosAddCircle
                  color="green"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => setView("create")}
                />
              </div>
              {errorDelete && (
                <div className="login-screen-error">
                  <IconContext.Provider value={{ size: 24 }}>
                    <FiAlertCircle />
                    {errorDelete}
                  </IconContext.Provider>
                </div>
              )}
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Created At</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{renderProducts()}</tbody>
              </table>
            </>
          )}
          {view === "create" && (
            <>
              <div className="product-list-screen-category">
                <span>Create Product</span>
                <IoIosAddCircle
                  color="green"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => setView("list")}
                />
              </div>
              {errorCreate && (
                <div className="login-screen-error">
                  <IconContext.Provider value={{ size: 24 }}>
                    <FiAlertCircle />
                    {errorCreate}
                  </IconContext.Provider>
                </div>
              )}
              <div className="account-screen-content">
                <div className="update-profile-data">
                  <form onSubmit={createProductHandler}>
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
                      <label className="login-screen-label">
                        Count in Stock
                      </label>
                      <input
                        id="login-form-password"
                        className="login-screen-input"
                        type="number"
                        value={cntInStock}
                        onChange={(e) => setCntInStock(e.target.value)}
                      />
                    </div>
                    <button className="login-page-submit" type="submit">
                      Create Product
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
