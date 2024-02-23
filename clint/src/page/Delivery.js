import React, { useEffect, useState } from "react";
import styles from "../css/CssDelivery.module.css";
import Footers from "../componet/Footerbar";
import { useAuth } from '../componet/AuthContext';
import axios from "axios";

function Delivery() {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth(); // Get the JWT token from the AuthContext

  const fetchData = async () => {
    try {
      const ordersResponse = await axios.get("http://localhost:1337/api/placed-orders", token)
      setOrders(ordersResponse.data.data)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Include authToken in the dependency array

  return (
    <div className={styles.set_pos}>
      <div className={styles.box}>
        <div className={styles.text}>
          สถานะการจัดส่งสินค้า
          {orders.map((order) => (
            <div key={order.id} className={styles.inside_box}>
              <div className={styles.text2}>
                สวนนายดำ
                <br />
                จำนวน : {order.attributes.amount}
                <br />
                ราคา : {order.attributes.price}
                <br />
                สถานะ : {order.attributes.status}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footers />
    </div>
  );
}

export default Delivery;