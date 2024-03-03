import styles from '../css/CssUsergarden.module.css'
import Footers from '../componet/Footerbar';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../componet/AuthContext';
import useWindowWidth from '../componet/Check_size';
import NavbarHead from '../componet/Navbar';
import { Helmet } from "react-helmet";
import React, { useState, useEffect } from 'react';



const Gardener = () => {
    const navigate = useNavigate()
    const { setRole, token } = useAuth();
    const [userdata, setUserdata] = useState();

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

    const infouser = async () => {
        const response = await axios.get("http://localhost:1337/api/users/me?populate=*", token)
        setUserdata(response.data)
    }

    const postsell = () => {
        navigate('/Post')
    }

    useEffect(() => {
        infouser()
    }, [])

    return (
        <div className={styles.set_pos}>
            <Helmet>
                <title>User</title>
                {/* <meta name="description" content="Helmet application" /> */}
            </Helmet>

            {windowWidth > 450 && <NavbarHead />}

            <div className={styles.box}>
                {windowWidth < 450 && <button onClick={() => handleLogout()} className={styles.button_logout}>Logout</button>}
                <img src="user.png" className={styles.userimg} style={{ layout: "fill" }} />

                <div className={styles.set_head}>
                    <div className={styles.head_box} style={{ marginRight: "10px" }}>
                        <div className={styles.text_head_box}>
                            สถานะ : ชาวสวน
                        </div>
                    </div>
                    <button className={styles.head_box} onClick={() => postsell()}>
                        <div className={styles.text_head_box}>
                            เพิ่มโพสการขาย
                        </div>
                    </button>
                </div>

                {userdata &&
                    <div className={styles.box_inside_profile}>
                        <div style={{ color: "white",display: "flex", flexDirection: "column", justifyContent: "center", width: "310px", height: "100%", color: "black" }}>
                            <div style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                <span style={{marginLeft: "10px"}}>ชื่อ : </span>
                                <div style={{ marginLeft: "10px", backgroundColor: "#FFEF60", color: "black", borderRadius: "10px", }}>{userdata.firstname}</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "left", alignItems: "center", marginTop: "10px" }}>
                            <span style={{marginLeft: "10px"}}>นามสกุล : </span>
                                <div style={{ marginLeft: "10px", backgroundColor: "#FFEF60", color: "black", borderRadius: "10px", }}>{userdata.surname}</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "left", alignItems: "center", marginTop: "10px" }}>
                                <span style={{marginLeft: "10px"}}>ที่อยู่ :</span> 
                                <div style={{ marginLeft: "10px", backgroundColor: "#FFEF60", color: "black", borderRadius: "10px", }}>{userdata.location === null ? null : userdata.location}</div>
                            </div>
                        </div>
                    </div>
                }

                <div className={styles.box_inside_profile2}>
                    <div className={styles.text_inside_profile2}>
                        ประวัติการขาย
                    </div>
                    <div className={styles.score_line}>
                        <div className={styles.inside_box_profile2}>
                            สวนนายดำ ขายวันที่ : xx/xx/xx <br />
                            จำนวน : xx กิโลกรัม ราคา xx บาท
                        </div>

                        <div className={styles.inside_box_profile2}>
                            สวนนายดำ ขายวันที่ : xx/xx/xx <br />
                            จำนวน : xx กิโลกรัม ราคา xx บาท
                        </div>

                        <div className={styles.inside_box_profile2}>
                            สวนนายดำ ขายวันที่ : xx/xx/xx <br />
                            จำนวน : xx กิโลกรัม ราคา xx บาท
                        </div>
                    </div>
                </div>

                <div className={styles.box_inside_profile3}>
                    <div className={styles.text_inside_profile2}>
                        โพสการขาย
                    </div>
                    <div className={styles.score_line}>
                        <div className={styles.inside_box_profile3}>
                            หมอนทอง วันที่ : xx/xx/xx
                        </div>

                        <div className={styles.inside_box_profile3}>
                            หมอนทอง วันที่ : xx/xx/xx
                        </div>

                        <div className={styles.inside_box_profile3}>
                            หมอนทอง วันที่ : xx/xx/xx
                        </div>

                        <div className={styles.inside_box_profile3}>
                            หมอนทอง วันที่ : xx/xx/xx
                        </div>

                        <div className={styles.inside_box_profile3}>
                            หมอนทอง วันที่ : xx/xx/xx
                        </div>

                        <div className={styles.inside_box_profile3}>
                            หมอนทอง วันที่ : xx/xx/xx
                        </div>
                    </div>
                </div>
            </div>

            {windowWidth < 450 && <Footers />}
        </div>
    )
}

export default Gardener;