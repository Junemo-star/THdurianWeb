import React, { useState, useEffect } from 'react';
import { Form, Container, Image } from 'react-bootstrap';
import NavbarHead from '../componet/Navbar';
import styles from '../css/CssLogin.module.css'
import Footers from '../componet/Footerbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../componet/AuthContext';
import useWindowWidth from '../componet/Check_size';
import toast, { Toaster } from 'react-hot-toast';
import '../css/style.css'
import { Helmet } from "react-helmet";


const LoginApp = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const { setRole } = useAuth();
    const windowWidth = useWindowWidth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitEnabled(false);

        try {
            let result = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: username,
                password: password
            })

            //เก็บ jwt ในฟังก์ชั่นเพื่อเรียกใช้งานในหน้า component อื่น
            const saveTokenToLocalStorage = (token) => {
                localStorage.setItem('jwtToken', token);        //เก็บ jwt token
            }
            saveTokenToLocalStorage(result.data.jwt)

            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                },
            };

            //เช็ค role
            result = await axios.get('http://localhost:1337/api/users/me?populate=role', config)

            if (result.data.role) {

                localStorage.setItem('userRole', result.data.role.name)

                setRole(localStorage.getItem('userRole'));

                if (result.data.role.name === 'Customer') {
                    navigate('/');
                    toast.success('Successfully toasted!')
                }
                if (result.data.role.name === 'Farmer') {
                    navigate('/');
                }
                if (result.data.role.name === 'Admin') {
                    navigate('/Admin');
                }

            }
            console.log(result)
        } catch (e) {
            console.log(e)
            console.log('wrong username & password')
            setSubmitEnabled(true);
        }
    }

    const Regis = () => {
        navigate("/Register")
    }

    return (
        <div>
            <Helmet>
                <title>Login</title>
                {/* <meta name="description" content="Helmet application" /> */}
            </Helmet>

            {windowWidth > 450 && <NavbarHead />}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column", padding: "0px" }}>
                <Toaster position="top-center" reverseOrder={false} />

                <div className={styles.pos_user}>
                    <Image src="user.png" className={styles.userimg} style={{ layout: "fill" }} />
                </div>

                <Form onSubmit={handleSubmit} className={styles.Formlogin}>

                    <div style={{ color: "white", fontSize: "60px" }}>
                        Login
                    </div>

                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", margin: "10px" }}>
                        <div>
                            <Form.Control
                                id="username"
                                placeholder="username"
                                style={{ borderRadius: "25px", width: "282px", height: "44", padding: "8px " }}
                                type='text'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <Form.Control
                                id="password"
                                placeholder="password"
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ borderRadius: "25px", width: "282px", height: "44", padding: "8px " }}
                                type='password'
                            />
                        </div>
                    </div>

                    <div>
                        <button className={styles.buttonlogin_re_lo} style={{ marginRight: "20px" }}>submit</button>
                        <button className={styles.buttonlogin_re_lo} onClick={() => Regis()}>register</button>
                    </div>

                </Form>

                {windowWidth < 450 && <Footers />}

            </div>
        </div>
    )
}

export default LoginApp;
