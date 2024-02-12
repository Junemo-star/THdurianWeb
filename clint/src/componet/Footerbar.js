import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../css/CssFooterbar.module.css'


const Footers = () => {
    return (
        <footer className={styles.footer}>

            <div className={styles.setting_pos}>
                <img src='user.png' className={styles.imgfooter}/>
                <div >
                    User
                </div>
            </div>

            <div className={styles.setting_pos}>
                <img src='search.png' className={styles.imgfooter} style={{padding: "5px"}}/>
                <div >
                    Search
                </div>
            </div>

            <div className={styles.setting_pos}>
                <img src='Home.png' className={styles.imgfooter} style={{padding: "5px"}}/>
                <div >
                    Home
                </div>
            </div>

            <div className={styles.setting_pos}>
                <img src='cart.png' className={styles.imgfooter} style={{padding: "5px"}}/>
                <div >
                    Cart
                </div>
            </div>

            <div className={styles.setting_pos}>
                <img src='car.png' className={styles.imgfooter} style={{padding: "5px"}}/>
                <div >
                    Delivery
                </div>
            </div>
        </footer>
    )
}

export default Footers;