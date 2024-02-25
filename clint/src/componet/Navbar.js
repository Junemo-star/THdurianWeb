import React, { useState, useEffect } from 'react';
import { Container, Form, Nav, Navbar, Button } from 'react-bootstrap';
import Modaldurian from './Modal';
import { useAuth } from './AuthContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function NavbarHead() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()
    const { userRole, setRole } = useAuth();

    const handleCloseModal = () => setShowModal(false);
    const Search = () => setShowModal(true);
    const homee = () => navigate('/')

    const user = () => {
        console.log("-----------------")
        console.log(userRole)
        if (userRole === 'Customer') {
            navigate('/User');
        } else if (userRole === 'Farmer') {
            navigate('/Gardener')
        } else {
            navigate('/Login')
        }
    }

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
        <Navbar expand="xxl" className="bg-body-tertiary" style={{ width: "100%", fontWeight: "bold" }}>
            <Container fluid>
                <Navbar.Brand href="#">
                    <img
                        alt=""
                        src="/logotitle.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Thaidurian
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={() => homee()}>Home</Nav.Link>
                        <Nav.Link >Cart</Nav.Link>
                        <Nav.Link >Delivery</Nav.Link>
                    </Nav>
                    <Form className="d-flex" >
                        <Button variant="outline-success" style={{display: "flex", justifyContent: "center", alignItems: "center"}} onClick={() => Search()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                            <span style={{marginLeft: "10px"}}>Search</span>
                        </Button>
                    </Form>
                    {userRole
                        ?
                        <Form className="d-flex" style={{display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "10px"}}>
                            <Button variant="outline-success" onClick={() => user()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg>
                                <span style={{marginLeft: "10px"}}>User</span>
                            </Button>
                        </Form>
                        :
                        <Form className="d-flex" style={{ marginLeft: "10px" }}>
                            <Button variant="outline-success" onClick={() => user()}>Login</Button>
                        </Form>
                    }
                    {userRole
                        ?
                        <Form className="d-flex" style={{ marginLeft: "10px" }}>
                            <Button variant="outline-danger" onClick={() => handleLogout()}>Logout</Button>
                        </Form>
                        : null}
                </Navbar.Collapse>
            </Container>

            <Modaldurian show={showModal} handleClose={() => handleCloseModal()} />
        </Navbar>
    );
}

export default NavbarHead;