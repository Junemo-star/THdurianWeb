import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { useAuth } from '../componet/AuthContext';
import styles from '../css/CssDetail.module.css'
import axios from 'axios';
import useWindowWidth from '../componet/Check_size';
import Footers from '../componet/Footerbar';
import { Helmet } from "react-helmet";
import NavbarHead from '../componet/Navbar';
import RatingStarss from '../componet/RatingStar';
import RatingStarsFix from '../componet/RatingStarFix';
import Urlconfig from '../config';
import { Button, message, Space } from 'antd';

const Detail = () => {
    const head = Urlconfig.serverUrlPrefix;
    const URL_DETAIL = head + "/api/detail";
    const windowWidth = useWindowWidth();
    const { id, durian } = useParams()
    const Num_id = Number(id)
    const { token, Addcart, userRole } = useAuth()
    const navigate = useNavigate()
    const [infomation, setInfomation] = useState()
    const [datalist, setDatalist] = useState([])
    const [num, setNum] = useState(0);
    const listdurian = durian.split(",")
    const [userr, setUserr] = useState()
    const [status, setStatus] = useState(true)
    const [messageApi, contextHolder] = message.useMessage();

    //ข้อมูล comment
    const [commentt, setCommentt] = useState()
    const [star, setStar] = useState("")
    const [userComment, setUserComment] = useState()

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
            const result = await axios.post(URL_DETAIL, {
                Id: [id]
            })
            const requests = listdurian.map((item) => {
                return axios.post(URL_DETAIL, {
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

            if (infomation.NetAmount === 0) {
                setStatus(false)
            }
        } catch (err) {
            console.error(err);
        }
    }

    const add = async () => {
        try {
            // console.log(userRole)
            if (userRole) {
                Addcart([id, num])

                messageApi.open({
                    type: 'success',
                    content: 'สินค้าถูกเพิ่มเรียบร้อย',
                    duration: 3
                });

            } else {
                navigate("/Login")
            }

            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    const Change = (id) => {
        console.log(id)
        navigate(`/Detail/${durian}/${id}`)
        window.location.reload();
    }

    const ratingChangedd = (newRating) => {
        // console.log(newRating);
        let s = String(newRating)
        setStar(s)
        // console.log(typeof star);
    };

    const Postcomment = async () => {
        try {
            let num_id = Number(id)
            const data = {
                data: {
                    comment: commentt,
                    Star: star,
                    farm_post_new: num_id,
                    users_permissions_user: userr,
                }
            }
            console.log(data)
            let result = await axios.post(head + "/api/comments", data, token)
            console.log("success")
            setCommentt("")
        } catch (err) {
            console.log(err)
            messageApi.open({
                type: 'warning',
                content: 'ไม่สามารถเพิ่มคอมเม้นได้',
                duration: 3
            });
        }
    }

    useEffect(() => {
        if (userRole !== null) {
            axios.get(head + "/api/users/me", token)
                .then((item) => setUserr(item.data.id)).catch((err) => console.log(err))
        }


        // console.log(Num_id)

        axios.get(head + `/api/comments?populate[farm_post_new][filters][id][$eq]=${id}&populate[users_permissions_user]=*`)
            .then((item) => {
                const filteredData = item.data.data.filter(item =>
                    item.attributes.farm_post_new.data !== null
                );
                setUserComment(filteredData)
            }).catch((err) => console.log(err))
        show();
    }, [])

    return (
        <div className={styles.set_pos}>
            {contextHolder}

            <Helmet>
                <title>Detail</title>
                {/* <meta name="description" content="Helmet application" /> */}
            </Helmet>

            {/* {console.log(userComment)} */}
            {windowWidth > 450 && <NavbarHead />}

            {infomation && (
                <div className={styles.box}>
                    <div className={windowWidth > 450 ? styles.pos_pc : null}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            {infomation.Picture ? (
                                <img className={styles.size_img} src={head + infomation.Picture.url} />
                            ) : (
                                <img className={styles.size_img} src='/noimg.png' />
                            )}

                            {console.log("----------", userComment)}
                            {windowWidth > 450 &&
                                <div>
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
                            }
                        </div>

                        <div className={windowWidth > 450 ? styles.box_inside_pc : styles.box_inside}>
                            <div style={{ padding: "15px" }}>
                                <div className={styles.text_head_inside}>
                                    {infomation.Category}<br />
                                    ราคา : {infomation.Price} บาท
                                </div>
                                <div className={styles.text_body_inside}>
                                    สินค้าคงเหลือ : {infomation.NetAmount}
                                </div>
                            </div>

                            <div className={styles.describ}>
                                <div className={styles.text_describ}>
                                    {/* {console.log(infomation)} */}
                                    รายละเอียด : {infomation.Description}
                                </div>
                                <div style={{ marginTop: "10px", color: windowWidth > 450 ? "white" : "black", fontWeight: "bold" }}>ที่อยู่</div>
                                <div className={styles.text_location} style={{ marginTop: "10px" }}>
                                    {infomation.Location}
                                </div>
                                <div className={styles.text_body_inside} style={{ width: "fit-content", marginTop: "10px" }}>
                                    สั่งซื้อ
                                </div>
                                <div className={styles.set_pos_r}>
                                    <div onClick={() => minus()} style={{ marginRight: "10px", color: windowWidth > 450 ? "#FFEF60" : "#8F3E00" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                        </svg>
                                    </div>
                                    <div className={styles.box_num}>
                                        {num}
                                    </div>
                                    <div onClick={() => plus()} style={{ marginLeft: "10px", color: windowWidth > 450 ? "#FFEF60" : "#8F3E00" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                        </svg>
                                    </div>
                                </div>
                                <div className={styles.set_pos_r} >
                                    <button className={styles.button_s} onClick={() => add()} disabled={!status}>เพิ่มลงในตะกร้า</button>
                                </div>
                            </div>

                        </div>

                        {windowWidth < 450 &&
                            <div>
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
                        }
                    </div>

                    <div className={styles.box_comment}>
                        <div style={{ fontSize: "25px", padding: "10px", color: "white" }}>
                            เพิ่มความคิดเห็น
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div className={styles.size_rating}>
                                <RatingStarss ratingChanged={ratingChangedd} starrr={star} />
                                <Form.Label style={{ textDecoration: "left", display: "block", width: "95%", }}>ความคิดเห็น</Form.Label>
                                <Form.Control
                                    value={commentt}
                                    as="textarea"
                                    rows={3}
                                    style={{ width: "95%", height: "100px", marginBottom: "20px", backgroundColor: "#8F3E00", borderRadius: "10px", color: "white", borderStyle: "hidden", padding: "10px" }}
                                    onChange={(e) => setCommentt(e.target.value)}
                                />
                                <button
                                    style={{ marginBottom: "10px", padding: "8px", borderRadius: "10px", borderStyle: "hidden", backgroundColor: "#8F3E00", color: "white" }}
                                    onClick={() => Postcomment()}
                                >
                                    โพสต์
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.box_comment}>
                        <div style={{ fontSize: "25px", padding: "10px", color: "white" }}>
                            ความคิดเห็นทั้งหมด
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div className={styles.scroll_rating} style={{ padding: "30px" }}>
                                {/* {console.log("............", userComment)} */}
                                {userComment !== null ? (
                                    userComment?.map(({ id, attributes }) => (
                                        <div className={styles.scroll} style={{ marginBottom: "20px", color: "white" }} key={id}>
                                            <div style={{ display: "flex", justifyContent: "left", width: "100%", alignItems: "center", paddingLeft: "10px", paddingTop: "10px", paddingRight: "10px" }}>
                                                <img src="/user.png" style={{ layout: "fill", width: "40px", height: "40px", marginRight: "10px" }} />
                                                <div>{attributes.users_permissions_user.data.attributes.firstname} {attributes.users_permissions_user.data.attributes.surname}</div>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "left", width: "100%", alignItems: "center", paddingLeft: "10px" }}>
                                                <RatingStarsFix how={attributes.Star === "" ? 0 : attributes.Star} /> {new Date(attributes.createdAt).toLocaleDateString('th-TH')}
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "left", width: "100%", alignItems: "center", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px" }}>
                                                {attributes.comment}
                                            </div>
                                        </div>
                                    ))
                                ) : null}
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
