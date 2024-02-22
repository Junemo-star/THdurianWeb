import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import styles from '../css/CssModal.module.css'
import axios from 'axios';



const Modaldurian = ({ show, handleClose, durian }) => {
    const [thetime, setThetime] = useState()

    const data = (id) => {
        axios.get(`http://localhost:1337/api/farm-post-news/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                // สามารถเพิ่ม header อื่น ๆ ตามต้องการได้
            }
        }).then((item) => {
            const timeString = item.data.data.attributes.date
            const tim = new Date(timeString);
            const formattedDate = tim.toLocaleString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false,
            });
            setThetime(formattedDate)
        }).catch((error) => console.log(error))
    
        return (
            <h4>{thetime}</h4>
        )
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                {console.log("-------", durian)}
                <Modal.Header closeButton>
                    <Modal.Title>รายการการขาย</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {durian.map((item) => (
                        <div style={{ display: "flex" }}>
                            <button className={styles.button_i}>{data(item)}</button>
                        </div>
                    ))}
                </Modal.Body>

                <Modal.Footer>
                    <button onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Modaldurian;