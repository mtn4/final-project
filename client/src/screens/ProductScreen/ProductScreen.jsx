import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productActions";
import { PacmanLoader } from "react-spinners";
import "./ProductScreen.css";

export default function ProductScreen({ match }) {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);
  const renderProduct = () => {
    return <div>{product.name}</div>;
  };
  return (
    <div className="product-screen margin">
      {loading ? (
        <div className="spinner">
          <PacmanLoader color={"#0046BE"} size={50} />
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        renderProduct()
      )}
    </div>
  );
}
