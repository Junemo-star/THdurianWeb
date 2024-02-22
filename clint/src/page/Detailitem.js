import React, { useState, useEffect } from 'react';
import styles from '../css/CssDetail.module.css'
import Footers from '../componet/Footerbar';
import useWindowWidth from '../componet/Check_size';
import { useParams } from "react-router-dom";
import { useAuth } from '../componet/AuthContext';
import axios from 'axios';


const Detail = () => {
    const windowWidth = useWindowWidth();
    const { id, durian } = useParams()
    const { token } = useAuth()

    const [infomation, setInfomation] = useState()

    const show = async () => {
        try {
            const response = await axios.get(`http://localhost:1337/api/farm-post-news/${id}?populate[picture]=*&populate[category]=*`, token)
            setInfomation(response.data.data)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        show();
    }, [])

    return (
        <div className={styles.set_pos}>
            {infomation && infomation.attributes.picture && (
                <div className={styles.box}>
                    {console.log(infomation)}
                    <img className={styles.size_img} src={"http://localhost:1337" + infomation.attributes.picture.data.attributes.url} />

                    <div className={styles.box_inside}>
                        <div style={{ padding: "15px" }}>
                            <div className={styles.text_head_inside}>
                                {infomation.attributes.category.data.attributes.durianType}<br />
                                ราคา : {infomation.attributes.price} บาท
                            </div>
                            <div className={styles.text_body_inside}>
                                สินค้าคงเหลือ : {infomation.attributes.amount}
                            </div>
                        </div>

                        <div className={styles.describ}>
                            <div className={styles.text_describ}>
                                รายละเอียด : {infomation.attributes.descriptions}
                            </div>
                            <div className={styles.text_body_inside} style={{ width: "fit-content", marginTop: "10px"}}>
                                สั่งซือ
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {windowWidth < 450 && <Footers />}
        </div>
    )
}

export default Detail;
