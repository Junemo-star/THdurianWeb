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
      const ordersResponse = await axios.get("http://localhost:1337/api/delivery", token)
      setOrders(ordersResponse.data)
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
                    <p>{order.FarmerName}</p>
                    <p>จำนวน : {order.Amount} กิโลกรัม</p>
                    <p>ราคา : {order.Price} บาท</p>
                    <p>สถานะ : {order.Status}</p>
                  </div>
                </div>
                <div className="col-md-6">
                <Stack gap={2} >
                  {order.Status === 'Packaging' ? (
                    <Stack direction="horizontal" gap={2}>
                      <div><img src="box-seam.svg" className={styles.packimg}  /></div>
                      <div className={styles.text2}>
                        <p>กำลังจัดเตรียมสินค้า</p>
                      </div>
                    </Stack>
                  ) : null}
                  {order.Status === 'Complete' ? (
                    <Stack direction="horizontal" gap={2}>
                      <div>
                      <img src="box-seam.svg" className={styles.packimg} />
                      <img src="truck.svg" className={styles.packimg}  />
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
