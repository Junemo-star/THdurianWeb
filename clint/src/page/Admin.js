import React, { useState, useEffect } from 'react';
import { Card, Tag, Radio, Space, Button, Modal, Form, Layout, DatePicker, Popconfirm, Menu } from 'antd';
import styles from '../css/CssAdmin.module.css'
import { Link, useNavigate } from "react-router-dom";
import NavbarHead from '../componet/Navbar';
import Footers from '../componet/Footerbar';
import { useAuth } from '../componet/AuthContext';
import useWindowWidth from '../componet/Check_size';
import axios from 'axios';
import Modaldurian from '../componet/Modal';
import { Helmet } from "react-helmet";
import {
    PlusOutlined,
    MailOutlined,
    AppstoreOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;
const { Meta } = Card;
const head = "http://localhost:1337"
const ADMIN_URL = head + "/api/adminget";
const UPDATE_URL = head + "/api/farm-post-news";
const PROMO_URL = head + "/api/adminPromo";
const API_PROMO_URL = head + "/api/news-promotions";
const UPLOAD = head + "/api/upload/";
const ORDER_URL = head + "/api/placed-orders"

const statusOptions = [
    {
        label: 'Verified',
        value: 'Verified',
    },
    {
        label: 'Denied',
        value: 'Denied',
    },
];

const promoOptions = [
    {
        label: 'Auto',
        value: 'Auto',
    },
    {
        label: 'Active',
        value: 'Active',
    },
    {
        label: 'Inactive',
        value: 'Inactive',
    },
];

const orderOptions = [
    {
        label: 'Verifying',
        value: 'Verifying',
    },
    {
        label: 'Packaging',
        value: 'Packaging',
    },
    {
        label: 'Delivered',
        value: 'Delivered',
    },
];

const menuItems = [
    {
        label: 'Promotion',
        key: 'pro',
        icon: <MailOutlined />,
    },
    {
        label: 'Farm post',
        key: 'farm',
        icon: <AppstoreOutlined />,

    },
    {
        label: 'Order',
        key: 'order',
        icon: <AppstoreOutlined />,

    },
]

const HomeApp = () => {
    const [form] = Form.useForm();

    const { userRole } = useAuth();
    const windowWidth = useWindowWidth();
    const navigate = useNavigate()
    const [product, setProduct] = useState([])
    const [promo, setPromo] = useState([])
    const [order, setOrder] = useState([])
    const [promoModalOpen, setPromoModalOpen] = useState(false);
    const [searchhh, setSearchhh] = useState('ก้านยาว')
    const [image, setImage] = useState(null);


    const token = localStorage.getItem('jwtToken');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };


    const onRadioChange = async (value, add) => {
        console.log('radio1 checked', value.target.value);
        console.log(add)
        const response = await axios.put(UPDATE_URL + `/${add}`,
            {
                "data": {
                    "status": value.target.value
                }

            }
            , config);
        fetchItems()
    };

    const onPromoRadioChange = async (value, add) => {
        console.log('radio2 checked', value.target.value);
        console.log(add)
        const response = await axios.put(API_PROMO_URL + `/${add}`,
            {
                "data": {
                    "activation": value.target.value
                }

            }
            , config);
        fetchItems()
    };

    const onOrderRadioChange = async (value, add) => {
        console.log('radio2 checked', value.target.value);
        console.log(add)
        const response = await axios.put(ORDER_URL + `/${add}`,
            {
                "data": {
                    "status": value.target.value
                }

            }
            , config);
        fetchItems()
    };

    const handlePromoPicChange = (e) => {
        console.log(e.target.files);

        setImage(e.target.files[0])
    }

    const handlePromoSubmit = async (formDatas) => {
        // console.log("idSpecies =", idSpecies)
        // console.log("image =", image)
        // console.log("detail =", detail)
        // console.log("note =", note)
        // console.log(image)
        const formData = new FormData();
        formData.append('files', image, image.name);
        console.log(formData)

        console.log(new Date(formDatas.date[0]))
        const response = await axios.post(UPLOAD,
            formData
            , config);

        console.log('File uploaded successfully:', response.data);
        const pictureId = response.data[0].id
        console.log(pictureId)
        try {
            let result = await axios.post(API_PROMO_URL, {
                pictureId: pictureId,
                startDate: new Date(formDatas.date[0]),
                endDate: new Date(formDatas.date[1])
            }, config);
            //setSuccess(true)
            console.log("success");
            window.location.reload()
        } catch (e) {
            console.log(e);
        }
    }

    const handlePromoModal = () => {
        setPromoModalOpen(true)
    }

    const handleModalCancel = () => {
        setPromoModalOpen(false);
        //setEditModalOpen(false)
        form.resetFields();
    };
    const delButtonClick = async (record) => {
        //console.log("Deleting")
        //console.log(record.id)
        const response2 = await axios.delete(API_PROMO_URL + `/${record.id}`, config)
        fetchItems()
    };
    const handleEditModalOk = async (formData) => {

        // console.log("Complete")
        // console.log(formData.subject)
        // console.log(formData.date)
        // console.log(formData.buttonid)

        // const response2 = await axios.post(`/api/events/${formData.buttonid}/edit`, {
        //     subject: formData.subject,
        //     date: formData.date
        // })

        // if (response2.data.Stats == "Success") {
        //     messageApi.open({
        //         type: 'success',
        //         content: 'Update Subject Success',
        //     });
        //     fetchItems()
        // } else {
        //     messageApi.open({
        //         type: "error",
        //         content: 'Update Fail',
        //     });
        // }
        //setEditModalOpen(false);
    };

    const fetchItems = async () => {
        try {


            const response = await axios.get(ADMIN_URL, config);
            const data = response.data
            //console.log(data)

            const products = data.map((item) => {
                let url = "2.jpg";
                if (item.Picture) {
                    url = head + item.Picture.url;
                    // console.log(item.Picture.url)
                }
                let tagColor = "red"
                if (item.Status == "Verified") {
                    tagColor = "green-inverse"
                } else if (item.Status == "Pending") {
                    tagColor = "orange-inverse"
                } else if (item.Status == "Denied") {
                    tagColor = "red-inverse"
                }


                return (
                    <Card
                        size="small"
                        hoverable
                        //onClick={}
                        style={{
                            width: 250,
                        }}
                        cover={<div style={{ width: "250px", height: "180px" }}>
                            <div className={styles.products_garden}>
                                {item.Category}
                            </div>

                            <img src={url} style={{ height: "100%", width: "100%" }} />
                        </div>}
                    >
                        <div style={{ fontSize: "15px" }}>
                            Id: {item.id}
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            Username: {item.Farmer}
                        </div>
                        <p></p>

                        <div style={{ fontSize: "10px" }}>
                            Original Stock {item.Amount} kg.
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            Stock {item.NetAmount} kg.
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            Total Sale {item.TotalSale} kg
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            Price {item.Price} Baht/kg.cd
                        </div>

                        <div style={{ fontSize: "15px" }}>
                            Status: <Tag color={tagColor}>{item.Status}</Tag>
                        </div>
                        <div style={{ fontSize: "15px" }}>

                            Date: {new Date(item.CreatedDate).toLocaleString("en-EN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                            })}
                        </div>

                        <br></br>
                        <Radio.Group
                            options={statusOptions}
                            onChange={(e) => onRadioChange(e, item.id)}
                            value={item.Status}
                            optionType="button"
                            buttonStyle="solid"
                        />

                    </Card>

                );
            });
            setProduct(products);

            const Proresponse = await axios.get(PROMO_URL, config);

            const Prodata = Proresponse.data
            //console.log(Prodata)
            const promotions = Prodata.map((item) => {
                let url = "2.jpg";
                if (item.picture) {
                    url = head + item.picture.url;
                    // console.log(item.Picture.url)
                }
                let tagColor = "red"
                if (item.activation == "Auto") {
                    tagColor = "blue-inverse"
                } else if (item.activation == "Active") {
                    tagColor = "green-inverse"
                } else if (item.activation == "Inactive") {
                    tagColor = "red-inverse"
                }


                return (
                    <Card
                        size="small"
                        hoverable

                        style={{
                            width: 400,
                        }}
                        cover={<div style={{ width: "400px", height: "300px" }}>

                            <img src={url} style={{ height: "100%", width: "100%" }} />
                        </div>}
                    >


                        <div style={{ fontSize: "15px" }}>
                            Status: <Tag color={tagColor}>{item.activation}</Tag>
                        </div>
                        <div style={{ fontSize: "15px" }}>

                            Start Date: {new Date(item.startDate).toLocaleString("en-EN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                            })}
                        </div>

                        <div style={{ fontSize: "15px" }}>

                            End Date: {new Date(item.endDate).toLocaleString("en-EN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                            })}
                        </div>

                        <br></br>
                        <Radio.Group
                            options={promoOptions}
                            onChange={(e) => onPromoRadioChange(e, item.id)}
                            value={item.activation}
                            optionType="button"
                            buttonStyle="solid"
                        />
                        <br></br>
                        <br></br>
                        <Popconfirm title="Confirm Delete?" onConfirm={() => delButtonClick(item)}>
                            <Button type="primary" danger>Delete Promotion</Button>
                        </Popconfirm>


                    </Card>

                );

            })
            setPromo(promotions);


            const Orderresponse = await axios.get(ORDER_URL+ "/adminget", config);

            const Orderdata = Orderresponse.data
            //console.log(Prodata)
            const orders = Orderdata.map((item) => {
                let url = "nopayment.png";
                if (item.picture) {
                    url = head + item.picture.url;
                    // console.log(item.Picture.url)
                }
                let tagColor = "red"
                if (item.Status == "Verifying") {
                    tagColor = "orange-inverse"
                } else if (item.Status == "Packaging") {
                    tagColor = "blue-inverse"
                } else if (item.Status == "Delivered") {
                    tagColor = "green-inverse"
                }


                return (
                    <Card
                        size="small"
                        hoverable

                        style={{
                            width: 300,
                        }}
                        cover={<div style={{ width: "300px", height: "210px" }}>

                            <img src={url} style={{ height: "100%", width: "100%" }} />
                        </div>}
                    >


                        <div style={{ fontSize: "15px" }}>
                            Status: <Tag color={tagColor}>{item.Status}</Tag>
                        </div>
                        <div style={{ fontSize: "15px" }}>
                        Id: {item.id}<br></br>
                        Customer: {item.Customer}<br></br>
                        Placed order on <br></br>
                        Farmer: {item.Farmer} <br></br>
                        Amount: {item.Amount} <br></br>
                        Price: {item.Price} <br></br>
                        Order Date: {new Date(item.OrderDate).toLocaleString("en-EN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                            })}<br></br>
                        <br></br>
                        Deliver to: {item.UserLocation} <br></br>
                        </div>

                        <br></br>
                     

                        <br></br>
                        <Radio.Group
                            options={orderOptions}
                            onChange={(e) => onOrderRadioChange(e, item.id)}
                            value={item.Status}
                            optionType="button"
                            buttonStyle="solid"
                        />
                        <br></br>
                        <br></br>



                    </Card>

                );

            })
            setOrder(orders);

        } catch (err) {
            //console.log(err)
        } finally { }

    }

    useEffect(() => {
        fetchItems();
    }, [])
    const [selectedMenu, setSelectedMenu] = useState('pro');

    const handleMenuClick = (e) => {
        console.log(e)
        setSelectedMenu(e.key);
    };
    let contentToRender;

    if (selectedMenu === 'pro') {
        contentToRender = (
            <div>
                <p>Promotions</p>
                <p>
                    <PlusOutlined />
                    <Button type="primary" onClick={handlePromoModal}>Create new promotion</Button>
                </p>
                <Space size={[8, 16]} wrap>
                    {promo}
                </Space>
            </div>
        );
    } else if (selectedMenu === 'farm') {
        contentToRender = (
            <div>
                <p>Product</p>
                <Space size={[8, 16]} wrap>
                    {product}
                </Space>
            </div>
        )
    }else if (selectedMenu === 'order') {
        contentToRender = (
            <div>
                <p>Order</p>
                <Space size={[8, 16]} wrap>
                    {order}
                </Space>
            </div>
        )
    }
    return (
        <div >
            <Helmet>
                <title>Home</title>
                {/* <meta name="description" content="Helmet application" /> */}
            </Helmet>

            {windowWidth > 450 && <NavbarHead />}
            <Menu
                selectedKeys={[selectedMenu]} onClick={handleMenuClick}
                mode="horizontal"
                defaultSelectedKeys={['pro']}
                items={menuItems}
                style={{
                    flex: 1,
                    minWidth: 0,
                }}>
                <Menu.Item key="pro">



                </Menu.Item>
            </Menu>




            {/* <div className={styles.headweb_pos}>
                <div className={styles.headweb} style={{ marginTop: "65px" }}>
                    <h2>รายการสินค้าประจำวัน</h2>
                </div>
            </div> */}

            <div class="container">
                {contentToRender}


            </div>






            <Modal
                title={"Create New Promotion"}
                centered
                open={promoModalOpen}
                onCancel={handleModalCancel}
                footer={null}
            >

                <Form
                    form={form}
                    layout="vertical"
                    name='edit-post'
                    onFinish={handlePromoSubmit}
                    labelCol={{
                        span: 15,
                    }}

                >
                    <Form.Item
                        label="Picture"
                        name="picture"
                        rules={[
                            {
                                required: true,
                                message: 'Picture Require!',
                            },
                        ]}
                    >
                        <input class="input1" type="file" onChange={handlePromoPicChange} />
                    </Form.Item>
                    <Form.Item
                        label="Promotion's Date Range"
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: 'Start Date Require!',
                            },
                        ]}
                    >
                        <RangePicker showTime />
                    </Form.Item>
                    <Form.Item >
                        <Space >
                            <Button htmlType="button" onClick={handleModalCancel} >
                                Cancel
                            </Button>

                            <Button type="primary" htmlType="submit" >
                                Create
                            </Button>

                        </Space>
                    </Form.Item>

                </Form>



            </Modal>
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