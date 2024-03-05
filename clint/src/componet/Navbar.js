import React, { useState, useEffect } from 'react';
import { Container, Form, Nav, Navbar, Button } from 'react-bootstrap';
import Modaldurian from './Modal';
import { useAuth } from './AuthContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Logout from '../page/Logout';
import Delivery from '../page/Delivery/Delivery';

function NavbarHead() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()
    const { userRole, setRole } = useAuth();

    const handleCloseModal = () => setShowModal(false);
    const Search = () => setShowModal(true);
    const homee = () => navigate('/')

    const user = () => {
        if (userRole === 'Customer') {
            navigate('/Users');
        } else if (userRole === 'Farmer') {
            navigate('/Gardeners')
        } else {
            navigate('/Login')
        }
    }

    const cart = () => {
        navigate('/Status')
    }

    const handleLogout = () => {
        // Remove JWT Token from Local Storage
        window.localStorage.removeItem("jwtToken");
        localStorage.removeItem("userRole")
        // Clear Authorization Header in Axios Defaults
        axios.defaults.headers.common.Authorization = "";
        setRole("")
        // Navigate to the "/" path (adjust this if using a different routing library)
        navigate("/");
    }

    const Delivery = () => {
        navigate("/Deliverys")
    }

    return (
        <Navbar expand="xxl" style={{ width: "100%", fontWeight: "bold", backgroundColor: "#697E50" }}>
            <Container fluid style={{ justifyContent: "space-around" }}>
                <Navbar.Brand href="#" style={{ color: "white" }} onClick={() => homee()}>
                    <img
                        alt=""
                        src="/logotitle.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Thaidurian
                </Navbar.Brand>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button variant="light" style={{ display: "flex", justifyContent: "end", alignItems: "center", width: "600px", backgroundColor: 'white' }} onClick={() => Search()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                        {/* <span style={{ marginLeft: "10px" }}>Search</span> */}
                    </Button>

                    <Button variant="light" onClick={() => cart()} style={{ marginLeft: "10px", maxHeight: "29.6px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                        {/* <span style={{ marginLeft: "10px" }}>Search</span> */}
                    </Button>
                </div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {userRole
                        ?
                        <Form className="d-flex" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "10px" }}>
                            <Button style={{ backgroundColor: "#FFEF60", color: "black", borderStyle: "hidden", maxHeight: "29.6px", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => user()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg>
                                <span style={{ marginLeft: "10px" }}>{localStorage.getItem('username')}</span>
                            </Button>
                        </Form>
                        :
                        <Form className="d-flex" style={{ marginLeft: "10px" }}>
                            <Button style={{ backgroundColor: "#FFEF60", color: "black", borderStyle: "hidden", maxHeight: "29.6px", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => user()}>
                                เข้าสู่ระบบ
                            </Button>
                        </Form>
                    }
                    {userRole
                        ?
                        <Form className="d-flex" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "10px" }}>
                            <Button style={{ backgroundColor: "#FFEF60", color: "black", borderStyle: "hidden", maxHeight: "29.6px", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => Delivery()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box2-fill" viewBox="0 0 16 16">
                                    <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zM15 4.667V5H1v-.333L1.5 4h6V1h1v3h6z" />
                                </svg>
                                <span style={{ marginLeft: "10px" }}>สถานะการจัดส่ง</span>
                            </Button>
                        </Form>
                        : null
                    }
                    {userRole
                        ?
                        <Form className="d-flex" style={{ marginLeft: "10px" }}>
                            <Button style={{ backgroundColor: "#FFEF60", color: "black", borderStyle: "hidden", maxHeight: "29.6px", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => handleLogout()}>
                                ออกจากระบบ
                            </Button>
                        </Form>
                        : null}
                </div>
            </Container>

            <Modaldurian show={showModal} handleClose={() => handleCloseModal()} />
        </Navbar>
    );
}

export default NavbarHead;