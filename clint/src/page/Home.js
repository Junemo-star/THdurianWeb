import React, { useState, useEffect } from 'react';
import { Carousel, Card, Image } from 'react-bootstrap';
import styles from '../css/CssHome.module.css'
import { Link, useNavigate } from "react-router-dom";
import NavbarHead from '../componet/Navbar';
import Footers from '../componet/Footerbar';
import { useAuth } from '../componet/AuthContext';
import useWindowWidth from '../componet/Check_size';
import axios from 'axios';
import Modaldurian from '../componet/Modal';


const PUBLIC_URL = "http://localhost:1337/api/public";

const HomeApp = () => {
    const { userRole } = useAuth();
    const windowWidth = useWindowWidth();
    const navigate = useNavigate()
    const [product, setProduct] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [searchhh, setSearchhh] = useState('ก้านยาว')

    const handleCloseModal = () => {
        setShowModal(false)
    };

    const idpost = (durian) => {
        // console.log(durian.length)
        // console.log(durian)
        if (durian.length > 1) {
            const latest = durian[durian.length - 1]
            navigate(`/Detail/${durian}/${latest}`)
        } else {
            navigate(`/Detail/${durian}/${durian}`)
        }
    }

    const fetchItems = async () => {
        try {
            const response = await axios.get(PUBLIC_URL);
            const data = response.data
            console.log(data)
            let products;
            if (sessionStorage.getItem("typedurian")) {
                const choose = sessionStorage.getItem("typedurian");
                const filterdata = response.data.filter(item => item.Category === choose);

                products = filterdata.map((item) => {
                    let url = "2.jpg";
                    if (item.Picture) {
                        url = "http://localhost:1337" + item.Picture.url;
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
                products = data.map((item) => {
                    let url = "2.jpg";
                    if (item.Picture) {
                        url = "http://localhost:1337" + item.Picture.url;
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
            {windowWidth > 450 && <NavbarHead />}
            <div className={styles.headweb_pos}>
                <div className={styles.headweb} style={{ marginTop: "65px" }}>
                    <h2>รายการสินค้าประจำวัน</h2>
                </div>
            </div>

            <Carousel style={{ top: "13px" }}>
                {/* หน้าแรกของการหมุน */}
                <Carousel.Item>
                    <div className={styles.Carousel_pos}>
                        <img className={styles.Carousel_img} src="promo.png" />
                    </div>

                    <Carousel.Caption style={{ padding: "0px", display: "flex", justifyContent: "center" }}>

                        <Card className={styles.Card_sale} style={{ bottom: "35px", marginRight: "10px" }}>
                            <div style={{ position: "absolute", right: "65%", top: "-15%", transform: "rotate(-20deg)" }}>
                                <Image src="flashsale.png" style={{ layout: "fill", width: "80px" }} />
                            </div>

                            <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                                <div className={styles.Box_name_garden}>
                                    <div style={{ padding: "4px" }}>
                                        หมอนทอง
                                    </div>
                                </div>
                                <Card.Img variant="top" src="2.jpg" />
                            </div>

                            <Card.Body style={{ padding: "6px", width: "100%", paddingTop: "5px" }}>
                                <div className={styles.Box_info_durian}>
                                    <Card.Text className={styles.font_inbox}>
                                        <div style={{ fontSize: "12px" }}>
                                            สวนนายดำ
                                        </div>
                                        <div style={{ fontSize: "14px" }}>
                                            ราคา 200 บาท/กก.
                                        </div>
                                        <div style={{ fontSize: "10px" }}>
                                            ขายไปแล้ว 800 กก
                                        </div>
                                    </Card.Text>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className={styles.Card_sale} style={{ bottom: "35px" }}>
                            <div style={{ position: "absolute", right: "65%", top: "-15%", transform: "rotate(-20deg)" }}>
                                <Image src="flashsale.png" style={{ layout: "fill", width: "80px" }} />
                            </div>

                            <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                                <div className={styles.Box_name_garden}>
                                    <div style={{ padding: "4px" }}>
                                        หมอนทอง
                                    </div>
                                </div>
                                <Card.Img variant="top" src="2.jpg" />
                            </div>

                            <Card.Body style={{ padding: "6px", width: "100%", paddingTop: "5px" }}>
                                <div className={styles.Box_info_durian}>
                                    <Card.Text className={styles.font_inbox}>
                                        <div style={{ fontSize: "12px" }}>
                                            สวนนายดำ
                                        </div>
                                        <div style={{ fontSize: "14px" }}>
                                            ราคา 200 บาท/กก.
                                        </div>
                                        <div style={{ fontSize: "10px" }}>
                                            ขายไปแล้ว 800 กก
                                        </div>
                                    </Card.Text>
                                </div>
                            </Card.Body>
                        </Card>

                    </Carousel.Caption>
                </Carousel.Item>

                {/* หน้าสองของการหมุน */}
                {/* <Carousel.Item>
                    <div className={styles.Carousel_pos}>
                        <img className={styles.Carousel_img} src="promo.png" />
                    </div>

                    <Carousel.Caption style={{ padding: "0px", display: "flex", justifyContent: "center" }}>

                        <Card className={styles.Card_sale} style={{ bottom: "35px", marginRight: "10px" }}>
                            <div style={{ position: "absolute", right: "65%", top: "-15%", transform: "rotate(-20deg)" }}>
                                <Image src="flashsale.png" style={{ layout: "fill", width: "80px" }} />
                            </div>

                            <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                                <div className={styles.Box_name_garden}>
                                    <div style={{ padding: "4px" }}>
                                        หมอนทอง
                                    </div>
                                </div>
                                <Card.Img variant="top" src="2.jpg" />
                            </div>

                            <Card.Body style={{ padding: "6px", width: "100%", paddingTop: "5px" }}>
                                <div className={styles.Box_info_durian}>
                                    <Card.Text className={styles.font_inbox}>
                                        <div style={{ fontSize: "12px" }}>
                                            สวนนายดำ
                                        </div>
                                        <div style={{ fontSize: "14px" }}>
                                            ราคา 200 บาท/กก.
                                        </div>
                                        <div style={{ fontSize: "10px" }}>
                                            ขายไปแล้ว 800 กก
                                        </div>
                                    </Card.Text>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className={styles.Card_sale} style={{ bottom: "35px" }}>
                            <div style={{ position: "absolute", right: "65%", top: "-15%", transform: "rotate(-20deg)" }}>
                                <Image src="flashsale.png" style={{ layout: "fill", width: "80px" }} />
                            </div>

                            <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                                <div className={styles.Box_name_garden}>
                                    <div style={{ padding: "4px" }}>
                                        หมอนทอง
                                    </div>
                                </div>
                                <Card.Img variant="top" src="3.jpg" />
                            </div>

                            <Card.Body style={{ padding: "6px", width: "100%", paddingTop: "5px" }}>
                                <div className={styles.Box_info_durian}>
                                    <Card.Text className={styles.font_inbox}>
                                        <div style={{ fontSize: "12px" }}>
                                            สวนนายดำ
                                        </div>
                                        <div style={{ fontSize: "14px" }}>
                                            ราคา 200 บาท/กก.
                                        </div>
                                        <div style={{ fontSize: "10px" }}>
                                            ขายไปแล้ว 800 กก
                                        </div>
                                    </Card.Text>
                                </div>
                            </Card.Body>
                        </Card>

                    </Carousel.Caption>
                </Carousel.Item> */}
            </Carousel>

            <div className={styles.products_con}>
                {product}
            </div>

            <Modaldurian show={showModal} handleClose={() => handleCloseModal()} />

            {windowWidth < 450 && <Footers />}

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
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16" style={{ marginLeft: "10px", marginBottom: "5px" }}>
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                </svg><br />
                                ติดต่อสอบถามได้ 10.00 - 18.00 น
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: "10px", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{width: "1250px", marginTop: "5px"}}>
                            <div style={{borderTop: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <div style={{marginTop: "8px"}}>
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