import TopMenu from "./components/TopMenu/TopMenu";
import useFecth from "./hooks/useFetch";
import Products from "./components/products/Products";
import { ToastContainer, toast } from "react-toastify";
import { urlApiProducts } from "./utils/constants";
import { STORAGE_PRODUCTS_CART } from "./utils/constants";
import { useState, useEffect } from "react";

const App = () => {
  const products = useFecth(urlApiProducts, null);
  const [productCart,setproductCart] = useState([]);

  useEffect(() => {
    getProductCart();
  }, []);

  const getProductCart = () => {
    const idProduct = localStorage.getItem(STORAGE_PRODUCTS_CART);

    if (idProduct) {
      const idProductSplit = idProduct.split(",");
     setproductCart(idProductSplit);
    } else {
     setproductCart([]);
    }
  };

  const addProductCart = (id, name) => {
    const idProduct = productCart;
    idProduct.push(id);
   setproductCart(idProduct);
    localStorage.setItem(STORAGE_PRODUCTS_CART, productCart);
    getProductCart();

    toast.success(`${name} añadido al carrito`);
  };

  return (
    <div className="App">
      <TopMenu
        productCart={productCart}
        getProductCart={getProductCart}
        products={products}
      />
      <Products products={products} addProductCart={addProductCart} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
};

export default App;
