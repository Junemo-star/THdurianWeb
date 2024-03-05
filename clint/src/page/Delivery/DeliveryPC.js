import { MDBTypography, MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";
import useWindowWidth from "../../componet/Check_size";
import React, { useEffect, useState } from "react";
import styles from "../../css/CssDeliveryPc.module.css";
import { useAuth } from "../../componet/AuthContext";
import NavbarHead from "../../componet/Navbar";
import { Steps } from "antd";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Urlconfig from '../../config';

const DeliveryPc = () => {
  const head = Urlconfig.serverUrlPrefix;
  const windowWidth = useWindowWidth();
  const [orders, setOrders] = useState([]);
  const [activeStep, setActiveStep] = useState([]);
  const [category, setCategory] = useState("");
  const statusColor = ["#697E50", "#697E50", "#697E50"];
  const { token } = useAuth();
  const Step = Steps.Step;

  const fetchData = async () => {
    try {
      const ordersResponse = await axios.get(
        head + "/api/delivery",
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
    // Set the active step based on the status of each order
    orders.forEach((order) => {
      switch (order.Status) {
        case "Verifying":
          setActiveStep(0);
          break;
        case "Packaging":
          setActiveStep(1);
          break;
        case "Delivered":
          setActiveStep(2);
          break;
      }
    });
  }, [orders]);

  // Filter orders based on selected category
  const filteredOrders =
    category === "" || category === "ทั้งหมด" || category === "กรุณาเลือกประเภททุเรียน"
      ? orders
      : orders.filter((order) => order.Category === category);

  return (
    <>
      <NavbarHead />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          margin: "100px"

        }}
      >
        <div
          style={{
            width: "1000px",
            height: "auto",
            backgroundColor: "#697E50",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            flexDirection: "column",

          }}
        >
          <div className={styles.set_pos}>
            <FloatingLabel controlId="floatingSelect" label="ประเภท">
              <Form.Select
                aria-label="Floating label select example"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>กรุณาเลือกประเภททุเรียน</option>
                <option>ทั้งหมด</option>
                {console.log(orders)}
                {orders.map((order) => (
                  <option key={order.id} value={order.Category}>
                    {order.Category}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </div>
          {filteredOrders.map((order, index) => (
            <div key={order.id}>
              <div>
                <MDBTypography>
                  <div>
                    <div className={styles.inside_box}>
                      <div style={{ padding: "10px", display: "flex", justifyContent: "start", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <div style={{ width: "95%", fontSize: "30px", fontWeight: "bold" }}>
                          สถานะการจัดส่ง
                        </div>
                        <div style={{ width: "95%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", fontSize: "20px" }}>
                          <div style={{ width: "80%", display: "flex", justifyContent: "start", marginBottom: "10px" }}>
                            <div style={{marginRight: "20px"}}>สวน : {order.Farmer}</div>
                            <div>ชนิด : {order.Category}</div>
                          </div>
                          <div style={{ width: "80%", display: "flex", justifyContent: "start", marginBottom: "10px" }}>
                            <div style={{marginRight: "20px"}}>จำนวน : {order.Amount} กิโลกรัม</div>
                            <div>ราคา : {order.Price} บาท</div>
                          </div>
                          <div style={{ width: "80%", marginBottom: "10px" }}>
                            สถานะ : {order.Status}
                          </div>
                        </div>
                      </div>

                      <div style={{ width: "95%", marginBottom: "10px" }}>
                        <Steps
                          progressDot
                          current={index}
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
    </>
  );
};

export default DeliveryPc;
