import React, { useState } from 'react';
import { Form, Container, Carousel, Card } from 'react-bootstrap';
import styles from '../css/CssHome.module.css'


const HomeApp = () => {
    return (
        <Container className={styles.Container_all}>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block"
                        src="promo.png"
                    />
                    <Carousel.Caption>
                        <Card className={styles.Card_show}>
                            <div className={styles.Box_name_garden}>
                                <div style={{padding: "4px"}}>
                                    สวนนายดำ
                                </div>
                            </div>
                            <Card.Img variant="top" src="2.jpg" style={{padding: "10px", borderRadius: "25px"}}/>
                            <Card.Body style={{padding: "9px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <Card.Text className={styles.Box_info_durian}>
                                    หมอนทอง<br />
                                    ราคา : 250 บาท/กก
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Caption>
                </Carousel.Item>
                {/* <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="2.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="3.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item> */}
            </Carousel>
        </Container>
    )
}

export default HomeApp;