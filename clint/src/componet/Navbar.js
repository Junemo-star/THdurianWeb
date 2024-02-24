import React, { useState, useEffect } from 'react';
import { Container, Form, Nav, Navbar, Button } from 'react-bootstrap';
import Modaldurian from './Modal';
import { useAuth } from './AuthContext';
import { useNavigate } from "react-router-dom";

function NavbarHead() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()
    const { userRole } = useAuth();

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
                        <Button variant="outline-success" onClick={() => Search()}>Search</Button>
                    </Form>
                    <Form className="d-flex" style={{marginLeft: "10px"}}>
                        <Button variant="outline-success" onClick={() => user()}>Login</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>

            <Modaldurian show={showModal} handleClose={() => handleCloseModal()} />
        </Navbar>
    );
}

export default NavbarHead;