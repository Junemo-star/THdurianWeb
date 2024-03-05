import React, { useEffect, useState } from "react";
import styles from "../../css/CssDelivery.module.css";
import Footers from "../../componet/Footerbar";
import { useAuth } from "../../componet/AuthContext";
import axios from "axios";
import useWindowWidth from "../../componet/Check_size";
import { MDBTypography } from "mdb-react-ui-kit";
import { Steps } from "antd";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Urlconfig from '../../config';


const Delivery = () => {
  const head = Urlconfig.serverUrlPrefix;
  const windowWidth = useWindowWidth();
  const [orders, setOrders] = useState([]);
  const [category, setCategory] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const statusColor = ["#697E50", "#697E50", "#697E50"];
  const Step = Steps.Step;

  const { token } = useAuth();

  const fetchData = async () => {
    try {
      const ordersResponse = await axios.get(
        head+"/api/delivery",
        token
      );
      setOrders(ordersResponse.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const newActiveStep = orders.reduce((maxStep, order) => {
      switch (order.Status) {
        case "Verifying":
          return Math.max(maxStep, 0);
        case "Packaging":
          return Math.max(maxStep, 1);
        case "Delivered":
          return Math.max(maxStep, 2);
        default:
          return maxStep;
      }
    }, -1);
    setActiveStep(newActiveStep);
  }, [orders]);
  const filteredOrders =
    category === "" ||
    category === "ทั้งหมด" ||
    category === "กรุณาเลือกประเภททุเรียน"
      ? orders
      : orders.filter((order) => order.Category === category);

  return (
    <div style={{ marginBottom: "200px" }}>
      <div className={styles.set_all}></div>

      <div className={styles.set_pos}>
        <div className={styles.box}>
          <div className={styles.set_pos}>
            <div className={styles.inside_box}>
              <h1 class="text-center">สถานะการจัดส่ง</h1>
            </div>
            <div className={styles.set_pos}></div>
            <FloatingLabel controlId="floatingSelect" label="ประเภท">
              <Form.Select
                aria-label="Floating label select example"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>กรุณาเลือกประเภททุเรียน</option>
                <option>ทั้งหมด</option>
                {orders.map((order) => (
                  <option key={order.id} value={order.Category}>
                    {order.Category}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            {filteredOrders.map((order, index) => (
              <div key={order.id} className={styles.set_pos}>
                <div>
                  <MDBTypography>
                    <div>
                      <div className={styles.inside_box}>
                        <div>
                          <p class="mb-1">สวน : {order.Farmer}</p>
                          <p class="mb-1">ชนิด : {order.Category}</p>
                          <p class="mb-1">จำนวน : {order.Amount} กิโลกรัม</p>
                          <p class="mb-1">ราคา : {order.Price} บาท</p>
                          <p class="mb-1">สถานะ : {order.Status}</p>
                        </div>
                        <div>
                          <Steps
                            progressDot
                            current={activeStep}
                            direction="vertical"
                            items={[
                              {
                                title: "รับคำสั่งซื้อ",
                                description: "บริษัทได้รับคำสั่งซื้อของคุณเรียบร้อยแล้ว",
                              },
                              {
                                title: "เตรียมจัดส่ง",
                                description: "พัสดุของคุณนำเข้าขนส่งเรียบร้อยแล้ว",
                              },
                              {
                                title: "กำลังจัดส่ง",
                                description: "สินค้าของคุณได้จัดส่งเรียบร้อย",
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  </MDBTypography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {windowWidth < 450 && <Footers />}
    </div>
  );
};
export default Delivery;
