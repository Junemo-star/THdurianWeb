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
    const { setRole } = useAuth();
    const windowWidth = useWindowWidth();

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

                <div className={styles.box}>

                    <div className={styles.box_inside_profile}>
                        <div className={styles.box_inside_text}>

                        </div>
                    </div>
                    
                    <div className={styles.box_inside_history} >
                        <div className={styles.text_head_history}>
                            ประวัติ - สถานะการจัดส่ง
                        </div>

                        <div className={styles.score_line}>
                            <div className={styles.body_history}>
                                <div className={styles.text_body_history}>
                                    สวนนายดำ สั่งวันที่ : xx/xx/xx จำนวน : xx กิโลกรัม <br />
                                    ราคา : xx บาท สถานะ : อยู่ระหว่างการจัดส่ง
                                </div>
                            </div>

                            <div className={styles.body_history}>
                                <div className={styles.text_body_history}>
                                    สวนนายดำ สั่งวันที่ : xx/xx/xx จำนวน : xx กิโลกรัม <br />
                                    ราคา : xx บาท สถานะ : อยู่ระหว่างการจัดส่ง
                                </div>
                            </div>

                            <div className={styles.body_history}>
                                <div className={styles.text_body_history}>
                                    สวนนายดำ สั่งวันที่ : xx/xx/xx จำนวน : xx กิโลกรัม <br />
                                    ราคา : xx บาท สถานะ : อยู่ระหว่างการจัดส่ง
                                </div>
                            </div>

                            <div className={styles.body_history}>
                                <div className={styles.text_body_history}>
                                    สวนนายดำ สั่งวันที่ : xx/xx/xx จำนวน : xx กิโลกรัม <br />
                                    ราคา : xx บาท สถานะ : อยู่ระหว่างการจัดส่ง
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                {windowWidth < 450 && <Footers />}
            </div>
        </div>
    )
}

export default UserProfile;