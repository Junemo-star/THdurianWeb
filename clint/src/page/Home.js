import React, { useState } from 'react';
import { Form, Container, Carousel, Card, Image, Col, Row } from 'react-bootstrap';
import styles from '../css/CssHome.module.css'
import NavbarHead from '../componet/Navbar';
import Footers from '../componet/Footerbar';
import { useAuth } from '../componet/AuthContext';
import useWindowWidth from '../componet/Check_size';
import toast, { Toaster } from 'react-hot-toast';


const HomeApp = () => {
    const { userRole } = useAuth();
    const windowWidth = useWindowWidth();

    return (
        <div className={styles.position_all}>
            <div className={styles.headweb_pos}>
                <div className={styles.headweb} style={{marginTop: "65px"}}>
                    <h2>รายการสินค้าประจำวัน</h2>
                </div>
            </div>

            <Carousel style={{ top: "13px" }}>
                {/* หน้าแรกของการหมุน */}
                <Carousel.Item>
                    <img className={styles.Carousel_img} src="promo.png" />

                    <Carousel.Caption style={{ padding: "0px", display: "flex", justifyContent: "center" }}>

                        <Card className={styles.Card_sale} style={{ bottom: "35px", marginRight: "10px"}}>
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
                <Carousel.Item>
                    <img className={styles.Carousel_img} src="promo.png" />

                    <Carousel.Caption style={{ padding: "0px", display: "flex", justifyContent: "center" }}>

                        <Card className={styles.Card_sale} style={{ bottom: "35px", marginRight: "10px"}}>
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
                </Carousel.Item>
            </Carousel>

            <div className={styles.products_con}>

                <div className={styles.products_item}>

                    <div className={styles.products_img}>
                        <div className={styles.products_garden}>
                            ก้านยาว
                        </div>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail_pos}>
                        <div style={{ fontSize: "12px" }}>
                            สวนนายดำ
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            ราคา 200 บาท/กก.
                        </div>
                        <div style={{ fontSize: "10px" }}>
                            ขายไปแล้ว 800 กก
                        </div>
                    </div>
                </div>

                <div className={styles.products_item}>

                    <div className={styles.products_img}>
                        <div className={styles.products_garden}>
                            สวนนายดำ
                        </div>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail_pos}>
                        <div style={{ fontSize: "12px" }}>
                            สวนนายดำ
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            ราคา 200 บาท/กก.
                        </div>
                        <div style={{ fontSize: "10px" }}>
                            ขายไปแล้ว 800 กก
                        </div>
                    </div>
                </div>

                <div className={styles.products_item}>

                    <div className={styles.products_img}>
                        <div className={styles.products_garden}>
                            สวนนายดำ
                        </div>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail_pos}>
                        <div style={{ fontSize: "12px" }}>
                            สวนนายดำ
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            ราคา 200 บาท/กก.
                        </div>
                        <div style={{ fontSize: "10px" }}>
                            ขายไปแล้ว 800 กก
                        </div>
                    </div>
                </div>

                <div className={styles.products_item}>

                    <div className={styles.products_img}>
                        <div className={styles.products_garden}>
                            สวนนายดำ
                        </div>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail_pos}>
                        <div style={{ fontSize: "12px" }}>
                            สวนนายดำ
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            ราคา 200 บาท/กก.
                        </div>
                        <div style={{ fontSize: "10px" }}>
                            ขายไปแล้ว 800 กก
                        </div>
                    </div>
                </div>

                <div className={styles.products_item}>

                    <div className={styles.products_img}>
                        <div className={styles.products_garden}>
                            สวนนายดำ
                        </div>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail_pos}>
                        <div style={{ fontSize: "12px" }}>
                            สวนนายดำ
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            ราคา 200 บาท/กก.
                        </div>
                        <div style={{ fontSize: "10px" }}>
                            ขายไปแล้ว 800 กก
                        </div>
                    </div>
                </div>

                <div className={styles.products_item}>

                    <div className={styles.products_img}>
                        <div className={styles.products_garden}>
                            สวนนายดำ
                        </div>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail_pos}>
                        <div style={{ fontSize: "12px" }}>
                            สวนนายดำ
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            ราคา 200 บาท/กก.
                        </div>
                        <div style={{ fontSize: "10px" }}>
                            ขายไปแล้ว 800 กก
                        </div>
                    </div>
                </div>

                <div className={styles.products_item}>

                    <div className={styles.products_img}>
                        <div className={styles.products_garden}>
                            สวนนายดำ
                        </div>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail_pos}>
                        <div style={{ fontSize: "12px" }}>
                            สวนนายดำ
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            ราคา 200 บาท/กก.
                        </div>
                        <div style={{ fontSize: "10px" }}>
                            ขายไปแล้ว 800 กก
                        </div>
                    </div>
                </div>

            </div>

            {windowWidth < 450 && <Footers />}
        </div>
    )
}

export default HomeApp;