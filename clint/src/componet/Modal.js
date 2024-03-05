import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import styles from '../css/CssModal.module.css'
import axios from 'axios';
import { Card, Form, FormControl, Button } from "react-bootstrap";
import { useAuth } from './AuthContext';
import Urlconfig from '../config';


const Modaldurian = ( {show, handleClose} ) => {
    const { token } = useAuth
    const [search, setSearch] = useState('')
    const [durinaType, setDurianType] = useState([])
    const head = Urlconfig.serverUrlPrefix;
    
    const fetchItems = async () => {
        const response = await axios.get(head+"/api/categories", token)
        setDurianType(response.data.data)
    }
    
    useEffect(() => {
        fetchItems();
    }, [])

    const handleSubmit = (typedurian) => {
        sessionStorage.setItem("typedurian", typedurian)
        handleClose();
        window.location.reload()
    }

    const reset = () => {
        sessionStorage.removeItem("typedurian")
        handleClose();
        window.location.reload()
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header>
                    <FormControl onChange={(e) => setSearch(e.target.value)} placeholder="ค้นหาชื่อที่ต้องการ" className={styles.search_box}/>
                </Modal.Header>

                <Modal.Body style={{height: "auto"}}>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {durinaType.filter(({ id, attributes }) => {
                            return search === ''
                            ? attributes
                            : attributes.durianType.includes(search);
                            }).map(({id, attributes}) => (
                            <button key={id} className={styles.button_i} onClick={() => handleSubmit(attributes.durianType)}>
                                {attributes.durianType}
                            </button>
                        ))}
                    </div>
                    
                </Modal.Body>

                <Modal.Footer>
                    <button className={styles.button_modal_C} onClick={handleClose}>
                        ปิด
                    </button>
                    <button className={styles.button_modal_A} onClick={() => reset()}>
                        ล้างการค้นหา
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Modaldurian;