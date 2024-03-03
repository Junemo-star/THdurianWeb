import React, { useEffect, useState } from "react";
import styles from "../css/CssDeliveryPc.module.css";
import Footers from "../componet/Footerbar";
import { useAuth } from '../componet/AuthContext';
import Stack from 'react-bootstrap/Stack';
import axios from "axios";
import NavbarHead from "../componet/Navbar";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
  } from "mdb-react-ui-kit";

const DeliveryPc = () => {
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
    <div>
        <NavbarHead/>
    <div className={styles.set_pos}>
        <div className={styles.box}>

        </div >
    </div>
    </div>
  );
}

export default DeliveryPc;
