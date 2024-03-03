import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.setItem('user', "")
        localStorage.setItem('jwtToken', "")
        navigate('/Login')  
    }, [navigate])  
    
    return null;
};

export default Logout

//* ใส่มา clear ข้อมูลใน local storage เฉยๆ