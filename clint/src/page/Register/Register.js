import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useWindowWidth from '../../componet/Check_size';
import Footers from '../../componet/Footerbar';
import styles from '../../css/CssRegis.module.css'
import { Form, Container, Image } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


const Register = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [conpassword, setConpassword] = useState()
    const [email, setEmail] = useState()
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [location, setLocation] = useState()
    
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    const windowWidth = useWindowWidth();

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            let result = await axios.post("http://localhost:1337/api/users", {
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
        } catch (e) {
            console.log(e);
            console.log("wrong username & password");
        }

        if (success === true){
            setSuccess(false)
            navigate("/Login")
        }  
    }

    const back = () => {
        navigate("/Login")
    }

    return (
        <div className={styles.set_pos}>
            <Helmet>
                <title>Register</title>
                {/* <meta name="description" content="Helmet application" /> */}
            </Helmet>

            <Form onSubmit={handleSubmit} className={styles.Formlogin}>

                <div style={{ display: "flex", alignItems: "center", flexDirection: "column", margin: "10px" }}>

                    <h2 style={{marginBottom: "20px", color: "white", fontWeight: "bold", }}>Register</h2>

                    <Form.Group className={styles.text}>
                        <Form.Label style={{margin: "0px"}}>Username</Form.Label>
                        <Form.Control
                            id="username"
                            placeholder="username"
                            type='text'
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.control}
                        />
                    </Form.Group>

                    <Form.Group className={styles.text} style={{ marginTop: "10px" }}>
                        <Form.Label style={{margin: "0px"}}>Password</Form.Label>
                        <Form.Control
                            id="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            className={styles.control}
                        />
                    </Form.Group>

                    <Form.Group className={styles.text} style={{ marginTop: "10px" }}>
                        <Form.Label style={{margin: "0px"}}>Confirm password</Form.Label>
                        <Form.Control
                            id="con-password"
                            placeholder="confirm password"
                            onChange={(e) => setConpassword(e.target.value)}
                            type='password'
                            className={styles.control}
                        />
                    </Form.Group>

                    <Form.Group className={styles.text} style={{ marginTop: "10px" }}>
                        <Form.Label style={{margin: "0px"}}>Email</Form.Label>
                        <Form.Control
                            id="email"
                            placeholder="example@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                            type='email'
                            className={styles.control}
                        />
                    </Form.Group>

                    <Form.Group className={styles.text} style={{ marginTop: "10px" }}>
                        <Form.Label style={{margin: "0px"}}>firstname</Form.Label>
                        <Form.Control
                            id="firstname"
                            placeholder="firstname"
                            onChange={(e) => setFirstname(e.target.value)}
                            type='text'
                            className={styles.control}
                        />
                    </Form.Group>

                    <Form.Group className={styles.text} style={{ marginTop: "10px" }}>
                        <Form.Label style={{margin: "0px"}}>lastname</Form.Label>
                        <Form.Control
                            id="lastname"
                            placeholder="lastname"
                            onChange={(e) => setLastname(e.target.value)}
                            type='text'
                            className={styles.control}
                        />
                    </Form.Group>

                    <Form.Group className={styles.text} style={{ marginTop: "10px" }}>
                        <Form.Label style={{margin: "0px"}}>location</Form.Label>
                        <Form.Control
                            id="location"
                            placeholder="location"
                            onChange={(e) => setLocation(e.target.value)}
                            type='text'
                            // as="textarea" 
                            // rows={3}
                            className={styles.control}
                        />
                    </Form.Group>

                </div>
                
                <div style={{marginTop: "9px"}}>
                    <button className={styles.botton_box} style={{marginRight: "15px"}}>ยืนยันการสมัคร</button>
                    <button className={styles.botton_box} onClick={() => back()}>ย้อนกลับ</button>
                </div>

            </Form>

        </div>
    )
}

export default Register;