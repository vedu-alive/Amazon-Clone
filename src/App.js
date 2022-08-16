import "./App.css";
import Header from "./components/Header.js";
import Checkout from "./components/Checkout";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CartCheckout from "./components/CartCheckout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders";

const statePromise = loadStripe(
  "pk_test_51LWJnxSDgSbVt4hkLLcmiAesGppd7zq1ozr2btMNrkJuyzt78pdtydCVOBq9KpfWeNh9lCt9LiXMxyfTASzYvwWk00b6IkE07h"
);

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/checkout"
            element={
              <div>
                <Header />
                <Elements stripe={statePromise}>
                  <CartCheckout />
                </Elements>
              </div>
            }
          />
          <Route
            path="/orders"
            element={
              <div>
                <Header />
                <Orders />
              </div>
            }
          />
          <Route
            path="/cart"
            element={
              <div>
                <Header />
                <Checkout />
              </div>
            }
          />
          <Route path="/signin" element={<Login />} />
          <Route path="/*" element={<h2>Error 404 Page not found!</h2>} />
          <Route
            path="/"
            element={
              <div>
                <Header />
                <Home />
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
