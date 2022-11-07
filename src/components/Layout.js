import React from "react";
import Header from "./Header";
import Products from "./Products";
import {useSelector} from 'react-redux';
import "./Layout.css";
import CartItems from "./CartItems";
const Layout = () => {
  let total = 0;
  const showCart = useSelector((state)=> state.cart.showCart)
  const itemsList = useSelector((state)=>state.cart.itemsList)
  itemsList.forEach(element => {
    total += element.totalPrice;
  });
  return (
    <React.Fragment>
      <div className="layout">
        <Header />
        <Products />
        {showCart && <CartItems />}
        <div className="total-price">
          <h3>Total: ${total}</h3>
          <button className="orderBtn">Place Order</button>
        </div>{" "}
      </div>
    </React.Fragment>
  );
};

export default Layout;
