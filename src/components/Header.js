import React from "react";
import "../css/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Img from "../variables";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "../Firebase";

function Header() {
  const [{ basket, user }] = useStateValue();
  // console.log(user.email);
  const userAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  // console.log("header basket value>>>", basket);

  return (
    <div className="header">
      <Link to="/">
        <img className="header_logo" src={Img.amazonLogo} alt="amazon logo" />
      </Link>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="search_icon" />
      </div>

      <div className="header_nav">
        <Link to={!user && "/signin"} onClick={userAuthentication}>
          <div className="header_option">
            <span className="header_optionLineOne">
              {user ? user.email : "Hello Guest"}
            </span>
            <span className="header_optionLineTwo">
              {" "}
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header_option">
            <span className="header_optionLineOne"> Returns</span>
            <span className="header_optionLineTwo"> & Orders</span>
          </div>
        </Link>

        <div className="header_option">
          <span className="header_optionLineOne"> Your</span>
          <span className="header_optionLineTwo"> Prime</span>
        </div>
        <Link to="/cart">
          <div className="header_optionBasket">
            <AddShoppingCartIcon />
            <span className="header_optionLineTwo header_basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
