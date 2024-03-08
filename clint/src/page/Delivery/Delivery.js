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
import Urlconfig from "../../config";

const { Step } = Steps;

const OrderStep = ({ order }) => {
  const [currentStep, setCurrentStep] = useState(0); // กำหนดค่าเริ่มต้นของ step เป็น 0
  const windowWidth = useWindowWidth();

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
    <div style={{ marginBottom: "5px" }}>
    <div className={styles.set_pos}>
      <div className={styles.set_all} ></div>

      <div className={styles.set_pos} >
        <div className={styles.box}  >
          <div className={styles.set_pos}  >
            

            <div className={styles.set_pos} style={{ marginBottom: "20px" }}>
              <div>
                <MDBTypography>
                  <div>
                    <div className={styles.inside_box}>
                      <div className={styles.text2}>
                        <p className="mb-1">สวน : {order.Farmer}</p>
                        <p className="mb-1">ชนิด : {order.Category}</p>
                        <p className="mb-1">จำนวน : {order.Amount} กิโลกรัม</p>
                        <p className="mb-1">ราคา : {order.Price} บาท</p>
                        <p className="mb-1">สถานะ : {order.Status}</p>
                      </div>
                      <div>
                        <Steps
                          progressDot
                          current={currentStep}
                          direction="vertical"
                          items={[
                            {
                              title: "รับคำสั่งซื้อ",
                              description:
                                "บริษัทได้รับคำสั่งซื้อของคุณเรียบร้อยแล้ว",
                            },
                            {
                              title: "เตรียมจัดส่ง",
                              description:
                                "พัสดุของคุณนำเข้าขนส่งเรียบร้อยแล้ว",
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
          </div>
          {windowWidth < 450 && <Footers />}
        </div>
      </div>
      </div>
    </div>
  );
};
const Delivery = () => {
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
    <>
      <div style={{ marginBottom: "100px" }}>
        <div >
          <div className={styles.set_pos}>
            <div className={styles.set_pos}>
          <div className={styles.inside_box} style={{ marginBottom: "10px" }}>
              <h1 class="text-center">สถานะการจัดส่ง</h1>
            </div>
            </div>
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
    </>
  );
};

export default Delivery;
