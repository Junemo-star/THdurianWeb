import { MDBTypography, MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";
import useWindowWidth from "../../componet/Check_size";
import React, { useEffect, useState } from "react";
import styles from "../../css/CssDeliveryPc.module.css";
import { useAuth } from "../../componet/AuthContext";
import NavbarHead from "../../componet/Navbar";
import { Divider, Steps } from "antd";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Urlconfig from "../../config";

const { Step } = Steps;

const OrderStep = ({ order }) => {
  const [currentStep, setCurrentStep] = useState(0); // กำหนดค่าเริ่มต้นของ step เป็น 0

  useEffect(() => {
    // ตั้งค่า step ของแต่ละ order โดยอ้างอิงจาก order.Status
    switch (order.Status) {
      case "Packaging":
        setCurrentStep(1);
        break;
      case "Delivered":
        setCurrentStep(2);
        break;
      default:
        setCurrentStep(0);
        break;
    }
  }, [order.Status]);

  return (

    <div className={styles.inside_box}>
      <div className={styles.inside_box}>
        <div
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "start",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >

          <div
            style={{
              width: "95%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              fontSize: "20px",
            }}
          >
            <div
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <div style={{ marginRight: "20px" }}>สวน : {order.Farmer}</div>
              <div>ชนิด : {order.Category}</div>
            </div>
            <div
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <div style={{ marginRight: "20px" }}>
                จำนวน : {order.Amount} กิโลกรัม
              </div>
              <div>ราคา : {order.Price} บาท</div>
            </div>
            <div style={{
              width: "80%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}>
              สถานะ : {order.Status}
            </div>
          </div>
        </div>
      </div>
      <Steps
        progressDot
        current={currentStep}
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
  );
};

const DeliveryPc = () => {
  const head = Urlconfig.serverUrlPrefix;
  const { token } = useAuth();
  const [category, setCategory] = useState("");
  const [orders, setOrders] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get(head + "/api/delivery", token);
        setOrders(ordersResponse.data);

        // เก็บประเภททุเรียนที่ไม่ซ้ำกันลงใน Set
        const categories = new Set(
          ordersResponse.data.map((order) => order.Category)
        );
        setUniqueCategories(categories);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredOrders =
    category === "" ||
      category === "ทั้งหมด" ||
      category === "กรุณาเลือกประเภททุเรียน"
      ? orders
      : orders.filter((order) => order.Category === category);

  return (
    <div>
      <NavbarHead />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          margin: "100px",
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
          <div className={styles.inside_box} style={{ marginBottom: "10px" }}>
            <h1 class="text-center">สถานะการจัดส่ง</h1>
          </div>
          <div className={styles.set_pos}>
            <FloatingLabel controlId="floatingSelect" label="ประเภท">
              <Form.Select
                aria-label="Floating label select example"
                value={category}
                onChange={handleCategoryChange}
              >
                <option>กรุณาเลือกประเภททุเรียน</option>
                <option>ทั้งหมด</option>
                {[...uniqueCategories].map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </div>
          {filteredOrders.map((order) => (
            <OrderStep key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryPc;
