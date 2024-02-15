import React, { useState } from 'react';
import { Form, Container, Image } from 'react-bootstrap';
import '../css/CssLogin.css'
import NavbarHead from '../componet/Navbar';
import Footers from '../componet/Footerbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../componet/AuthContext';


const LoginApp = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const { setRole } = useAuth();

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
                }
                if (result.data.role.name === 'Farmer') {
                    navigate('/');
                }
                if (result.data.role.name === 'Admin') {
                    navigate('/');
                }
            }

            //console.log(result)
        } catch (e) {
            console.log(e)
            console.log('wrong username & password')
            setSubmitEnabled(true);
        }
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
