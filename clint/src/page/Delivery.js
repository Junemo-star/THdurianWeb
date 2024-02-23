import React, { useEffect, useState } from "react";
import styles from "../css/CssDelivery.module.css";
import Footers from "../componet/Footerbar";
import axios from "axios";

function Delivery() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "your_jwt_token";

        const ordersResponse = await axios.get("http://localhost:1337/api/placed-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(ordersResponse.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

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