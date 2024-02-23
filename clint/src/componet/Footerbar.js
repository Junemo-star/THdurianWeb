import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../css/CssFooterbar.module.css'
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './AuthContext';
import Modaldurian from './Modal';

const Footers = () => {
    const { userRole } = useAuth();
    const navigate = useNavigate()
    const role = localStorage.getItem('userRole')
    const [showModal, setShowModal] = useState(false);
    const [selectedDurianType, setSelectedDurianType] = useState(null);
    
    const handleCloseModal = () => setShowModal(false);

    // const choosedu = (durianType) => {
    //     setSelectedDurianType(durianType);
    //     // console.log("fuck")
    // }


    const user = () => {
        console.log(role)
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

    const homee = () => {
        navigate('/')
    }

    const delivery = () => {
        console.log(role)
        console.log("-----------------")
        console.log(userRole)
        if (userRole === 'Customer') {
            navigate('/Delivery');
        }else {
            navigate('/Login')
        }
    }

    const Search = () => {
        setShowModal(true)
    }
    
    return (
        <footer className={styles.footer}>

            <Link className={styles.no_underline} onClick={() => user()}>
                <div className={styles.setting_pos}>
                    <img src='/user.png' className={styles.imgfooter} />
                    <div style={{color: "white"}}>
                        User
                    </div>
                </div>
            </Link>

            <div className={styles.setting_pos}>
                <img src='/search.png' className={styles.imgfooter} style={{ padding: "5px" }} onClick={() => Search()}/>
                <div >
                    Search
                </div>
            </div>

            <Link className={styles.no_underline} onClick={() => homee()}>
                <div className={styles.setting_pos}>
                    <img src='/Home.png' className={styles.imgfooter} style={{ padding: "5px" }} />
                    <div style={{color: "white"}}>
                        Home
                    </div>
                </div>
            </Link>

            <div className={styles.setting_pos}>
                <img src='/cart.png' className={styles.imgfooter} style={{ padding: "5px" }} />
                <div >
                    Cart
                </div>
            </div>

            <div className={styles.setting_pos} onClick={() => delivery()}>
                <img src='/car.png' className={styles.imgfooter} style={{ padding: "5px" }} />
                <div >
                    Delivery
                </div>
            </div>

            <Modaldurian show={showModal} handleClose={handleCloseModal}/>
        </footer>
    )
}

export default Footers;