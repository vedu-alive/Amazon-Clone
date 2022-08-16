import React, { useEffect, useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import "../css/CartCheckout.css";
import { useNavigate, NavLink } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "../axios";
import { db, doc, setDoc } from "../Firebase";
let paymentID;
const CartCheckout = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //creates client stripe secret for transactions(basically the billing amount)
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //currencies must be in sub units as it expects to be in subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });

      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  // console.log("secret key>>>", clientSecret);

  const handleSubmit = async (event) => {
    //stripe functionality
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // console.log(paymentIntent);
        paymentID = paymentIntent.id.toString();
        const docData = {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        };
        const userId = user?.uid;
        const paymentId = paymentIntent.id;
        setDoc(
          doc(db, "users", userId.toString(), "orders", paymentId.toString()),
          docData
        );

        //checks for payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders");
      });
  };

  const handleChange = (event) => {
    //Listen for changes in the CardElement
    //and display any error as the customer types their card details

    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="cartCheckout">
      <div className="cartCheckout_container">
        <h1>
          Checkout (<NavLink to="/cart">{basket?.length} items</NavLink>)
        </h1>
        <div className="cartCheckout_section">
          <div className="cartCheckout_title">
            <h3>Delivery Address</h3>
          </div>

          <div className="cartCheckout_address">
            <p>{user ? user.email : "Guest User"}</p>
            <p>aidufeuofbl, fwfw</p>
            <p>wjrl jgwrij 2232</p>
          </div>
        </div>
        <div className="cartCheckout_section">
          <div className="cartCheckout_title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="cartCheckout_items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="cartCheckout_section">
          <div className="cartCheckout_title">
            <h3>Payment Method</h3>
          </div>
          <div className="cartCheckout_payment">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="cartCheckout_price">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
// eslint-disable-next-line no-undef

export { paymentID };
export default CartCheckout;
