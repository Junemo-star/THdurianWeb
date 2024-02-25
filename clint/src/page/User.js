import React, { useState, useEffect } from 'react';
import { Form, Container, Image } from 'react-bootstrap';
import styles from '../css/CssUser.module.css'
import Footers from '../componet/Footerbar';
import NavbarHead from '../componet/Navbar';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../componet/AuthContext';
import useWindowWidth from '../componet/Check_size';


const UserProfile = () => {
    const navigate = useNavigate()
    const { setRole, token } = useAuth();
    const windowWidth = useWindowWidth();
    const [userdata, setUserdata] = useState();

    const infouser = async () => {
        const response = await axios.get("http://localhost:1337/api/users/me?populate[order_histories][populate][farmPost][populate]=owner", token)
        setUserdata(response.data)
    }

    console.log(userdata)

    useEffect(() => {
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
        <div>
            {windowWidth > 450 && <NavbarHead />}
            <div className={styles.set_pos}>
                <button onClick={() => handleLogout()} className={styles.button_logout}>Logout</button>
                <img src="user.png" className={styles.userimg} style={{ layout: "fill" }} />
                {userdata && (
                    <div className={styles.box}>

                        <div className={styles.box_inside_profile}>
                            <div className={styles.box_inside_text}>
                                ชื่อ : {userdata.firstname} {userdata.surname}<br />
                                ที่อยู่ : {userdata.location === null ? (null) : (userdata.location)}
                            </div>
                        </div>
                        <div className={styles.box_inside_history} >
                            <div className={styles.text_head_history}>
                                ประวัติ - สถานะการจัดส่ง
                            </div>
                            <div className={styles.score_line}>
                                <div className={styles.body_history}>
                                    {userdata.order_histories.map((item) => (
                                        <div className={styles.text_body_history}>
                                            {item.farmPost.owner.username} <br />
                                            สั่งวันที่ : {new Date(item.date).toLocaleString("th-TH", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: false,
                                            })} <br />
                                            จำนวน : {item.amount} กิโลกรัม ราคา : {item.price} บาท <br />
                                            สถานะ : {item.status}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                )}
                {windowWidth < 450 && <Footers />}
            </div>
        </div>
    )
}

export default UserProfile;