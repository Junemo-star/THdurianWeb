import React, { useEffect, useState } from 'react';
import styles from '../css/CssPost.module.css'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import Footers from '../componet/Footerbar';
import { useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap';
import axios from 'axios';

const PostGarden = () => {
    const [species, setSpecies] = useState([]);
    const [success, setSuccess] = useState(false)

    const [idSpecies, setIdSpecies] = useState()
    const [image, setImage] = useState();
    const [detail, setDetail] = useState();
    const [note, setNote] = useState()

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
        console.log("idSpecies =", idSpecies)
        console.log("image =", image)
        console.log("detail =", detail)
        console.log("note =", note)

        try {
            let result = await axios.post("http://localhost:1337/api/farm-post-news", {
                note: note,
                amount: 20,
                price: 20,
                category: idSpecies,
                descriptions: detail,
                location: "16/4 หมู่ 6 ต.ควนธานี อ.กันตัง จ.ตรัง",
                owner: 7,
                picture: image
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                    // สามารถเพิ่ม header อื่น ๆ ตามต้องการได้
                }
            });
            setSuccess(true)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={styles.set_pos}>
            <div className={styles.box}>
                <div className={styles.text}>
                    โพสขายสินค้า
                </div>

                <div className={styles.pos}>
                    <div className={styles.inside_box}>
                        <div className={styles.pos_info}>
                            <div className={styles.userimg}>
                                <img src='user.png' className={styles.img} />
                            </div>
                            <div className={styles.text2}>
                                ชื่อ : คิม คิมจองจิ <br />
                                ชื่อสวน : สวนนายดำ
                            </div>
                        </div>
                    </div>

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

                        <input type="file" accept="image/*" name='file' onChange={handleChange} className={styles.button_input} />

                        <div className={styles.text3}>

                            ราคา : <input className={styles.input_price} type='number' style={{ marginRight: '10px' }}></input>

                            จำนวน : <input className={styles.input_price} type='number'></input><br />

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