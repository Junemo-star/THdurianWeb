import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../css/CssFooterbar.module.css'
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './AuthContext';


const Footers = () => {
    const { userRole } = useAuth();
    const navigate = useNavigate()
    const role = localStorage.getItem('userRole')

    const user = () => {
        console.log(role)
        console.log("-----------------")
        console.log(userRole)
        if (userRole === 'Customer') {
            navigate('/User');
        }
        if (userRole === 'Farmer') {
            navigate('/Gardener')
        }
        if (userRole === null) {
            navigate('/Login')
        }
    }

    const homee = () => {
        navigate('/')
    }


    return (
        <footer className={styles.footer}>

            <Link className={styles.no_underline} onClick={() => user()}>
                <div className={styles.setting_pos}>
                    <img src='user.png' className={styles.imgfooter} />
                    <div style={{color: "white"}}>
                        User
                    </div>
                </div>
            </Link>

            <div className={styles.setting_pos}>
                <img src='search.png' className={styles.imgfooter} style={{ padding: "5px" }} />
                <div >
                    Search
                </div>
            </div>

            <Link className={styles.no_underline} onClick={() => homee()}>
                <div className={styles.setting_pos}>
                    <img src='Home.png' className={styles.imgfooter} style={{ padding: "5px" }} />
                    <div style={{color: "white"}}>
                        Home
                    </div>
                </div>
            </Link>

            <div className={styles.setting_pos}>
                <img src='cart.png' className={styles.imgfooter} style={{ padding: "5px" }} />
                <div >
                    Cart
                </div>
            </div>

            <div className={styles.setting_pos}>
                <img src='car.png' className={styles.imgfooter} style={{ padding: "5px" }} />
                <div >
                    Delivery
                </div>
            </div>
        </footer>
    )
}

export default Footers;