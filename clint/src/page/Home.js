import React, { useState } from 'react';
import { Form, Container, Carousel, Card, Image, Col, Row } from 'react-bootstrap';
import styles from '../css/CssHome.module.css'
import NavbarHead from '../componet/Navbar';
import Footers from '../componet/Footerbar';


const HomeApp = () => {
    return (
        <div style={{height: "100%"}}>
            <NavbarHead />

            <div className={styles.promotion_banner}>
                <Image src="promotion.png" className={styles.promotion_img} />
            </div>

            <div className={styles.headweb_pos}>
                <div className={styles.headweb}>
                    <h2>รายการสินค้าประจำวัน</h2>
                </div>
            </div>

            <Carousel style={{ top: "13px" }}>
                {/* หน้าแรกของการหมุน */}
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={{ height: "340px" }}
                        src="promo.png"
                    />

                    <Carousel.Caption style={{ padding: "0px", display: "flex", justifyContent: "center" }}>

                            <Card className={styles.Card_sale} style={{ marginRight: "20px", bottom: "35px" }}>
                            <div style={{ position: "absolute", right: "60%", top: "-15%", transform: "rotate(-20deg)" }}>
                                <Image src="flashsale.png" style={{ layout: "fill", width: "80px" }} />
                            </div>
                            <div className={styles.Box_name_garden}>
                                <div style={{ padding: "4px" }}>
                                    สวนนายดำ
                                </div>
                            </div>
                            <Card.Img variant="top" src="1.jpg" style={{ padding: "6px", borderRadius: "25px", paddingTop: "0px", height: "98px" }} />
                            <Card.Body style={{ padding: "6px", width: "100%", paddingTop: "0px" }}>
                                <div className={styles.Box_info_durian} >
                                    <Card.Text className={styles.font_inbox}>
                                        หมอนทอง<br />
                                        ราคา : 250 บาท/กก
                                    </Card.Text>
                                </div>
                            </Card.Body>
                        </Card>


                        <Card className={styles.Card_sale} style={{ bottom: "35px" }}>
                            <div style={{ position: "absolute", right: "60%", top: "-15%", transform: "rotate(-20deg)" }}>
                                <Image src="flashsale.png" style={{ layout: "fill", width: "80px" }} />
                            </div>
                            <div className={styles.Box_name_garden}>
                                <div style={{ padding: "4px" }}>
                                    สวนนายแดง
                                </div>
                            </div>
                            <Card.Img variant="top" src="2.jpg" style={{ padding: "6px", borderRadius: "25px", paddingTop: "0px", height: "98px" }} />
                            <Card.Body style={{ padding: "6px", width: "100%", paddingTop: "0px" }}>
                                <div className={styles.Box_info_durian} >
                                    <Card.Text className={styles.font_inbox}>
                                        ชะนี<br />
                                        ราคา : 300 บาท/กก
                                    </Card.Text>
                                </div>
                            </Card.Body>
                        </Card>

                    </Carousel.Caption>
                </Carousel.Item>

                {/* หน้าสองของการหมุน */}
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={{ height: "340px" }}
                        src="promo.png"
                    />

                    <Carousel.Caption style={{ padding: "0px", display: "flex", justifyContent: "center" }}>

                        <Card className={styles.Card_sale} style={{ marginRight: "20px", bottom: "35px" }}>
                            <div style={{ position: "absolute", right: "60%", top: "-15%", transform: "rotate(-20deg)" }}>
                                <Image src="flashsale.png" style={{ layout: "fill", width: "80px" }} />
                            </div>
                            <div className={styles.Box_name_garden}>
                                <div style={{ padding: "4px" }}>
                                    สวนนายดำ
                                </div>
                            </div>
                            <Card.Img variant="top" src="3.jpg" style={{ padding: "6px", borderRadius: "25px", paddingTop: "0px", height: "98px" }} />
                            <Card.Body style={{ padding: "6px", width: "100%", paddingTop: "0px" }}>
                                <div className={styles.Box_info_durian} >
                                    <Card.Text className={styles.font_inbox}>
                                        หมอนทอง<br />
                                        ราคา : 250 บาท/กก
                                    </Card.Text>
                                </div>
                            </Card.Body>
                        </Card>


                        <Card className={styles.Card_sale} style={{ bottom: "35px" }}>
                            <div style={{ position: "absolute", right: "60%", top: "-15%", transform: "rotate(-20deg)" }}>
                                <Image src="flashsale.png" style={{ layout: "fill", width: "80px" }} />
                            </div>
                            <div className={styles.Box_name_garden}>
                                <div style={{ padding: "4px" }}>
                                    สวนนายแดง
                                </div>
                            </div>
                            <Card.Img variant="top" src="2.jpg" style={{ padding: "6px", borderRadius: "25px", paddingTop: "0px", height: "98px" }} />
                            <Card.Body style={{ padding: "6px", width: "100%", paddingTop: "0px" }}>
                                <div className={styles.Box_info_durian} >
                                    <Card.Text className={styles.font_inbox}>
                                        ชะนี<br />
                                        ราคา : 300 บาท/กก
                                    </Card.Text>
                                </div>
                            </Card.Body>
                        </Card>

                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div className={styles.products_con}>
                
                <div className={styles.products_item}>
                    <div className={styles.products_pos_garden}>
                        <div className={styles.products_garden}>
                            สวนนายดำ
                        </div>
                    </div>

                    <div className={styles.products_img}>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail}>
                        ชะนี<br />
                        ราคาลูกละ 300 บาท
                    </div>
                </div>

                <div className={styles.products_item}>
                    <div className={styles.products_pos_garden}>
                        <div className={styles.products_garden}>
                            สวนนายดำ
                        </div>
                    </div>

                    <div className={styles.products_img}>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail}>
                        ชะนี<br />
                        ราคาลูกละ 300 บาท
                    </div>
                </div>

                <div className={styles.products_item}>
                    <div className={styles.products_pos_garden}>
                        <div className={styles.products_garden}>
                            สวนนายดำ
                        </div>
                    </div>

                    <div className={styles.products_img}>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail}>
                        ชะนี<br />
                        ราคาลูกละ 300 บาท
                    </div>
                </div>

                <div className={styles.products_item}>
                    <div className={styles.products_pos_garden}>
                        <div className={styles.products_garden}>
                            สวนนายดำ
                        </div>
                    </div>

                    <div className={styles.products_img}>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail}>
                        ชะนี<br />
                        ราคาลูกละ 300 บาท
                    </div>
                </div>

                <div className={styles.products_item}>
                    <div className={styles.products_pos_garden}>
                        <div className={styles.products_garden}>
                            สวนนายดำ
                        </div>
                    </div>

                    <div className={styles.products_img}>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail}>
                        ชะนี<br />
                        ราคาลูกละ 300 บาท
                    </div>
                </div>

                <div className={styles.products_item}>
                    <div className={styles.products_pos_garden}>
                        <div className={styles.products_garden}>
                            สวนนายดำ
                        </div>
                    </div>

                    <div className={styles.products_img}>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail}>
                        ชะนี<br />
                        ราคาลูกละ 300 บาท
                    </div>
                </div>

                <div className={styles.products_item}>
                    <div className={styles.products_pos_garden}>
                        <div className={styles.products_garden}>
                            สวนนายดำ
                        </div>
                    </div>

                    <div className={styles.products_img}>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail}>
                        ชะนี<br />
                        ราคาลูกละ 300 บาท
                    </div>
                </div>

                <div className={styles.products_item}>
                    <div className={styles.products_pos_garden}>
                        <div className={styles.products_garden}>
                            สวนนายดำ
                        </div>
                    </div>

                    <div className={styles.products_img}>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail}>
                        ชะนี<br />
                        ราคาลูกละ 300 บาท
                    </div>
                </div>

                <div className={styles.products_item}>
                    <div className={styles.products_pos_garden}>
                        <div className={styles.products_garden}>
                            สวนนายดำ
                        </div>
                    </div>

                    <div className={styles.products_img}>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail}>
                        ชะนี<br />
                        ราคาลูกละ 300 บาท
                    </div>
                </div>

                <div className={styles.products_item}>
                    <div className={styles.products_pos_garden}>
                        <div className={styles.products_garden}>
                            สวนนายดำ
                        </div>
                    </div>

                    <div className={styles.products_img}>
                        <img src='2.jpg' />
                    </div>

                    <div className={styles.products_detail}>
                        ชะนี<br />
                        ราคาลูกละ 300 บาท
                    </div>
                </div>

            </div>

            {/* <Row xs={1} md={2} className="g-4">
                <Col xs={6}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <Card className={styles.Card_nomal}>
                            <div className={styles.Box_name_garden_nomal}>
                                <div style={{ padding: "4px" }}>
                                    สวนนายแดง
                                </div>
                            </div>
                            <Card.Img variant="top" src="2.jpg" style={{ padding: "6px", borderRadius: "25px", paddingTop: "0px", height: "98px" }} />
                            <Card.Body style={{ padding: "6px", width: "100%", paddingTop: "0px" }}>
                                <div className={styles.Box_info_durian_nomal} >
                                    <Card.Text className={styles.font_inbox}>
                                        ชะนี<br />
                                        ราคา : 300 บาท/กก
                                    </Card.Text>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>                
            </Row> */}

            <Footers />
        </div>
    )
}

export default HomeApp;