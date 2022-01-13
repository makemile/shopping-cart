import { Container, Row } from "react-bootstrap";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";

const Products = (props) => {
  const {
    products: { loading, result, error },
  } = props;

  
  return (
    <Container>
      <Row>
        {loading || !result === true ? (
          <Loading />
        ) : (
          result.map((product, index) => 
           
              <Product key={index} product={product} />)
        )}
      </Row>
    </Container>
  );
};

export default Products;
