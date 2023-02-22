/** @format */

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Form, Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "../../../axios";

import { rejectRestaurant } from "../../../store/shopping-cart/restaurantSlice";

import Icon from "@mui/material/Icon";

const Manage = ({ restaurant, url, slNo }) => {
  const restaurantPasswordRef = useRef();
  const restaurantEmailRef = useRef();
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const handleReject = async (id) => {
    dispatch(rejectRestaurant(id));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const restaurants = {
      email: restaurantEmailRef.current.value,
      password: restaurantPasswordRef.current.value,
    };
    try {
      const res = await axios
        .put("rest/restaurent-pw-update", restaurants)
        .then(() => {
          emailjs.sendForm(
            "service_pp7cxbu",
            "template_jx2i0sl",
            e.target,
            "3HARonvI0a5SrbOi6"
          );
          setModalShow(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setModalShow(false);
  };

  return (
    <>
      <tbody>
        <tr>
          <td className='text-center' style={{ paddingTop: "2%" }}>
            {slNo}
          </td>
          <td className='text-center' style={{ paddingTop: "2%" }}>
            {restaurant.name}
          </td>
          <td className='text-center' style={{ paddingTop: "2%" }}>
            {restaurant.email}
            <p>{restaurant.phone}</p>
          </td>

          <td className='text-center' style={{ paddingTop: "2%" }}>
            {restaurant.address}
          </td>
          <td className='text-center' style={{ paddingTop: "2%" }}>
            <a href={restaurant.imgUrl}>view License</a>
          </td>
          <td className='text-center' style={{ paddingTop: "2%" }}>
            {!restaurant.isApproved ? (
              <Icon color='primary' onClick={() => setModalShow(true)}>
                add_circle
              </Icon>
            ) : (
              <p style={{ color: "green" }}>Approved</p>
            )}
          </td>
        </tr>
      </tbody>
      {modalShow && (
        <Modal
          show={modalShow}
          onHide={handleClose}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
              <h1>Add restaurant for online ordering</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleClick}>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  name='to'
                  ref={restaurantEmailRef}
                  defaultValue={restaurant.email}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  name='password'
                  ref={restaurantPasswordRef}
                  defaultValue={Math.random().toString(36).slice(-8)}
                />
              </Form.Group>

              <Button variant='primary' type='submit'>
                {" "}
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default Manage;
