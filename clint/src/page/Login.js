import React, { useState } from 'react';
import { Form, Container, Image } from 'react-bootstrap';
import '../css/CssLogin.css'

const LoginApp = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = async (e) => {
        
    }

    return (
        <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
            
            <div style={{position: "relative", top: "10%"}}>
                <Image src="user.png" className="userimg" style={{layout: "fill"}}/>
            </div>
            
            <Form onSubmit={handleSubmit} className='Formlogin'>

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
                    <button className='buttonlogin-re-lo' style={{marginRight: "20px"}}>submit</button>
                    <button className='buttonlogin-re-lo'>register</button>
                </div>

            </Form>
        </Container>
    )
}

export default LoginApp;
