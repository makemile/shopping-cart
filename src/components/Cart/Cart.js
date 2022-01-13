import { Button } from "react-bootstrap";
import "./Cart.scss";
import { ReactComponent as CartEmpty } from "../assets/svg/cart-empty.svg";

const Cart = () => {
  return (
    <>
      <Button variant="link" className="cart">
        <CartEmpty />
      </Button>
      <div className="cart-content">todos mis productos</div>
    </>
  );
};

export default Cart;
