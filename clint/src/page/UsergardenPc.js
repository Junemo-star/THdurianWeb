import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../componet/AuthContext';
import useWindowWidth from '../componet/Check_size';
import NavbarHead from '../componet/Navbar';
import { Helmet } from "react-helmet";
import styles from '../css/CssUsergardenPc.module.css'
import React, { useState, useEffect, cloneElement } from 'react';


const UsergardenPc = () => {
    const { setRole, token } = useAuth();
    const navigate = useNavigate()
    const [userdata, setUserdata] = useState();

    const infouser = async () => {
        const response = await axios.get("http://localhost:1337/api/users/me?populate=*", token)
        setUserdata(response.data)
    }

    // console.log(userdata)

    const postsell = () => {
        navigate('/Posts')
    }

    useEffect(() => {
        infouser()
    }, [])

    return (
        <div >
            <Helmet>
                <title>User</title>
                {/* <meta name="description" content="Helmet application" /> */}
            </Helmet>
            {/* {console.log(userdata)} */}
            <NavbarHead />

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh" }}>
                <div style={{ width: "1000px", height: "500px", backgroundColor: "#697E50", display: "flex", justifyContent: "space-around", alignItems: "center" , borderRadius: "10px"}}>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", margin: "20px"}}>
                        <img src="user.png" className={styles.userimg} style={{ layout: "fill" }} />
                        <button style={{marginTop: "10px", backgroundColor: "#FFEF60", borderStyle: "hidden", borderRadius: "10px", padding: "8px"}} onClick={() => postsell()}>
                            เพิ่มโพสการขาย
                        </button>
                    </div>

                    {userdata &&
                        <div style={{ color: "white",display: "flex", flexDirection: "column", justifyContent: "center", width: "450px", height: "100%" }}>
                            <div style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                ชื่อ : <div style={{ marginLeft: "10px", padding: "10px", backgroundColor: "#FFEF60", color: "black", borderRadius: "10px", }}>{userdata.firstname}</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "left", alignItems: "center", marginTop: "10px" }}>
                                นามสกุล : <div style={{ marginLeft: "10px", padding: "10px", backgroundColor: "#FFEF60", color: "black", borderRadius: "10px", }}>{userdata.surname}</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "left", alignItems: "center", marginTop: "10px" }}>
                                ที่อยู่ : <div style={{ marginLeft: "10px", padding: "10px", backgroundColor: "#FFEF60", color: "black", borderRadius: "10px", }}>{userdata.location === null ? null : userdata.location}</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "left", alignItems: "center"}}>
                                ประวัติการโพส : 
                                <div style={{backgroundColor: "#FFEF60", borderRadius: "10px", width: "330px", marginLeft: "10px" , marginTop: "10px"}}>
                                    <div className={styles.score_line}>
                                        <div className={styles.inside_box_profile2}>
                                            สวนนายดำ ขายวันที่ : xx/xx/xx <br />
                                            จำนวน : xx กิโลกรัม ราคา xx บาท
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "left", alignItems: "center"}}>
                                ประวัติการโพส : 
                                <div style={{backgroundColor: "#FFEF60", borderRadius: "10px", width: "330px", marginLeft: "10px", marginTop: "10px"}}>
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
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default UsergardenPc;