import React, { useState, useEffect } from 'react';
import { Form, Container, Image } from 'react-bootstrap';
import styles from '../../css/CssUser.module.css'
import Footers from '../../componet/Footerbar';
import NavbarHead from '../../componet/Navbar';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../componet/AuthContext';
import useWindowWidth from '../../componet/Check_size';
import { Helmet } from "react-helmet";


const UserProfile = () => {
    const navigate = useNavigate()
    const { setRole, token, userRole } = useAuth();
    const windowWidth = useWindowWidth();
    const [userdata, setUserdata] = useState();
    

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
        <div>
            <Helmet>
                <title>User</title>
                {/* <meta name="description" content="Helmet application" /> */}
            </Helmet>

            <div className={styles.set_pos}>
                {windowWidth < 450 && <button onClick={() => handleLogout()} className={styles.button_logout}>Logout</button>}
                <div style={{ margin: "20px" }}>
                    {userdata?.Profile? (
                        <img src={"http://localhost:1337" + userdata.Profile.url} className={styles.userimg} />
                    ) : (
                        <img src="user.png" className={styles.userimg} />
                    )}
                </div>

                {userdata && (
                    <div className={styles.box}>

                        <div className={windowWidth > 450 ? styles.size_pc : null}>
                            <div className={styles.box_inside_profile}>
                                <div className={styles.box_inside_text}>
                                    <div style={{ display: 'flex' , fontSize: "20px", fontSize: "20px"}}>
                                        ชื่อ : <div>{userdata.firstname}</div><br />
                                    </div>
                                    <div style={{ display: 'flex', marginTop: "10px", fontSize: "20px" }}>
                                        นามสกุล : <div>{userdata.surname}</div> <br />
                                    </div>
                                    <div style={{ display: 'flex', marginTop: "10px", fontSize: "20px", flexWrap: "wrap" }}>
                                        ที่อยู่ : <div>{userdata.location === null ? null : userdata.location}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.box_inside_history} style={{marginTop: "20px"}}>
                                <div className={styles.text_head_history}>
                                    ประวัติ - สถานะการจัดส่ง :
                                </div>

                                {/* <div className={windowWidth > 450 ? styles.}></div> */}
                                <div className={styles.score_line} >
                                    {/* <div className={styles.body_history}>
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
                                    </div> */}
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

                            <div style={{ width: '100%', display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                <button style={{ padding: "10px", backgroundColor: "#FFEF60", fontWeight: "bold", borderRadius: "10px", borderStyle: "hidden", fontSize: "20px" }}>
                                    แก้ไขข้อมูลส่วนตัว
                                </button>
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