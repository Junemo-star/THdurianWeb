import { MDBTypography, MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";
import useWindowWidth from "../componet/Check_size";
import React, { useEffect, useState } from "react";
import styles from "../css/CssDeliveryPc.module.css";
import { useAuth } from "../componet/AuthContext";
import NavbarHead from "../componet/Navbar";
import { Steps } from "antd";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const DeliveryPc = () => {
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
        "http://localhost:1337/api/delivery",
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
    category === "" || category === "ทั้งหมด"|| category === "กรุณาเลือกประเภททุเรียน"
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
          height: "100vh",
          
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
                      <div>
                        <p>สวน :{order.Farmer}</p>
                        <p>ชนิด : {order.Category}</p>
                        <p>จำนวน : {order.Amount} กิโลกรัม</p>
                        <p>ราคา : {order.Price} บาท</p>
                        <p>สถานะ : {order.Status}</p>
                      </div>
                      <div>
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
      {windowWidth > 450 && (
        <footer className={styles.footer_pc}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div className={styles.text_footer}>
              <div
                style={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                  fontSize: "20px",
                  alignItems: "center",
                  justifyContent: "left",
                  display: "flex",
                }}
              >
                <img
                  src="/logotitle.png"
                  width="40px"
                  height="40px"
                  style={{ marginRight: "5px" }}
                />{" "}
                Thaidurian <br />
              </div>
              <div>
                เว็บไซต์ศูนย์กลางจำหน่ายทุเรียนทั่วไทย <br />
                คิดถึงทุเรียน คิดถึงเรา
              </div>
            </div>
            <div className={styles.text_footer}>
              <div style={{ fontWeight: "bold" }}>Contact</div>
              <div>
                Phone : 086-543-2109 <br />
                Email : Thaidurian@gmail.com
              </div>
            </div>
            <div className={styles.text_footer}>
              <div style={{ fontWeight: "bold" }}>Social</div>
              <div style={{ marginTop: "5px" }}>
                <MDBIcon fab icon="line" style={{ marginRight: "10px" }} />
                <MDBIcon fab icon="instagram" style={{ marginRight: "10px" }} />
                <MDBIcon fab icon="facebook" />
                <br />
                ติดต่อสอบถามได้ 10.00 - 18.00 น
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "10px",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "1250px", marginTop: "5px" }}>
              <div
                style={{
                  borderTop: "2px solid white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ marginTop: "8px" }}>
                  © Copyright 2024 Thaidurian. All right reserved.
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default DeliveryPc;
