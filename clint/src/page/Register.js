import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useWindowWidth from '../componet/Check_size';
import Footers from '../componet/Footerbar';
import styles from '../css/CssRegis.module.css'
import { Form, Container, Image } from 'react-bootstrap';


const Register = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [conpassword, setConpassword] = useState()


    const windowWidth = useWindowWidth();

    const handleSubmit = async (e) => {

    }

    return (
        <div className={styles.set_pos}>

            <Form onSubmit={handleSubmit} className={styles.Formlogin}>

                <div style={{ display: "flex", alignItems: "center", flexDirection: "column", margin: "10px" }}>

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className={styles.text}>
                            Username
                        </div>
                        <div>
                            <Form.Control
                                id="username"
                                placeholder="username"
                                type='text'
                                onChange={(e) => setUsername(e.target.value)}
                                className={styles.control}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: "10px" }}>
                        <Form.Control
                            id="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            className={styles.control}
                        />
                    </div>

                    <div style={{ marginTop: "10px" }}>
                        <Form.Control
                            id="password"
                            placeholder="confirm password"
                            onChange={(e) => setConpassword(e.target.value)}
                            type='password'
                            className={styles.control}
                        />
                    </div>

                </div>

            </Form>

            {windowWidth < 450 && <Footers />}
        </div>
    )
}

export default Register;