import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../componet/AuthContext';
import useWindowWidth from '../../componet/Check_size';
import NavbarHead from '../../componet/Navbar';
import { Helmet } from "react-helmet";
import styles from '../../css/CssUsergardenPc.module.css'
import React, { useState, useEffect } from 'react';
import Editdata from "../../componet/Edit";
import Urlconfig from '../../config';


const UsergardenPc = () => {
    const head = Urlconfig.serverUrlPrefix;
    const { token, userRole } = useAuth();
    const navigate = useNavigate()
    const [userdata, setUserdata] = useState();
    const [historySell, setHistorySell] = useState()
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    const open = () => {
        setShowModal(true);
        console.log(showModal)
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
        // const ans = filterdata.map(item => {
        //     return item.orders.flatMap(item2 => item2)
        // })
        // const ans = filterdata.map(item => {
        //     item.orders.map(item2 => {
        //         console.log(item2)
        //     })
        // })
        // console.log(ans)
    }

    // console.log(userdata)

    const postsell = () => {
        navigate('/Posts')
    }

    useEffect(() => {
        if (userRole !== "Farmer") {
            navigate("/")
        }
        infouser()
    }, [])

    return (
        <div>
            <Helmet>
                <title>User</title>
                {/* <meta name="description" content="Helmet application" /> */}
            </Helmet>
            {console.log(historySell)}
            <NavbarHead />

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%", margin: "80px" }}>
                {/* <div style={{ width: "1000px", height: "500px", backgroundColor: "#697E50", display: "flex", justifyContent: "space-around", alignItems: "center" , borderRadius: "10px"}}> */}
                <div style={{ width: "900px", height: "300px", backgroundColor: "#697E50", display: "flex", justifyContent: "space-around", alignItems: "center", borderRadius: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", margin: "20px" }}>
                        {/* <img src="user.png" className={styles.userimg} style={{ layout: "fill" }} /> */}
                        {userdata?.Profile ? (
                            <img src={head + userdata.Profile.url} style={{ width: "150px", height: "150px", backgroundColor: "white" }} />
                        ) : (
                            <img src="user.png" style={{ width: "150px", height: "150px", borderRadius: "50%", backgroundColor: "white" }} />
                        )}
                        <button style={{ marginTop: "10px", backgroundColor: "#FFEF60", borderStyle: "hidden", borderRadius: "10px", padding: "8px" }} onClick={() => postsell()}>
                            เพิ่มโพสการขาย
                        </button>
                    </div>

                    {userdata &&
                        <div style={{ color: "white", display: "flex", flexDirection: "column", justifyContent: "center", width: "450px", height: "100%" }}>
                            <div style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                ชื่อ : <div style={{ marginLeft: "10px", padding: "10px", backgroundColor: "#FFEF60", color: "black", borderRadius: "10px", }}>{userdata.firstname}</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "left", alignItems: "center", marginTop: "10px" }}>
                                นามสกุล : <div style={{ marginLeft: "10px", padding: "10px", backgroundColor: "#FFEF60", color: "black", borderRadius: "10px", }}>{userdata.surname}</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "left", alignItems: "center", marginTop: "10px" }}>
                                ที่อยู่ : <div style={{ marginLeft: "10px", padding: "10px", backgroundColor: "#FFEF60", color: "black", borderRadius: "10px", }}>{userdata.location === null ? null : userdata.location}</div>
                            </div>
                        </div>
                    }
                </div>

                <div style={{ width: "900px", height: "300px", backgroundColor: "#697E50", marginTop: "20px", borderRadius: "10px" }}>
                    <div style={{ padding: "10px", fontSize: "25px", color: "white", fontWeight: "bold" }}>
                        ประวัติการขาย
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.score_line} style={{ width: "95%", backgroundColor: "#FFEF60" }}>
                            {historySell?.map((item) => (
                                <>
                                    {item.orders.map((item2) => (
                                        <div className={styles.inside_box_profile2}>
                                            ขายวันที่ : {new Date(item2.date).toLocaleString("th-TH", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: false,
                                            })}
                                            <span style={{marginLeft: "10px"}}>จำนวน : {item2.amount} กิโลกรัม ราคา {item2.price} บาท</span>
                                        </div>
                                    ))}
                                </>
                            ))}
                        </div>
                    </div>


                </div>

                <div style={{ width: "900px", height: "300px", backgroundColor: "#697E50", marginTop: "20px", borderRadius: "10px" }}>
                    <div style={{ padding: "10px", fontSize: "25px", color: "white", fontWeight: "bold" }}>
                        ประวัติการโพส
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ backgroundColor: "#FFEF60", borderRadius: "10px", width: "95%", height: "210px" }}>
                            <div className={styles.score_line}>
                                {userdata?.farm_post_histories?.map((item) => (
                                    <div className={styles.inside_box_profile2}>
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
                </div>

                <div style={{ width: '100%', display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <button
                        style={{ padding: "10px", backgroundColor: "#697E50", fontWeight: "bold", borderRadius: "10px", borderStyle: "hidden", fontSize: "20px", color: "white" }}
                        onClick={() => open()}
                    >
                        แก้ไขข้อมูลส่วนตัว
                    </button>
                </div>

                <Editdata open={showModal} onHide={handleClose} user={userdata} />
            </div>
        </div >
    )
}

export default UsergardenPc;