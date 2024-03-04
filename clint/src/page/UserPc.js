import React, { useState, useEffect } from 'react';
import { Form, Container, Image } from 'react-bootstrap';
import styles from '../css/CssUser.module.css'
import Footers from '../componet/Footerbar';
import NavbarHead from '../componet/Navbar';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../componet/AuthContext';
import useWindowWidth from '../componet/Check_size';
import { Helmet } from "react-helmet";
import Editdata from '../componet/Edit';


const UserPc = () => {
    const navigate = useNavigate()
    const { setRole, token, userRole } = useAuth();
    const windowWidth = useWindowWidth();
    const [userdata, setUserdata] = useState();
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    const open = () => {
        setShowModal(true);
        console.log(showModal)
    }

    const infouser = async () => {
        const response = await axios.get("http://localhost:1337/api/users/me?populate[order_histories][populate][farmPost][populate]=owner&populate[Profile]=*", token)
        setUserdata(response.data)
    }

    console.log(userdata)

    useEffect(() => {
        if (userRole !== "Customer") {
            navigate("/")
        }
        infouser()
    }, []) 

    const handleLogout = () => {
        // Remove JWT Token from Local Storage
        // window.localStorage.removeItem("jwtToken");
        window.localStorage.removeItem("userRole");
        setRole(null)
        // Clear Authorization Header in Axios Defaults
        axios.defaults.headers.common.Authorization = "";
        // Navigate to the "/" path (adjust this if using a different routing library)
        navigate("/");
    }

    return (
        <>
            <NavbarHead />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", margin: "100px", height: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-around", width: "900px", height: "auto", backgroundColor: "#697E50", padding: "20px", borderRadius: "10px" }}>
                    <div>
                        {userdata?.Profile ? (
                            <img src={"http://localhost:1337" + userdata.Profile.url} style={{ width: "150px", height: "150px", backgroundColor: "white" }} />
                        ) : (
                            <img src="user.png" style={{ width: "150px", height: "150px", borderRadius: "50%", backgroundColor: "white" }} />
                        )}
                    </div>

                    {userdata && (
                        <div style={{ width: "500px" }}>
                            <div style={{ display: "flex", justifyContent: "start", width: "90%", alignItems: "center" }}>
                                <span style={{ color: "white", fontWeight: "bold", fontSize: "15px" }}>
                                    ชื่อ :
                                </span>
                                <div style={{ marginLeft: "10px", padding: "10px", backgroundColor: "#FFEF60", color: "black", borderRadius: "10px", }}>
                                    {userdata.firstname}
                                </div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "start", width: "90%", alignItems: "center", marginTop: "10px" }}>
                                <span style={{ color: "white", fontWeight: "bold", fontSize: "15px" }}>
                                    นามสกุล :
                                </span>
                                <div style={{ marginLeft: "10px", padding: "10px", backgroundColor: "#FFEF60", color: "black", borderRadius: "10px", }}>
                                    {userdata.surname}
                                </div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "start", width: "90%", alignItems: "center", marginTop: "10px" }}>
                                <span style={{ color: "white", fontWeight: "bold", fontSize: "15px" }}>
                                    ที่อยู่ :
                                </span>
                                <div style={{ marginLeft: "10px", padding: "10px", backgroundColor: "#FFEF60", color: "black", borderRadius: "10px" }}>
                                    {userdata.location}
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                <div style={{ display: "flex", justifyContent: "start", flexDirection: "column", width: "900px", height: "auto", backgroundColor: "#697E50", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
                    <div style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>
                        ประวัติการจัดส่ง
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <div style={{ width: "95%", backgroundColor: "#FFEF60", overflowY: "auto", maxHeight: "250px", padding: "5px" }}>
                            <div className={styles.body_history}>
                                <div className={styles.text_body_history}>
                                    สวนนายดำ<br />
                                    สั่งวันที่ : 16 กุมภา 2548 <br />
                                    จำนวน : 25 กิโลกรัม ราคา : 200 บาท <br />
                                    สถานะ : กำลังจัดส่ง
                                </div>
                            </div>
                            <div className={styles.body_history}>
                                <div className={styles.text_body_history}>
                                    สวนนายดำ<br />
                                    สั่งวันที่ : 16 กุมภา 2548 <br />
                                    จำนวน : 25 กิโลกรัม ราคา : 200 บาท <br />
                                    สถานะ : กำลังจัดส่ง
                                </div>
                            </div>
                            <div className={styles.body_history}>
                                <div className={styles.text_body_history}>
                                    สวนนายดำ<br />
                                    สั่งวันที่ : 16 กุมภา 2548 <br />
                                    จำนวน : 25 กิโลกรัม ราคา : 200 บาท <br />
                                    สถานะ : กำลังจัดส่ง
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%', display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <button 
                        style={{ padding: "10px", backgroundColor: "#697E50", fontWeight: "bold", borderRadius: "10px", borderStyle: "hidden", fontSize: "20px" , color: "white"}}
                        onClick={() => open()}    
                    >
                        แก้ไขข้อมูลส่วนตัว
                    </button>
                </div>
            
            <Editdata open={showModal} onHide={handleClose} user={userdata}/>

            </div>
        </>
    )
}

export default UserPc