import React, { useState } from 'react';
import { Form, Container, Image } from 'react-bootstrap';
import styles from '../css/CssUser.module.css'
import Footers from '../componet/Footerbar';
import NavbarHead from '../componet/Navbar';


const UserProfile = () => {
    return (
        <div className={styles.set_pos}>

            <div className={styles.pos_img}>
                <img src="user.png" className={styles.userimg} style={{ layout: "fill" }} />
            </div>

            <div className={styles.box}>

                <div className={styles.box_inside_profile}>
                    <div className={styles.box_inside_text}>
                        
                    </div>
                </div>

                <div className={styles.box_inside_history} >
                    <div className={styles.text_head_history}>
                        ประวัติ - สถานะการจัดส่ง
                    </div>

                    <div className={styles.score_line}>
                        <div className={styles.body_history}>
                            <div className={styles.text_body_history}>
                                สวนนายดำ สั่งวันที่ : xx/xx/xx จำนวน : xx กิโลกรัม <br />
                                ราคา : xx บาท สถานะ : อยู่ระหว่างการจัดส่ง
                            </div>
                        </div>

                        <div className={styles.body_history}>
                            <div className={styles.text_body_history}>
                                สวนนายดำ สั่งวันที่ : xx/xx/xx จำนวน : xx กิโลกรัม <br />
                                ราคา : xx บาท สถานะ : อยู่ระหว่างการจัดส่ง
                            </div>
                        </div>

                        <div className={styles.body_history}>
                            <div className={styles.text_body_history}>
                                สวนนายดำ สั่งวันที่ : xx/xx/xx จำนวน : xx กิโลกรัม <br />
                                ราคา : xx บาท สถานะ : อยู่ระหว่างการจัดส่ง
                            </div>
                        </div>

                        <div className={styles.body_history}>
                            <div className={styles.text_body_history}>
                                สวนนายดำ สั่งวันที่ : xx/xx/xx จำนวน : xx กิโลกรัม <br />
                                ราคา : xx บาท สถานะ : อยู่ระหว่างการจัดส่ง
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* <Footers /> */}
        </div>
    )
}

export default UserProfile;