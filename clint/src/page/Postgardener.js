import React, { useEffect, useState } from 'react';
import styles from '../css/CssPost.module.css'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import Footers from '../componet/Footerbar';
import { useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { Helmet } from "react-helmet";

const PostGarden = () => {
    const [species, setSpecies] = useState([]);
    const [success, setSuccess] = useState(false)

    const [idSpecies, setIdSpecies] = useState()
    const [image, setImage] = useState(null);
    const [detail, setDetail] = useState();
    const [note, setNote] = useState()
    const [location, setLocation] = useState()
    const [amount, setAmount] = useState()
    const [price, setPrice] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                // สามารถเพิ่ม header อื่น ๆ ตามต้องการได้
            },
        };

        axios.get("http://localhost:1337/api/categories", config
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
        navigate("/Gardener")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("idSpecies =", idSpecies)
        // console.log("image =", image)
        // console.log("detail =", detail)
        // console.log("note =", note)
        // console.log(image)
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
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                    // สามารถเพิ่ม header อื่น ๆ ตามต้องการได้
                }
            });
            setSuccess(true)
            console.log("success");
            window.location.reload()
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={styles.set_pos}>
            <Helmet>
                <title>Post</title>
                {/* <meta name="description" content="Helmet application" /> */}
            </Helmet>

            <div className={styles.box}>
                <div className={styles.text}>
                    โพสขายสินค้า
                </div>

                <div className={styles.pos}>
                    <div className={styles.inside_box2}>
                        <div className={styles.upload_img}>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                style={{ borderStyle: "hidden" }}
                                placeholder='note : '
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                        <div className={styles.upload_img}>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                style={{ borderStyle: "hidden" }}
                                placeholder='location : '
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <input type="file" accept="image/*" name='file' onChange={handleChange} className={styles.button_input} />

                        <div className={styles.text3}>

                            ราคา : <input 
                                        className={styles.input_price} 
                                        type='number' style={{ marginRight: '10px' }} 
                                        onChange={(e) => setPrice(e.target.value)} />

                            จำนวน : <input 
                                        className={styles.input_price} 
                                        type='number' 
                                        onChange={(e) => setAmount(e.target.value)} /><br />

                            <div style={{ display: "flex", marginTop: "10px" }}>
                                <span style={{ marginRight: "10px" }}>พันธุ์เรียน :</span>
                                <Form.Select onChange={(e) => setIdSpecies(e.target.value)} className={styles.setting_select}>
                                    <option>เลือกสายพันธุ์</option>
                                    {species && species?.map(({ id, attributes }) => (
                                        <option key={id} value={id}>{attributes.durianType}</option>
                                    ))}
                                </Form.Select>
                            </div>
                        </div>

                        <div className={styles.inside_box3}>
                            <div className={styles.text4}>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    style={{ borderStyle: "hidden" }}
                                    placeholder='รายละเอียด : '
                                    onChange={(e) => setDetail(e.target.value)}
                                />
                            </div>
                        </div>

                        <button className={styles.button_con} onClick={handleSubmit}>
                            เพิ่มโพสการขาย
                        </button>
                    </div>
                </div>

                <div className={styles.back_pos}>
                    <button onClick={() => back()}>
                        ย้อนกลับ
                    </button>
                </div>
            </div>

        </div>
    )
}

export default PostGarden;