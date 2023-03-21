import React from "react";
import "./Checkout.css";
import CheckoutImg from "../../images/checkoutAd.jpg";
import { useAuth } from "../../contecxt/GlobalState";
import Subtotal from "../subtotal/Subtotal"
import CheckoutProduct from "../checkoutProduct/CheckoutProduct";

const Checkout = () => {
  const { user, basket } = useAuth();
  return (
    <div className="checkout">
      <div className="checkout-left">
        <img className="checkout-ad " src={CheckoutImg} />
        <h3>Hello,<br/>{user?.email}</h3>
        <h3 className="checkout-title">Your Shopping Basket</h3>
       {
        basket.length > 0 ?
        (basket.map((item) => (
          <CheckoutProduct
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            rating={item.rating}
          />
        ))) : (<p> you have no items in your basket.to buy one or more items, click"Add to basket".</p>)
       }
      </div>
      <div className="checkout-right"><Subtotal/></div>
    </div>
  );
};

export default Checkout;
