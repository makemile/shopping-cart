import { Button } from "react-bootstrap";
import React, { useState } from "react";
import "./Cart.scss";
import { ReactComponent as CartEmpty } from "../assets/svg/cart-empty.svg";
import { ReactComponent as CartFull } from "../assets/svg/cart-full.svg";
import { ReactComponent as Close } from "../assets/svg/close.svg";
import { ReactComponent as Garbage } from "../assets/svg/garbage.svg";
import { STORAGE_PRODUCTS_CART } from "../../utils/constants";

const Cart = (props) => {
  const { idProductCart, getProductCart } = props;
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

  const emtypCart = () =>{
    localStorage.removeItem(STORAGE_PRODUCTS_CART);
    getProductCart();
  }
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
        <CartContentHeader closeCart={closeCart} emtypCart={emtypCart}/>
      </div>
    </>
  );
};

function CartContentHeader(props) {
  const {closeCart, emtypCart} = props;

  return (
    <div className="cart-content__header">
      <div>
        <Close onClick={closeCart}/>
        <h2>carrito</h2>
      </div>
      <Button variant="link">
        vaciar
        <Garbage onClick={emtypCart} />
      </Button>
    </div>
  );
}

export default Cart;
