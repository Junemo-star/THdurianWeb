import React, { useEffect, useState } from "react";
import styles from "../css/CssDelivery.module.css";
import Footers from "../componet/Footerbar";
import { useAuth } from '../componet/AuthContext';
import Stack from 'react-bootstrap/Stack';
import axios from "axios";

const Delivery = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth(); 

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
                <br/>
                <Stack gap={2}>
                <div>{order.attributes.status === 'Packaging' ? <img src="packing.png" className={styles.userimg} style={{ layout: "fill" }} /> : null} </div>
                {order.attributes.status === 'Complete' ? (
                  <>
                  <img src="packing.png" className={styles.userimg} style={{ layout: "fill" }} />
                  <img src="car.png" className={styles.userimg} style={{ layout: "fill" }} />
                  </>
                ) : null}
                  
                </Stack>
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