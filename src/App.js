import TopMenu from "./components/TopMenu/TopMenu";
import useFecth from "./hooks/useFetch";
import { urlApiProducts } from "./utils/constants";

const App =() => {

    const result = useFecth(urlApiProducts);
    console.log(result);

    

  return (
    <div className="App">
      <TopMenu/>
     
    </div>
  );
}

export default App;
