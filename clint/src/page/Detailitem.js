import React, { useState, useEffect  } from 'react';
import styles from '../css/CssDetail.module.css'
import Footers from '../componet/Footerbar';
import useWindowWidth from '../componet/Check_size';


const Detail = () => {
    const windowWidth = useWindowWidth();

    return (
        <div className={styles.set_pos}>
            <div className={styles.box}>   
                
            </div>

            {windowWidth < 450 && <Footers />}
        </div>
    )
}

export default Detail;