import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';

const LoginApp = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = async (e) => {
        
    }

    return (
        <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            
            <Form onSubmit={handleSubmit} style={{
                backgroundColor: "#568203",
                margin: "20px 20px 20px 20px",
                borderRadius: "25px",
                border: "None",
                width: "334px",
                height: '376px',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>

                <div style={{color: "white", fontSize: "60px"}}>
                    Login
                </div>

                <div style={{display: "flex", alignItems: "center", flexDirection: "column", margin: "10px"}}>
                    <div>
                        <Form.Control 
                            id="username" 
                            placeholder="username" 
                            style={{borderRadius: "25px", width: "282px", height: "44", padding: "8px "}}
                            type='text'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <Form.Control 
                            id="password" 
                            placeholder="password" 
                            onChange={(e) => setPassword(e.target.value)} 
                            style={{borderRadius: "25px", width: "282px", height: "44", padding: "8px "}}
                            type='password'
                        />
                    </div>
                </div>

                <div>
                    <button style={{borderRadius: "25px", width: "91px", height: "34", padding: "8px ", marginRight: "20px"}}>submit</button>
                    <button style={{borderRadius: "25px", width: "91px", height: "34", padding: "8px "}}>register</button>
                </div>

            </Form>
        </Container>
    )
}

export default LoginApp;
