import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "./Cart.scss";
import { ReactComponent as CartEmpty } from "../assets/svg/cart-empty.svg";
import { ReactComponent as CartFull } from "../assets/svg/cart-full.svg";
import { ReactComponent as Close } from "../assets/svg/close.svg";
import { ReactComponent as Garbage } from "../assets/svg/garbage.svg";
import { STORAGE_PRODUCTS_CART } from "../../utils/constants";
import {
  countDuplicatesItemArray,
  RemoveArrayDuplicates,
} from "../../utils/ArrayFunc";

const Cart = (props) => {
  const { productCart, getProductCart, products } = props;
  const [cartOpen, setCartOpen] = useState(false);
  const [singleCart, setSingleCart] = useState([]);

  useEffect(() => {
    const allProductId = RemoveArrayDuplicates(productCart);
    setSingleCart(allProductId);
  }, [productCart]);

  const widthCartContent = cartOpen ? 300 : 0;

  const openCart = () => {
    setCartOpen(true);

    document.body.style.overflow = "hidden";
  };

  const closeCart = () => {
    setCartOpen(false);
    document.body.style.overflow = "scroll";
  };

  const emtypCart = () => {
    localStorage.removeItem(STORAGE_PRODUCTS_CART);
    getProductCart();
  };
  return (
    <>
      <Button variant="link" className="cart">
        {productCart.length > 0 ? (
          <CartFull onClick={openCart} />
        ) : (
          <CartEmpty onClick={openCart} />
        )}
      </Button>
      <div className="cart-content" style={{ width: widthCartContent }}>
        <CartContentHeader closeCart={closeCart} emtypCart={emtypCart} />
        {singleCart.map((idProductCart, index) => (
          <CartContentProduct
            key={index}
            products={products}
            idProductCart={idProductCart}
            idsProductsCart={productCart}
          />
        ))}
      </div>
    </>
  );
};

function CartContentHeader(props) {
  const { closeCart, emtypCart } = props;

  return (
    <div className="cart-content__header">
      <div>
        <Close onClick={closeCart} />
        <h2>carrito</h2>
      </div>
      <Button variant="link">
        vaciar
        <Garbage onClick={emtypCart} />
      </Button>
    </div>
  );
}

function CartContentProduct(props) {
  const {
    products: { loading, result },
    idsProductsCart,
    idProductCart,
  } = props;
  

  if (!loading && result) {
    return result.map((product, index) => {
      if (idProductCart == product.id) {
        const quantity = countDuplicatesItemArray(
          product.id,
          idsProductsCart
        );
        return (
          <RenderProduct key={index} product={product} quantity={quantity} />
        );
      }
    });
  }
}

function RenderProduct(props) {
  const { product, quantity } = props;
  return (
    <div className="cart-content__product">
      <div className="cart-content__product-info">
        <div>
          <h3>{product.name.substr(0, 15)}</h3>
          <p>{product.price.toFixed(2)} s/ ud</p>
        </div>
        <div>
          <p>{quantity}ud</p>
          <div>
            <Button>+</Button>
            <Button>-</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
