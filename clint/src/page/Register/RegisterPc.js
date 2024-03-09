import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useWindowWidth from '../../componet/Check_size';
import Footers from '../../componet/Footerbar';
import styles from '../../css/CssRegis.module.css'
import { Form, Container, Image } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Urlconfig from '../../config';
import { message } from 'antd';

const RegisterPc = () => {
    const head = Urlconfig.serverUrlPrefix;
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [conpassword, setConpassword] = useState()
    const [email, setEmail] = useState()
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [location, setLocation] = useState()
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    const windowWidth = useWindowWidth();
    const [messageApi, contextHolder] = message.useMessage();

    const handleChange = (e) => {
        console.log(e.target.files);
        setImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        if (password !== conpassword) {
            console.log("Passwords do not match");
            window.alert("รหัสผ่านไม่ถูกต้อง");
            return; // ไม่ทำการส่งข้อมูลถ้ารหัสผ่านไม่ตรงกัน
        }

        // console.log(username)
        // console.log(password)
        // console.log(email)
        // console.log(lastname)
        // console.log(firstname)
        // console.log(location)

        try {
            let result = await axios.post(head+"/api/users", {
                username: username,
                password: password,
                email: email,
                firstname: firstname,
                surname: lastname,
                location: location,
                role: 3,
                confirmed: true,
                blocked: false,
            });

            setSuccess(true)
            navigate("/Login")
        } catch (e) {
            console.log(e);
            console.log("wrong username & password");
            messageApi.open({
                type: 'warning',
                content: 'ข้อมูลไม่ถูกต้อง',
                duration: 3
            });
        }

        if (success === true) {
            setSuccess(false)
            navigate("/Login")
        }
    }

    const back = () => {
        navigate("/Login")
    }


    return (
        <div>
            <Helmet>
                <title>Register</title>
                {/* <meta name="description" content="Helmet application" /> */}
            </Helmet>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh" }}>
                <div style={{ width: "1000px", height: "600px", backgroundColor: "#697E50", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px", flexDirection: "column" }}>
                    <div style={{ marginBottom: "20px", color: "white", fontSize: "30px", fontWeight: "bold"}}>
                        สมัครสมาชิก
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: '100%' }}>
                        <div style={{ overflow: "hidden", width: "150px", height: "150px", position: "relative", borderRadius: "10px", borderStyle: "hidden", backgroundColor: "#FFEF60", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                            <input
                                type="file"
                                accept="image/*"
                                name='file'
                                onChange={handleChange}
                                style={{ width: "100%", height: "100%", position: "absolute", top: "0", left: "0", opacity: "0", cursor: "pointer" }}
                            />
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#8F3E00" class="bi bi-image" viewBox="0 0 16 16" >
                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                                </svg><br />
                                <h6>อัพโหลดรูปภาพ</h6>
                            </div>
                        </div>

                        <div style={{ width: "500px", color: "white" }}>
                            <Form.Group style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Form.Label style={{ marginRight: "10px" }}>ผู้ใช้งาน :</Form.Label>
                                <Form.Control
                                    id="username"
                                    placeholder="username"
                                    type='text'
                                    onChange={(e) => setUsername(e.target.value)}
                                    className={styles.control}
                                    style={{backgroundColor: "#FFEF60"}}
                                />
                            </Form.Group>

                            <Form.Group style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Form.Label style={{ marginRight: "10px" }}>รหัสผ่าน :</Form.Label>
                                <Form.Control
                                    id="password"
                                    placeholder="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    type='password'
                                    className={styles.control}
                                    style={{backgroundColor: "#FFEF60"}}
                                />
                            </Form.Group>

                            <Form.Group style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Form.Label style={{ marginRight: "10px" }}>ยืนยันรหัสผ่าน :</Form.Label>
                                <Form.Control
                                    id="con-password"
                                    placeholder="confirm password"
                                    onChange={(e) => setConpassword(e.target.value)}
                                    type='password'
                                    className={styles.control}
                                    style={{backgroundColor: "#FFEF60"}}
                                />
                            </Form.Group>

                            <Form.Group style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Form.Label style={{ marginRight: "10px" }}>อีเมล :</Form.Label>
                                <Form.Control
                                    id="email"
                                    placeholder="example@email.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    type='email'
                                    className={styles.control}
                                    style={{backgroundColor: "#FFEF60"}}
                                />
                            </Form.Group>

                            <div style={{marginTop: "10px", fontSize: "20px", fontWeight: "bold", marginBottom: "10px"}}>
                                ที่อยู่การจัดส่ง
                            </div>

                            <Form.Group style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <Form.Label style={{ marginRight: "10px" }}>ชื่อ :</Form.Label>
                                <Form.Control
                                    id="firstname"
                                    placeholder="firstname"
                                    onChange={(e) => setFirstname(e.target.value)}
                                    type='text'
                                    className={styles.control}
                                    style={{backgroundColor: "#FFEF60"}}
                                />
                            </Form.Group>

                            <Form.Group style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Form.Label style={{ marginRight: "10px" }}>นามสกุล :</Form.Label>
                                <Form.Control
                                    id="lastname"
                                    placeholder="lastname"
                                    onChange={(e) => setLastname(e.target.value)}
                                    type='text'
                                    className={styles.control}
                                    style={{backgroundColor: "#FFEF60"}}
                                />
                            </Form.Group>

                            <Form.Group style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Form.Label style={{ marginRight: "10px" }}>ที่อยู่ :</Form.Label>
                                <Form.Control
                                    id="location"
                                    placeholder="location"
                                    onChange={(e) => setLocation(e.target.value)}
                                    type='text'
                                    // as="textarea" 
                                    // rows={3}
                                    className={styles.control}
                                    style={{backgroundColor: "#FFEF60"}}
                                />
                            </Form.Group>

                        </div>
                    </div>

                    <div>
                        <button style={{ marginTop: "20px", padding: "10px", borderStyle: "hidden", borderRadius: "10px", backgroundColor: "#FFEF60" }} onClick={() => handleSubmit()}>
                            ยืนยันการสมัคร
                        </button>
                        <button style={{ marginTop: "20px", padding: "10px", borderStyle: "hidden", borderRadius: "10px", backgroundColor: "#FFEF60", marginLeft: "20px" }} onClick={() => back()}>
                            ย้อนกลับ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPc;