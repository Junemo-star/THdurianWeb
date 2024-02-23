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
            <div className={styles.inside_box} key={order.id}> {/* Add the unique key here */}
              <div className="row">
                <div className="col-md-6">
                  <div className={styles.text2}>
                    <p>สวนนายดำ</p>
                    <p>จำนวน : {order.attributes.amount}</p>
                    <p>ราคา : {order.attributes.price}</p>
                    <p>สถานะ : {order.attributes.status}</p>
                  </div>
                </div>
                <div className="col-md-6">
                <Stack gap={2} >
                  {order.attributes.status === 'Packaging' ? (
                    <Stack direction="horizontal" gap={2}>
                      <div><img src="packing.png" className={styles.packimg} style={{ layout: "fill" }} /></div>
                      <div className={styles.text2}>
                        <p>กำลังจัดเตรียมสินค้า</p>
                      </div>
                    </Stack>
                  ) : null}
                  {order.attributes.status === 'Complete' ? (
                    <Stack direction="horizontal" gap={2}>
                      <div>
                      <img src="packing.png" className={styles.packimg} style={{ layout: "fill" }} />
                      <img src="car.png" className={styles.packimg} style={{ layout: "fill" }} />
                      </div>
                      <div className={styles.text2}>
                        <p>กำลังจัดเตรียมสินค้า</p>
                        <p>จัดส่งสินค้าเรียบร้อยแล้ว</p>
                      </div>
                    </Stack>
  ) : null}
</Stack>
                </div>
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
