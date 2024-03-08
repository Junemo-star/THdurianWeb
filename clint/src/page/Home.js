import React, { useState, useEffect } from 'react';
import { Carousel, Card, Image, Button, Row, Col } from 'react-bootstrap';
import styles from '../css/CssHome.module.css';
import { Link, useNavigate } from "react-router-dom";
import NavbarHead from '../componet/Navbar';
import Footers from '../componet/Footerbar';
import { useAuth } from '../componet/AuthContext';
import useWindowWidth from '../componet/Check_size';
import axios from 'axios';
import Modaldurian from '../componet/Modal';
import { Helmet } from "react-helmet";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import Urlconfig from '../config';


const HomeApp = () => {
    const head = Urlconfig.serverUrlPrefix;
    const PUBLIC_URL = head + "/api/public";
    const PROMOTION = head + "/api/news-promotions";
    const { userRole } = useAuth();
    const windowWidth = useWindowWidth();
    const navigate = useNavigate()
    const [product, setProduct] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [promotionItem, setPromotionItem] = useState(false);
    const [searchhh, setSearchhh] = useState('ก้านยาว')
    const [showChatbox, setShowChatbox] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);

    const toggleChatbox = () => {
        setShowChatbox(!showChatbox);
    };

    const selectTopic = (topic) => {
        setSelectedTopic(topic);
    };

    const handleCloseModal = () => {
        setShowModal(false)
    };

    const idpost = (durian) => {
        // console.log(durian.length)
        // console.log(durian)
        if (userRole !== "Farmer") {
            if (durian.length > 1) {
                const latest = durian[durian.length - 1]
                navigate(`/Detail/${durian}/${latest}`)
            } else {
                navigate(`/Detail/${durian}/${durian}`)
            }
        }
    }

    const fetchItems = async () => {
        try {
            const response = await axios.get(PUBLIC_URL);
            const promo = await axios.get(PROMOTION);
            setPromotionItem(promo.data)
            const data = response.data
            console.log("++++", data)
            const datafilter = data.filter(item => item.NetAmount !== 0)
            console.log(" ------- ",datafilter)
            let products;
            if (sessionStorage.getItem("typedurian")) {
                const choose = sessionStorage.getItem("typedurian");
                const filterdata = datafilter.data.filter(item => item.Category === choose);

                products = filterdata.map((item) => {
                    let url = "2.jpg";
                    if (item.Picture) {
                        url = head + item.Picture.url;
                        // console.log(item.Picture.url)
                    }
                    return (
                        <Link onClick={() => idpost(item.Id)} key={item.Id}>
                            <div className={styles.products_item}>
                                <div className={styles.products_img}>
                                    <div className={styles.products_garden}>
                                        {item.Category}
                                    </div>
                                    <div style={{ width: "188px", height: "195px" }}>
                                        <img src={url} style={{ height: "100%" }} />
                                    </div>
                                </div>
                                <div className={styles.products_detail_pos}>
                                    <div style={{ fontSize: "12px" }}>
                                        {item.Farmer}
                                    </div>
                                    <div style={{ fontSize: "15px" }}>
                                        ราคา {item.Price} บาท/กก.
                                    </div>
                                    <div style={{ fontSize: "10px" }}>
                                        ขายไปแล้ว {item.TotalSale} กก
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                });
            } else {
                products = datafilter.map((item) => {
                    let url = "2.jpg";
                    if (item.Picture) {
                        url = head + item.Picture.url;
                        // console.log(item.Picture.url)
                    }
                    return (
                        <Link onClick={() => idpost(item.Id)} key={item.Id}>
                            <div className={styles.products_item}>
                                <div className={styles.products_img}>
                                    <div className={styles.products_garden}>
                                        {item.Category}
                                    </div>
                                    <div style={{ width: "188px", height: "195px" }}>
                                        <img src={url} style={{ height: "100%" }} />
                                    </div>
                                </div>
                                <div className={styles.products_detail_pos}>
                                    <div style={{ fontSize: "12px" }}>
                                        {item.Farmer}
                                    </div>
                                    <div style={{ fontSize: "15px" }}>
                                        ราคา {item.Price} บาท/กก.
                                    </div>
                                    <div style={{ fontSize: "10px" }}>
                                        ขายไปแล้ว {item.TotalSale} กก
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                });
            }

            setProduct(products);
        } catch (err) {
            //console.log(err)
        } finally { }

    }

    useEffect(() => {
        fetchItems();
    }, [])


    return (
        <div className={styles.position_all}>
            <Helmet>
                <title>Home</title>
                {/* <meta name="description" content="Helmet application" /> */}
            </Helmet>

            {windowWidth > 450 && <NavbarHead />}

            {console.log("Promotion", promotionItem)}

            {promotionItem && (
                <Carousel fade style={{ marginTop: "20px" }}>
                    {promotionItem.map(({ id, picture }) => (
                        <Carousel.Item key={id} >
                            <div className={styles.Carousel_img} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image src={head + picture.url} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}

            <div className={styles.products_con}>
                {product}
            </div>

            <Modaldurian show={showModal} handleClose={() => handleCloseModal()} />

            {windowWidth < 450 && <Footers />}
            {/* Float Button */}
            <FloatButton icon={<QuestionCircleOutlined />} type="default" style={{ right: 20, bottom: 20 }} onClick={toggleChatbox} />

            {/* Chatbox */}
            {showChatbox && (
                <Card style={{ position: 'fixed', bottom: 100, right: 20, backgroundColor: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', zIndex: "9999" }}>
                    {/* FAQ Header */}
                    <h3 style={{ textAlign: 'center', borderBottom: '1px solid #ccc', paddingBottom: 10 }}>FAQ:</h3>

                    {/* FAQ Content */}
                    <Row justify="space-around">
                        <Col span={8}>
                            <Button onClick={() => selectTopic('ขั้นตอนการใช้งาน')} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ขั้นตอนการใช้งาน</Button>
                        </Col>
                        <Col span={8}>
                            <Button onClick={() => selectTopic('ข้อควรระวัง')} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ข้อควรระวัง</Button>
                        </Col>
                        <Col span={8}>
                            <Button onClick={() => selectTopic('ช่องทางการติดต่อ')} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ช่องทางการติดต่อ</Button>
                        </Col>
                    </Row>

                    {/* Replies */}
                    {selectedTopic && (
                        <div style={{ marginTop: 16, border: '1px solid #ccc', padding: 10, borderRadius: 8 }}>
                            {selectedTopic === 'ขั้นตอนการใช้งาน' && (
                                <>
                                    <p>1. ทำการเลือกสินค้าลงตะกร้า</p>
                                    <p>2. กดที่ cart เพื่อทำการชำระเงิน</p>
                                    <p>3. ชำระเงินและส่งหลักฐานการโอนเงิน</p>
                                    <p>4. ทำการกดปุ่ม "ดำเนินการต่อ"</p>
                                    <p>5. เสร็จสิ้นการสั่งซื้อ</p>
                                </>
                            )}
                            {selectedTopic === 'ข้อควรระวัง' && (
                                <>
                                    <p>1. ส่งหลักฐานยืนยันการโอนเงินทุกครั้ง</p>
                                    <p>2. ตรวจสอบบัญชีที่ทำการโอนเงิน</p>
                                    <p>3. ตรวจสอบจำนวนเงินที่โอน</p>
                                </>
                            )}
                            {selectedTopic === 'ช่องทางการติดต่อ' && (
                                <>
                                    <p>Email : group10@email.com</p>
                                    <p>Tel Number : 123-456-7890</p>
                                    <p>Line ID: @group10</p>
                                </>
                            )}
                        </div>
                    )}
                </Card>
            )}
            {windowWidth > 450 && (
                <footer className={styles.footer_pc}>
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <div className={styles.text_footer}>
                            <div style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "20px", alignItems: "center", justifyContent: "left", display: "flex" }}>
                                <img src="/logotitle.png" width="40px" height="40px" style={{ marginRight: "5px" }} /> Thaidurian <br />
                            </div>
                            <div>
                                เว็บไซต์ศูนย์กลางจำหน่ายทุเรียนทั่วไทย <br />
                                คิดถึงทุเรียน คิดถึงเรา
                            </div>
                        </div>
                        <div className={styles.text_footer}>
                            <div style={{ fontWeight: "bold" }}>
                                Contact
                            </div>
                            <div>
                                Phone : 086-543-2109 <br />
                                Email : Thaidurian@gmail.com
                            </div>
                        </div>
                        <div className={styles.text_footer}>
                            <div style={{ fontWeight: "bold" }}>
                                Social
                            </div>
                            <div style={{ marginTop: "5px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-line" viewBox="0 0 16 16" >
                                    <path d="M8 0c4.411 0 8 2.912 8 6.492 0 1.433-.555 2.723-1.715 3.994-1.678 1.932-5.431 4.285-6.285 4.645-.83.35-.734-.197-.696-.413l.003-.018.114-.685c.027-.204.055-.521-.026-.723-.09-.223-.444-.339-.704-.395C2.846 12.39 0 9.701 0 6.492 0 2.912 3.59 0 8 0M5.022 7.686H3.497V4.918a.156.156 0 0 0-.155-.156H2.78a.156.156 0 0 0-.156.156v3.486c0 .041.017.08.044.107v.001l.002.002.002.002a.15.15 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157m.791-2.924a.156.156 0 0 0-.156.156v3.486c0 .086.07.155.156.155h.562c.086 0 .155-.07.155-.155V4.918a.156.156 0 0 0-.155-.156zm3.863 0a.156.156 0 0 0-.156.156v2.07L7.923 4.832l-.013-.015v-.001l-.01-.01-.003-.003-.011-.009h-.001L7.88 4.79l-.003-.002-.005-.003-.008-.005h-.002l-.003-.002-.01-.004-.004-.002-.01-.003h-.002l-.003-.001-.009-.002h-.006l-.003-.001h-.004l-.002-.001h-.574a.156.156 0 0 0-.156.155v3.486c0 .086.07.155.156.155h.56c.087 0 .157-.07.157-.155v-2.07l1.6 2.16a.2.2 0 0 0 .039.038l.001.001.01.006.004.002.008.004.007.003.005.002.01.003h.003a.2.2 0 0 0 .04.006h.56c.087 0 .157-.07.157-.155V4.918a.156.156 0 0 0-.156-.156zm3.815.717v-.56a.156.156 0 0 0-.155-.157h-2.242a.16.16 0 0 0-.108.044h-.001l-.001.002-.002.003a.16.16 0 0 0-.044.107v3.486c0 .041.017.08.044.107l.002.003.002.002a.16.16 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156Z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16" style={{ marginLeft: "10px", marginBottom: "5px" }}>
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16" style={{ marginLeft: "10px", marginBottom: "5px" }}>
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                </svg><br />
                                ติดต่อสอบถามได้ 10.00 - 18.00 น
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: "10px", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ width: "1250px", marginTop: "5px" }}>
                            <div style={{ borderTop: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div style={{ marginTop: "8px" }}>
                                    © Copyright 2024 Thaidurian. All right reserved.
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

            )}
        </div>
    )
}

export default HomeApp;