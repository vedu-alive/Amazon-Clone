import React, { useEffect, useState } from "react";
import { db, onSnapshot, collection, orderBy, query } from "../Firebase";
// import { paymentID } from "./CartCheckout";

import Order from "./Order";
import { useStateValue } from "./StateProvider";

const Orders = () => {
  const [{ basket, user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const userId = (user?.uid).toString();
      const q = query(
        collection(db, "users", userId, "orders"),
        orderBy("created", "desc")
      );

      const getUser = async () => {
        onSnapshot(q, (querySnapshot) => {
          //   console.log(querySnapshot.docs.data());
          setOrders(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
      };

      getUser();
    } else {
      setOrders([]);
    }
  }, []);

  console.log(orders);
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders_order">
        {orders.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
