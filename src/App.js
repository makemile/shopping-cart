import TopMenu from "./components/TopMenu/TopMenu";
import useFecth from "./hooks/useFetch";
import Products from "./components/products/Products";
import { urlApiProducts } from "./utils/constants";

const App = () => {
  const products = useFecth(urlApiProducts, null);

  return (
    <div className="App">
      <TopMenu />
      <Products products={products} />
    </div>
  );
};

export default App;
