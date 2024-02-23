import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import styles from '../css/CssModal.module.css'
import axios from 'axios';
import { Card, Form, FormControl, Button } from "react-bootstrap";
import { useAuth } from './AuthContext';


const Modaldurian = ( {show, handleClose} ) => {
    const { token } = useAuth
    const [search, setSearch] = useState('')
    const [durinaType, setDurianType] = useState([])
    
    const fetchItems = async () => {
        const response = await axios.get("http://localhost:1337/api/categories", token)
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
                <Modal.Body>
                    <div style={{ display: "flex" }}>
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
                    <button onClick={handleClose}>
                        Close
                    </button>
                    <button onClick={() => reset()}>
                        ล้างการค้นหา
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Modaldurian;