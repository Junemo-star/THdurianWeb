import React, { useState, useEffect } from 'react';
import styles from '../../css/CssUser.module.css'
import Footers from '../../componet/Footerbar';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../componet/AuthContext';
import useWindowWidth from '../../componet/Check_size';
import { Helmet } from "react-helmet";
import Urlconfig from '../../config';
import Editdata from '../../componet/Edit';


const UserProfile = () => {
    const head = Urlconfig.serverUrlPrefix;
    const navigate = useNavigate()
    const { setRole, token, userRole } = useAuth();
    const windowWidth = useWindowWidth();
    const [userdata, setUserdata] = useState();
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    const infouser = async () => {
        const response = await axios.get(head+"/api/users/me?populate[order_histories][populate][farmPost][populate]=owner&populate[Profile]=*", token)
        setUserdata(response.data)
    }

    console.log(userdata)

    const open = () => {
        setShowModal(true);
        console.log(showModal)
    }

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
        <div style={{marginBottom: "200px"}}>
            <Helmet>
                <title>User</title>
                {/* <meta name="description" content="Helmet application" /> */}
            </Helmet>

            <div className={styles.set_pos}>
                {windowWidth < 450 && <button onClick={() => handleLogout()} className={styles.button_logout}>Logout</button>}
                <div style={{ margin: "20px" }}>
                    {userdata?.Profile? (
                        <img src={head + userdata.Profile.url} className={styles.userimg} />
                    ) : (
                        <img src="user.png" className={styles.userimg} />
                    )}
                </div>

                {userdata && (
                    <div className={styles.box}>
                        <div className={windowWidth > 450 ? styles.size_pc : null}>
                            <div className={styles.box_inside_profile}>
                                <div className={styles.box_inside_text}>
                                    <div style={{ display: 'flex', fontSize: "20px", fontSize: "20px" }}>
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

                            <div style={{ width: '100%', display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                <button style={{ padding: "10px", backgroundColor: "#FFEF60", fontWeight: "bold", borderRadius: "10px", borderStyle: "hidden", fontSize: "20px" }} onClick={() => open()}>
                                    แก้ไขข้อมูลส่วนตัว
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.box} style={{paddingTop: "0px"}}>
                    <div className={styles.box_inside_history} style={{ marginTop: "20px" }}>
                        <div className={styles.text_head_history}>
                            ประวัติ - สถานะการจัดส่ง :
                        </div>

                        <div className={styles.score_line} >
                            <div className={styles.body_history}>
                                {userdata?.order_histories?.map((item) => (
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
                {windowWidth < 450 && <Footers />}
            </div>

            <Editdata open={showModal} onHide={handleClose} user={userdata} />
        </div>
    )
}

export default UserProfile;