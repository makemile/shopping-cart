import { Container, Row } from "react-bootstrap";

const Products = (props) => {
  const {
    products: { loading, result, error },
  } = props;

  console.log(props);
  return (
    <Container>
      <Row>
        {loading || !result === true
          ? "cargando"
          : result.map((product, index) => (
              <div key={index}>
                <p>{product.name}</p>
              </div>
            ))}
      </Row>
    </Container>
  );
};

export default Products;
