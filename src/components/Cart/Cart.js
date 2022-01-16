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
  RemoveItemArray,
} from "../../utils/ArrayFunc";

const Cart = (props) => {
  const { productCart, getProductCart, products } = props;
  const [cartOpen, setCartOpen] = useState(false);
  const [singleCart, setSingleCart] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  useEffect(() => {
    const allProductId = RemoveArrayDuplicates(productCart);
    setSingleCart(allProductId);
  }, [productCart]);

  const widthCartContent = cartOpen ? 300 : 0;

  useEffect(() => {
    const productData = [];
    let totalPrice = 0;

    const allProductId = RemoveArrayDuplicates(productCart);
    allProductId.forEach((productId) => {
      const quantity = countDuplicatesItemArray(productId, productCart);
      const productValue = {
        id: productId,
        quantity: quantity,
      };
      productData.push(productValue);
    });
    if (!products.loading && products.result) {
      products.result.forEach((product) => {
        productData.forEach((item) => {
          if (product.id == item.id) {
            const totalValue = product.price + item.quantity;
            totalPrice = totalPrice + totalValue;
          }
        });
      });
    }
    setCartTotalPrice(totalPrice);
  }, [productCart, products]);

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

  const increaseQuantity = (id) => {
    const arrayItemCary = productCart;
    productCart.push(id);
    localStorage.setItem(STORAGE_PRODUCTS_CART, arrayItemCary);
    getProductCart();
  };

  const decreaseQuantity = (id) => {
    const arrayItemCary = productCart;
    const result = RemoveItemArray(arrayItemCary, id.toString());
    localStorage.setItem(STORAGE_PRODUCTS_CART, result);
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
        <div className="cart-content__products">
          {singleCart.map((idProductCart, index) => (
            <CartContentProduct
              key={index}
              products={products}
              idProductCart={idProductCart}
              idsProductsCart={productCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          ))}
        </div>
        <CartContentFooter cartTotalPrice={cartTotalPrice} />
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
    increaseQuantity,
    decreaseQuantity,
  } = props;

  if (!loading && result) {
    return result.map((product, index) => {
      if (idProductCart == product.id) {
        const quantity = countDuplicatesItemArray(product.id, idsProductsCart);
        return (
          <RenderProduct
            key={index}
            product={product}
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        );
      }
    });
  }
  return null;
}

function RenderProduct(props) {
  const { product, quantity, increaseQuantity, decreaseQuantity } = props;
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
            <Button onClick={() => increaseQuantity(product.id)}>+</Button>
            <Button onClick={() => decreaseQuantity(product.id)}>-</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartContentFooter(props) {
  const { cartTotalPrice } = props;
  return (
    <div className="cart-content__footer">
      <div>
        <p>Total:</p>
        <p>{cartTotalPrice.toFixed(2)}</p>
      </div>
      <Button>Tramitar</Button>
    </div>
  );
}
export default Cart;
