import React from "react";
import Img from "../variables";
import "../css/Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";

const Checkout = () => {
  const [{ basket, user }] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img className="checkout_ad" src={Img.checkoutBanner} alt="banner" />
        <div>
          <h3>{user ? (user.name ? user.name : user.email) : "Hello User"}</h3>
          <h2 className="checkout_title">Your Shopping Basket</h2>
          {basket.map((item) => {
            return (
              <CheckoutProduct
                key={Math.random() * 100}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            );
          })}
        </div>
      </div>

      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
