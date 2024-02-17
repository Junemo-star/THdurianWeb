import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useWindowWidth from '../componet/Check_size';
import Footers from '../componet/Footerbar';
import styles from '../css/CssRegis.module.css'


const Register = () => {
    const windowWidth = useWindowWidth();

    return (
        <div className={styles.set_pos}>
            <div>
                
            </div>

            {windowWidth < 450 && <Footers />}
        </div>
    )
}

export default Register;