import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from './AuthContext';
import axios from 'axios';
import Urlconfig from '../config';
// import Urlconfig from ''

const head = Urlconfig.serverUrlPrefix;

const Editdata = ({ open, onHide, user }) => {
    const [newfirst, setNewfirst] = useState()
    const [newsur, setNewsur] = useState()
    const [newloca, setNewloca] = useState()
    const [image, setImage] = useState(null);
    const { token } = useAuth()

    const Update = async () => {
        // console.log(newfirst)
        // console.log(newsur)
        console.log(image)
        // console.log(newloca)

        try {
            if (image !== null) {
                const formData = new FormData();
                formData.append('files', image, image.name);
                const response = await axios.post(head+'/api/upload/',
                    formData
                );
                console.log('File uploaded successfully:', response.data);
                const PictureId = response.data[0].id
                const up = await axios.put(head+`/api/users/${user.id}`, {
                    firstname: newfirst || user.firstname,
                    surname: newsur || user.surname,
                    location: newloca || user.location,
                    Profile: PictureId
                }, token)

                console.log("succeed")
            } else {
                const up = await axios.put(head+`/api/users/${user.id}`, {
                    firstname: newfirst || user.firstname,
                    surname: newsur || user.surname,
                    location: newloca || user.location,
                }, token)
            }

            // window.reload
        } catch (err) {
            console.log(err)
        } finally {
            window.location.reload()
        }
    }

    const handleChange = (e) => {
        console.log(e.target.files);
        setImage(e.target.files[0])
        console.log(image);
    }

    return (
        <>
            <Modal show={open} onHide={onHide} >
                <Modal.Header closeButton>
                    <Modal.Title>แก้ไขข้อมูลส่วนตัว</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {user && (
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>ชื่อ</Form.Label>
                                <Form.Control
                                    type="email"
                                    // value={user.firstname}
                                    // autoFocus
                                    placeholder={user.firstname}
                                    onChange={(e) => setNewfirst(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>นามสกุล</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder={user.surname}
                                    autoFocus
                                    onChange={(e) => setNewsur(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>ที่อยู่</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder={user.location}
                                    rows={3}
                                    onChange={(e) => setNewloca(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>เปลี่ยนรูปภาพ</Form.Label>
                                <Form.Control type="file" accept="image/*" onChange={handleChange} />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => Update()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Editdata;