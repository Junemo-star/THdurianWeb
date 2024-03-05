import styles from '../../css/CssUsergarden.module.css'
import Footers from '../../componet/Footerbar';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../componet/AuthContext';
import useWindowWidth from '../../componet/Check_size';
import NavbarHead from '../../componet/Navbar';
import { Helmet } from "react-helmet";
import React, { useState, useEffect } from 'react';

import Urlconfig from '../../config';


const Gardener = () => {
    const head = Urlconfig.serverUrlPrefix;
    const navigate = useNavigate()
    const { setRole, token, userRole } = useAuth();
    const [userdata, setUserdata] = useState();
    const [historySell, setHistorySell] = useState()
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
        const response = await axios.get(head + "/api/users/me?populate=*", token)
        setUserdata(response.data)

        const data = await axios.get(head + "/api/farm-post-news", token)
        // console.log(data.data)
        const filterdata = data.data.filter(item =>
            item.orders.length !== 0
        )
        setHistorySell(filterdata)
    }

    const postsell = () => {
        navigate('/Post')
    }

    useEffect(() => {
        if (userRole !== "Farmer") {
            navigate("/")
        }
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
                        <div style={{ color: "white", display: "flex", flexDirection: "column", justifyContent: "center", width: "310px", height: "100%", color: "black" }}>
                            <div style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                <span style={{ marginLeft: "10px" }}>ชื่อ : </span>
                                <div style={{ marginLeft: "10px", backgroundColor: "#FFEF60", color: "black", borderRadius: "10px", }}>{userdata.firstname}</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "left", alignItems: "center", marginTop: "10px" }}>
                                <span style={{ marginLeft: "10px" }}>นามสกุล : </span>
                                <div style={{ marginLeft: "10px", backgroundColor: "#FFEF60", color: "black", borderRadius: "10px", }}>{userdata.surname}</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "left", alignItems: "center", marginTop: "10px" }}>
                                <span style={{ marginLeft: "10px" }}>ที่อยู่ :</span>
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
                        {historySell?.map((item) => (
                            <>
                                {item.orders.map((item2) => (
                                    <div className={styles.inside_box_profile2} style={{height: "auto"}}>
                                        <div>ขายวันที่ :</div> 
                                        {new Date(item2.date).toLocaleString("th-TH", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            hour12: false,
                                        })}
                                        <div>จำนวน : {item2.amount} กิโลกรัม ราคา {item2.price} บาท</div>
                                    </div>
                                ))}
                            </>
                        ))}
                    </div>
                </div>

                <div className={styles.box_inside_profile3}>
                    <div className={styles.text_inside_profile2}>
                        โพสการขาย
                    </div>
                    <div className={styles.score_line}>
                        {userdata?.farm_post_histories?.map((item) => (
                            <div className={styles.inside_box_profile2} style={{ height: "auto" }}>
                                <div style={{ marginRight: "10px" }}>{userdata.username}</div>
                                <div style={{ marginRight: "10px" }}>{new Date(item.date).toLocaleString("th-TH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: false,
                                })}</div>
                                <div style={{ marginRight: "10px" }}>จำนวน : {item.amount} กิโลกรัม</div>
                                <div style={{ marginRight: "10px" }}>ราคา {item.price} บาท</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {windowWidth < 450 && <Footers />}
        </div>
    )
}

export default Gardener;