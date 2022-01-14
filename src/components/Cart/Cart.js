import { Button } from "react-bootstrap";
import React, { useState } from "react";
import "./Cart.scss";
import { ReactComponent as CartEmpty } from "../assets/svg/cart-empty.svg";
import { ReactComponent as CartFull } from "../assets/svg/cart-full.svg";
import { ReactComponent as Close } from "../assets/svg/close.svg";
import { ReactComponent as Garbage } from "../assets/svg/garbage.svg";

const Cart = (props) => {
  const { idProductCart } = props;
  const [cartOpen, setCartOpen] = useState(false);

  const widthCartContent = cartOpen ? 250 : 0;

  console.log(idProductCart);

  const openCart = () => {
    setCartOpen(true);

    document.body.style.overflow = "hidden";
  };

  const closeCart = () => {
    setCartOpen(false);
    document.body.style.overflow = "scroll";
  };
  return (
    <>
      <Button variant="link" className="cart">
        {idProductCart.length > 0 ? (
          <CartFull onClick={openCart} />
        ) : (
          <CartEmpty onClick={openCart} />
        )}
      </Button>
      <div className="cart-content" style={{ width: widthCartContent }}>
        <CartContentHeader />
      </div>
    </>
  );
};

function CartContentHeader(props) {
  const {} = props;

  return (
    <div className="cart-content__header">
      <div>
        <Close />
        <h2>carrito</h2>
      </div>
      <Button variant="link">
        vaciar
        <Garbage />
      </Button>
    </div>
  );
}

export default Cart;
