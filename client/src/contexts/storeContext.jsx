import { createContext, useState } from "react";

export const storeContext = createContext();

function ContextProvider({ children }) {
  const [productsArr, setProductsArr] = useState([]);
  //   const [cartObj, setCartObj] = useState({ total: 0 });
  //   const [wishListObj, setWishListObj] = useState([]);
  //   const [ordersObj, setOrdersObj] = useState([]);
  //   const [cartTotal, setCartTotal] = useState("$0.00");
  //   useEffect(() => {
  //     const cartObjData = JSON.parse(localStorage.getItem("cartObj"));

  //     if (cartObjData) {
  //       setCartObj(cartObjData);
  //     }
  //   }, []);
  return (
    <storeContext.Provider
      value={{
        productsArr,
        setProductsArr,
      }}
    >
      {children}
    </storeContext.Provider>
  );
}

export default ContextProvider;
