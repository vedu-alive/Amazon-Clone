import React from "react";
import "../css/Product.css";
import { useStateValue } from "./StateProvider";

const Products = ({ id, title, price, image, rating }) => {
  const [, dispatch] = useStateValue();

  // console.log("basket>>>", basket);

  function addToBasket() {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        price: price,
        image: image,
        rating: rating,
      },
    });
  }

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={Math.random() * 10}>⭐</p>
            ))}
        </div>
      </div>
      <img className="product_image" src={image} alt="productImage" />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};

export default Products;
