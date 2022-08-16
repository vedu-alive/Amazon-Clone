import { auth, onAuthStateChanged } from "../Firebase";
import React, { useEffect } from "react";
import "../css/Home.css";
import Img from "../variables";
import Products from "./Products";
import { useStateValue } from "./StateProvider";
// import FlipMove from "react-flip-move";

function Home() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      console.log(authUser);

      if (authUser) {
        //if user just logged in or if he was login before
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //user logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <div className="home">
      <div className="home_container">
        <img className="home_image" src={Img.bgLogo} alt="bgImage" />

        <div className="home_row">
          <Products
            key="01"
            id="123523"
            title="The Lean Startup"
            price={299.23}
            image={Img.leanStartup}
            rating={3}
          />
          <Products
            key="02"
            id="49538"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook & Whisk"
            price={769.53}
            image={Img.KmixMixer}
            rating={4}
          />
        </div>

        <div className="home_row">
          <Products
            key="03"
            id="271298"
            title="realme Buds Q2 Bluetooth Truly Wireless in Ear Earbuds with Mic (Active Black)"
            image={Img.realme}
            price={1993.0}
            rating={4}
          />
          <Products
            key="04"
            id="123250"
            title="Amazon Echo 4th Gen Alexa Built-In Smart Wi-Fi Speaker (Premium Dolby Sound, B085HK322L, Black)"
            price={4999.0}
            image={Img.amazonEcho}
            rating={4}
          />
          <Products
            key="05"
            id="32543"
            title="Apple iPad Pro with Apple M1 chip (11-inch/27.96 cm, Wi-Fi, 128GB) - Space Grey (3rd Generation)"
            price={67390.0}
            image={Img.iPad}
            rating={5}
          />
        </div>

        <div className="home_row">
          <Products
            key="06"
            id="23445"
            title="86cm (34 inch) Gaming Monitor with WQHD resolution"
            price={44499.0}
            image={Img.samsung}
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
