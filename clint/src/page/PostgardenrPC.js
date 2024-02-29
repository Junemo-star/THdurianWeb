import React, { useState, useEffect, cloneElement } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../componet/AuthContext';
import useWindowWidth from '../componet/Check_size';
import NavbarHead from '../componet/Navbar';
import { Helmet } from "react-helmet";
import styles from '../css/CssUsergardenPc.module.css'
import { Form } from 'react-bootstrap';


const PostgardenPC = () => {
    const [species, setSpecies] = useState([]);
    const [success, setSuccess] = useState(false)
    const { token } = useAuth()
    const [idSpecies, setIdSpecies] = useState()
    const [image, setImage] = useState(null);
    const [detail, setDetail] = useState();
    const [note, setNote] = useState()
    const [location, setLocation] = useState()
    const [amount, setAmount] = useState()
    const [price, setPrice] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:1337/api/categories", token
        ).then((response) => {
            const filterdata = response.data.data.filter(item => item.attributes.durianType)
            setSpecies(filterdata)
        }).catch((error) => console.log(error))
    }, [])

    const handleChange = (e) => {
        console.log(e.target.files);

        setImage(e.target.files[0])
    }

    const back = () => {
        navigate("/Gardeners")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('files', image, image.name);
        console.log(formData)

        const response = await axios.post('http://localhost:1337/api/upload/',
            formData
        );

        console.log('File uploaded successfully:', response.data);
        const pictureId = response.data[0].id
        console.log(pictureId)
        try {
            let result = await axios.post("http://localhost:1337/api/farm-post-news", {

                note: note,
                amount: amount,
                location: location,
                price: price,
                descriptions: detail,
                categoryID: idSpecies,
                pictureId: pictureId
            }, token);
            setSuccess(true)
            console.log("success");
            window.location.reload()
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <Helmet>
                <title>Post</title>
                {/* <meta name="description" content="Helmet application" /> */}
            </Helmet>
            <NavbarHead />

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh" }}>
                <div style={{ width: "1000px", height: "600px", backgroundColor: "#697E50", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px", flexDirection: "column" }}>
                    <div style={{ color: "white", fontSize: "30px", marginBottom: "10px" }}>โพสสินค้า</div>

                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: '100%' }}>
                        <div style={{ overflow: "hidden", width: "150px", height: "150px", position: "relative", borderRadius: "10px", borderStyle: "hidden", backgroundColor: "#FFEF60", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                            {/* <img src="user.png" style={{ layout: "fill", width: "50px", height: "50px" }} /> */}
                            <input
                                type="file"
                                accept="image/*"
                                name='file'
                                onChange={handleChange}
                                style={{ width: "100%", height: "100%", position: "absolute", top: "0", left: "0", opacity: "0", cursor: "pointer" }}
                            />
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#8F3E00" class="bi bi-image" viewBox="0 0 16 16" >
                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                            </svg><br />
                            <h6>อัพโหลดรูปภาพ</h6>
                            </div>
                        </div>

                        <div style={{ width: "500px", color: "white" }}>
                            <div style={{ display: "flex", marginTop: "10px" }}>
                                <span style={{ marginRight: "10px" }}>พันธุ์เรียน :</span>
                                <Form.Select onChange={(e) => setIdSpecies(e.target.value)} style={{ width: "250px", backgroundColor: "#FFEF60" }}>
                                    <option>เลือกสายพันธุ์</option>
                                    {species && species?.map(({ id, attributes }) => (
                                        <option key={id} value={id}>{attributes.durianType}</option>
                                    ))}
                                </Form.Select>
                            </div>

                            <div style={{ marginTop: "20px" }}>
                                ราคา : <input
                                    type='number'
                                    style={{ marginRight: '10px', borderRadius: "10px", borderStyle: "hidden", backgroundColor: "#FFEF60", color: "black", padding: "10px" }}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div style={{ marginTop: "20px" }}>
                                จำนวน : <input
                                    style={{ borderRadius: "10px", borderStyle: "hidden", backgroundColor: "#FFEF60", color: "black", padding: "10px" }}
                                    type='number'
                                    onChange={(e) => setAmount(e.target.value)} />
                            </div>

                            <div style={{ marginTop: "20px", display: "flex" }}>
                                <span style={{ marginRight: "10px" }}>รายละเอียด : </span>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    style={{ borderStyle: "hidden", width: "250px", backgroundColor: "#FFEF60" }}
                                    placeholder='รายละเอียด : '
                                    onChange={(e) => setDetail(e.target.value)}
                                />
                            </div>

                            <div style={{ marginTop: "20px", display: "flex" }}>
                                <span style={{ marginRight: "10px" }}>note : </span>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    style={{ borderStyle: "hidden", width: "250px", backgroundColor: "#FFEF60" }}
                                    placeholder='note : '
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </div>

                            <div style={{ marginTop: "20px", display: "flex" }}>
                            <span style={{ marginRight: "10px" }}>location : </span>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                style={{ borderStyle: "hidden", width: "250px", backgroundColor: "#FFEF60" }}
                                placeholder='location : '
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <button style={{ backgroundColor: "#FFEF60", padding: "10px", borderRadius: "10px", borderStyle: "hidden" }} onClick={handleSubmit}>
                            ยืนยันการโพส
                        </button>
                        <button style={{ backgroundColor: "#FFEF60", padding: "10px", borderRadius: "10px", borderStyle: "hidden", marginLeft: "10px" }} onClick={() => back()}>
                            ย้อนกลับ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostgardenPC;