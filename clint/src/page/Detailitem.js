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
    const [num, setNum] = useState(0);



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
            console.log(result.data[0])
            setInfomation(result.data[0])
        } catch (err) {
            console.error(err);
        }
    }

    const add = async () => {
        try {
            const iddurian = [id, num]
            const existing = localStorage.getItem('cart');
            const existingDataArray = JSON.parse(existing);
            existingDataArray.push(iddurian)
            const updatedDataAsString = JSON.stringify(existingDataArray);
            localStorage.setItem('cart', updatedDataAsString);
            // console.log(existi   ngDataAsString)
            // localStorage.setItem('cart', Arrdurian);
            // const existingDataAsString = localStorage.getItem('cart');
            // console.log(existingDataAsString)

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        show();
    }, [])

    return (
        <div className={styles.set_pos}>
            {console.log(infomation)}

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
                </div>
            )}

            {windowWidth < 450 && <Footers />}
        </div>
    )
}

export default Detail;
