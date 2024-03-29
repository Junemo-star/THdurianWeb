import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../componet/AuthContext';
import { Helmet } from "react-helmet";
import NavbarHead from '../componet/Navbar';
import styles from '../css/CssLogin.module.css'
import Footers from '../componet/Footerbar';
import axios from 'axios';
import useWindowWidth from '../componet/Check_size';
import Urlconfig from '../config';
import '../css/style.css'

const LoginApp = () => {
    const head = Urlconfig.serverUrlPrefix;
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const { setRole } = useAuth();
    const windowWidth = useWindowWidth();
    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitEnabled(false);

        try {
            let result = await axios.post(head+'/api/auth/local', {
                identifier: username,
                password: password
            })

            //เก็บ jwt ในฟังก์ชั่นเพื่อเรียกใช้งานในหน้า component อื่น
            const saveTokenToLocalStorage = (tokenn) => {
                localStorage.setItem('jwtToken', tokenn);        //เก็บ jwt token
            }
            console.log(result.data.jwt)
            saveTokenToLocalStorage(result.data.jwt)

            //เช็ค role
            result = await axios.get(head+'/api/users/me?populate=role', {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                }
              })

            if (result.data.role) {

                localStorage.setItem('userRole', result.data.role.name)
                localStorage.setItem('username', username)
                setRole(localStorage.getItem('userRole'));

                if (result.data.role.name === 'Admin') {
                    navigate('/PageAdmin');
                } else {
                    navigate('/')
                }

            }
            console.log(result)
        } catch (e) {
            console.log(e)
            console.log('wrong username & password')
            setSubmitEnabled(true);
            messageApi.open({
                type: 'warning',
                content: 'ข้อมูลไม่ถูกต้อง',
                duration: 3
            });
        }
    }

    const Regis = () => {
        if (windowWidth > 450){
            navigate("/Registers")
        } else {
            navigate("/Register")
        }
    }

    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>

            {contextHolder}

            {windowWidth > 450 && <NavbarHead />}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column", padding: "0px" }}>
                <Form onSubmit={handleSubmit} className={styles.Formlogin}>
                    <div style={{ color: "white", fontSize: "60px" }}>
                        Login
                    </div>
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", margin: "10px" }}>
                        <div>
                            <Form.Control
                                id="username"
                                placeholder="username"
                                style={{ borderRadius: "25px", width: "282px", height: "44", padding: "8px ", backgroundColor: "#FFEF60" }}
                                type='text'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <Form.Control
                                id="password"
                                placeholder="password"
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ borderRadius: "25px", width: "282px", height: "44", padding: "8px ", backgroundColor: "#FFEF60" }}
                                type='password'
                            />
                        </div>
                    </div>
                    <div style={{marginTop: "10px", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <button className={styles.buttonlogin_re_lo} style={{backgroundColor: "#FFEF60", borderStyle: "hidden", fontWeight: "bold", display: 'flex', flexDirection: "column", justifyContent: "center", }}>เข้าสู่ระบบ</button>
                        <Link style={{marginTop: "10px", color: "white"}} onClick={() => Regis()}>ยังไม่มีบัญชี ?</Link>
                    </div>
                </Form>
                {windowWidth < 450 && <Footers />}
            </div>
        </div>
    )
}

export default LoginApp;
