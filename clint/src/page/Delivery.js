import React from "react"
import styles from '../css/CssDelivery.module.css'
import Footers from "../componet/Footerbar"


const Delivery =() => {
    return (
        <div className={styles.set_pos}>
            <div className={styles.box}>
                <div className={styles.text}>
                    สถานะการจัดส่งสินค้า 
                    <div className={styles.text2}>
                        สวนนายดำ <br/>
                        จำนวน : <br/>
                        ราคา : <br/>
                        สถานะ : <br/>
                    </div>
                    <div className={styles.inside_box}>
                    </div>
                </div>
            </div>
            <Footers />
        </div>
    )
}
export default Delivery;