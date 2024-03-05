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
import Urlconfig from '../config';
import {
    PlusOutlined,
    MailOutlined,
    AppstoreOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;
const { Meta } = Card;


const statusOptions = [
    {
        label: 'ตรวจสอบแล้ว',
        value: 'Verified',
    },
    {
        label: 'ยกเลิก',
        value: 'Denied',
    },
];

const promoOptions = [
    {
        label: 'อัตโนมัติ',
        value: 'Auto',
    },
    {
        label: 'แสดง',
        value: 'Active',
    },
    {
        label: 'ซ่อน',
        value: 'Inactive',
    },
];

const orderOptions = [
    {
        label: 'ตรวจสอบ',
        value: 'Verifying',
    },
    {
        label: 'จัดส่ง',
        value: 'Packaging',
    },
    {
        label: 'เสร็จสิ้น',
        value: 'Delivered',
    },
];

const menuItems = [
    {
        label: 'โปรโมชั่น',
        key: 'pro',
        icon: <MailOutlined />,
    },
    {
        label: 'โพสต์สินค้า',
        key: 'farm',
        icon: <AppstoreOutlined />,

    },
    {
        label: 'รายการ',
        key: 'order',
        icon: <AppstoreOutlined />,

    },
]

const HomeApp = () => {
    const head = Urlconfig.serverUrlPrefix
    const ADMIN_URL = head + "/api/adminget";
    const UPDATE_URL = head + "/api/farm-post-news";
    const PROMO_URL = head + "/api/adminPromo";
    const API_PROMO_URL = head + "/api/news-promotions";
    const UPLOAD = head + "/api/upload/";
    const ORDER_URL = head + "/api/placed-orders"
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
                            Id : {item.id}
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            ชื่อสวน : {item.Farmer}
                        </div>
                        <p></p>

                        {/* <div style={{ fontSize: "10px" }}>
                            Original Stock {item.Amount} kg.
                        </div> */}
                        <div style={{ fontSize: "15px" }}>
                            สินค้า {item.NetAmount} kg.
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            ขายทั้งหมด {item.TotalSale} kg
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            ราคา {item.Price} บาท/กิโลกรัม
                        </div>

                        <div style={{ fontSize: "15px" }}>
                            สถานะ : <Tag color={tagColor}>{item.Status}</Tag>
                        </div>
                        <div style={{ fontSize: "15px" }}>

                            วันที่ : {new Date(item.CreatedDate).toLocaleString("th-TH", {
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
                            marginRight: "20px"
                        }}
                        cover={<div style={{ width: "400px", height: "300px" }}>

                            <img src={url} style={{ height: "100%", width: "100%" }} />
                        </div>}
                    >


                        <div style={{ fontSize: "15px" }}>
                            สถานะ : <Tag color={tagColor}>{item.activation}</Tag>
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            เริ่ม : {new Date(item.startDate).toLocaleString("th-TH", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                            })}
                        </div>

                        <div style={{ fontSize: "15px" }}>

                            สิ้นสุด : {new Date(item.endDate).toLocaleString("th-TH", {
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
                            <Button type="primary" danger>ลบโปรโมชั่น</Button>
                        </Popconfirm>


                    </Card>

                );

            })
            setPromo(promotions);


            const Orderresponse = await axios.get(ORDER_URL + "/adminget", config);

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
                            สถานะ : <Tag color={tagColor}>{item.Status}</Tag>
                        </div>
                        <div style={{ fontSize: "15px" }}>
                            Id : {item.id}<br></br>
                            ผู้ซื้อ : {item.Customer}<br></br>
                            รายละเอียดการสั่งซื้อ <br></br>
                            ชื่อสวน : {item.Farmer} <br></br>
                            จำนวน : {item.Amount} <br></br>
                            ราคา : {item.Price} <br></br>
                            วันที่สั่งซื้อ : {new Date(item.OrderDate).toLocaleString("th-TH", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                            })}<br></br>
                            <br></br>
                            สถานที่จัดส่ง : {item.UserLocation} <br></br>
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
                {/* <p style={{margin: "20px", fontSize: "40px", fontWeight: "bold"}}>โปรโมชั่น</p> */}
                <p style={{marginTop: "20px"}}>
                    <Button style={{display: "flex", justifyContent: "center", alignItems: "center"}} type="primary" onClick={handlePromoModal}> 
                        <PlusOutlined /> Create new promotion
                    </Button>
                </p>
                <Space size={[8, 16]} wrap>
                    {promo}
                </Space>
            </div>
        );
    } else if (selectedMenu === 'farm') {
        contentToRender = (
            <div style={{marginTop: "20px"}}>
                {/* <p>Product</p> */}
                <Space size={[8, 16]} wrap>
                    {product}
                </Space>
            </div>
        )
    } else if (selectedMenu === 'order') {
        contentToRender = (
            <div style={{marginTop: "20px"}}>
                {/* <p>Order</p> */}
                <Space size={[8, 16]} wrap>
                    {order}
                </Space>
            </div>
        )
    }
    return (
        <div style={{marginBottom: "200px"}}>
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
        </div>
    )
}

export default HomeApp;