import TopMenu from "./components/TopMenu/TopMenu";
import useFecth from "./hooks/useFetch";
import Products from "./components/products/Products";
import { urlApiProducts } from "./utils/constants";
import { STORAGE_PRODUCTS_CART } from "./utils/constants";
import { useState } from "react";

const App = () => {
  const products = useFecth(urlApiProducts, null);
  const [idProduct, setIdiProduct] = useState([]);

  const addProductCart = (id, name) => {
   const productId = idProduct;
   productId.push(id);
   setIdiProduct(productId)
   localStorage.setItem(STORAGE_PRODUCTS_CART, productId);

   console.log("producto añadido")
    
  }
 

  return (
    <div className="App">
      <TopMenu />
      <Products products={products} addProductCart={addProductCart} />
    </div>
  );
};

export default App;
