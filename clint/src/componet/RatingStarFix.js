import React, { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";

const RatingStarsFix = ({ ratingChanged, how }) => {
    // const [fixedValue, setFixedValue] = useState()
    const isReadOnly = true; // ตั้งค่าให้เป็น true เพื่อไม่ให้ผู้ใช้แก้ไขคะแนน
    const fixedValue = how; // ตั้งค่าให้เป็น true เพื่อไม่ให้ผู้ใช้แก้ไขคะแนน
    
    // if ( how === ""){
    //     setFixedValue(0)
    // } else {
    //     setFixedValue(how)
    // }

    return (
        <ReactStars
            value={fixedValue} 
            count={5}
            onChange={ratingChanged}
            size={25}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#FFEF60"
            edit={!isReadOnly} // กำหนดให้เป็น false เพื่อไม่ให้ผู้ใช้แก้ไขคะแนน
        />
    );
};

export default RatingStarsFix;
