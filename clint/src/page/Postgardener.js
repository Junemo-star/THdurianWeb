import React, { useState } from 'react';
import styles from '../css/CssPost.module.css'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import Footers from '../componet/Footerbar';
import { useNavigate } from "react-router-dom";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const PostGarden = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    
    const navigate = useNavigate()

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    const back = () => {
        navigate("/Gardener")
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
                            <div>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt="avatar"
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>
                            </div>
                        </div>

                        <div className={styles.text3}>
                            ราคา : <input className={styles.input_price} type='number' style={{ marginRight: '10px' }}></input>
                            จำนวน : <input className={styles.input_price} type='number'></input>
                        </div>

                        <div className={styles.inside_box3}>
                            <div className={styles.text4}>
                                รายละเอียด : 
                            </div>
                        </div>

                        <button className={styles.button_con}>
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