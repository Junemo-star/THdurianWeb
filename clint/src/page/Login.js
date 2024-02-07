import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';

const LoginApp = () => {
    return (
        <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            
            <div style={{
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
                        <input placeholder='username' style={{borderRadius: "25px", width: "282px", height: "44", padding: "8px "}}></input>
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <input placeholder='password' style={{borderRadius: "25px", width: "282px", height: "44", padding: "8px "}}></input>
                    </div>
                </div>

                <div>
                    <button style={{marginRight: "10px"}}>submit</button>
                    <button>register</button>
                </div>

            </div>
        </div>
    )
}

export default LoginApp;
