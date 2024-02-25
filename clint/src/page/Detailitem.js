import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { useAuth } from '../componet/AuthContext';
import styles from '../css/CssDetail.module.css'
import axios from 'axios';
import useWindowWidth from '../componet/Check_size';
import Footers from '../componet/Footerbar';


const Detail = () => {
    const windowWidth = useWindowWidth();
    const { id, durian } = useParams()
    const { token, Addcart } = useAuth()
    const navigate = useNavigate()
    const [infomation, setInfomation] = useState()
    const [datalist, setDatalist] = useState([])
    const [num, setNum] = useState(0);

    const listdurian = durian.split(",")

    const minus = () => {
        if (num > 0) {
            setNum(prevNum => prevNum - 1);
        }
    }

    const plus = () => {
        setNum(prevNum => prevNum + 1);
    }

    const show = async () => {
        try {
            const result = await axios.post('http://localhost:1337/api/detail', {
                Id: [id]
            })
            const requests = listdurian.map((item) => {
                return axios.post('http://localhost:1337/api/detail', {
                    Id: [item]
                });
            });
            const responses = await Promise.all(requests);
            const dataListFromResponses = responses.map(res => res.data[0]);
            setDatalist(dataListFromResponses);

            console.log("DatalistDurian", dataListFromResponses);
            console.log(id);
            console.log(result.data[0]);
            setInfomation(result.data[0]);
        } catch (err) {
            console.error(err);
        }
    }

    const add = async () => {
        try {
            Addcart([id, num])
        } catch (err) {
            console.error(err);
        }
    }

    const Change = (id) => {
        console.log(id)
        navigate(`/Detail/${durian}/${id}`)
        window.location.reload();
    }

    useEffect(() => {
        show();
    }, [])

    return (
        <div className={styles.set_pos}>
            {infomation && (
                <div className={styles.box}>
                    {infomation.Picture ? (
                        <img className={styles.size_img} src={"http://localhost:1337" + infomation.Picture.url} />
                    ) : (
                        <img className={styles.size_img} src='/noimg.png' />
                    )}
                    <div className={styles.box_inside}>
                        <div style={{ padding: "15px" }}>
                            <div className={styles.text_head_inside}>
                                {infomation.Category}<br />
                                ราคา : {infomation.Price} บาท
                            </div>
                            <div className={styles.text_body_inside}>
                                สินค้าคงเหลือ : {infomation.Amount}
                            </div>
                        </div>

                        <div className={styles.describ}>
                            <div className={styles.text_describ}>
                                รายละเอียด : {infomation.Descriptions}
                            </div>
                            <div className={styles.text_body_inside} style={{ width: "fit-content", marginTop: "10px" }}>
                                สั่งซื้อ
                            </div>
                            <div className={styles.set_pos_r}>
                                <img className={styles.size_img2} src='/minus.png' onClick={() => minus()} />
                                <div className={styles.box_num}>
                                    {num}
                                </div>
                                <img className={styles.size_img2} src='/plus.png' onClick={() => plus()} />
                            </div>
                            <div className={styles.set_pos_r}>
                                <button className={styles.button_s} onClick={() => add()}>เพิ่มลงในตะกร้า</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box_date}>
                        วันที่วางจำหน่าย
                    </div>
                    <Form.Select className={styles.size_select} onChange={(event) => Change(event.target.value)}>
                        {datalist && datalist.slice().reverse().map((item) => (
                            <option key={item.id} value={item.id}>
                                {new Date(item.PostDate).toLocaleString("th-TH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: false,
                                })}
                            </option>
                        ))}
                    </Form.Select>
                </div>
            )}

            {windowWidth < 450 && <Footers />}
        </div>
    )
}

export default Detail;
