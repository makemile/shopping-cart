import TopMenu from "./components/TopMenu/TopMenu";
import useFecth from "./hooks/useFetch";
import Products from "./components/products/Products";
import { ToastContainer, toast } from "react-toastify";
import { urlApiProducts } from "./utils/constants";
import { STORAGE_PRODUCTS_CART } from "./utils/constants";
import { useState } from "react";

const App = () => {
  const products = useFecth(urlApiProducts, null);
  const [idProduct, setIdiProduct] = useState([]);

  const addProductCart = (id, name) => {
    const productId = idProduct;
    productId.push(id);
    setIdiProduct(productId);
    localStorage.setItem(STORAGE_PRODUCTS_CART, productId);

    toast.success(`${name} añadido al carrito`);
  };

  return (
    <div className="App">
      <TopMenu />
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
