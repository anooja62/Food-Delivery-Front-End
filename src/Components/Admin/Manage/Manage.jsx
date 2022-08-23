import React from "react";
import emailjs from "@emailjs/browser";
import { Form, Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { rejectRestaurant } from "../../../store/shopping-cart/restaurantSlice";

import Icon from "@mui/material/Icon";

const Manage = ({ restaurant, url }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  const handleReject = async (id) => {
    dispatch(rejectRestaurant(id));
  };

  function MyVerticallyCenteredModal(props) {
    const handleClick = async (e) => {
      e.preventDefault();

      emailjs.sendForm(
        "service_pp7cxbu",
        "template_jx2i0sl",
        e.target,
        "3HARonvI0a5SrbOi6"
      );
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h1>Add restaurant for online ordering</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleClick}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="to"
                defaultValue={restaurant.email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                defaultValue={Math.random().toString(36).slice(-8)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {" "}
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <tbody>
        <tr>
          <td className="text-center" style={{ paddingTop: "2%" }}>
            {restaurant.name}
          </td>
          <td className="text-center" style={{ paddingTop: "2%" }}>
            {restaurant.email}
          </td>
          <td className="text-center" style={{ paddingTop: "2%" }}>
            {restaurant.phone}
          </td>
          <td className="text-center" style={{ paddingTop: "2%" }}>
            {restaurant.address}
          </td>
          <td className="text-center" style={{ paddingTop: "2%" }}><a href={restaurant.imgUrl}>view License</a></td>
          <td className="text-center" style={{ paddingTop: "2%" }}>
            <Icon color="primary" onClick={() => setModalShow(true)}>
              add_circle
            </Icon>
          </td>

          <td className="text-center">
            <IconButton aria-label="delete" size="large">
              <DeleteIcon
                fontSize="inherit"
                onClick={() => handleReject(restaurant._id)}
              />
            </IconButton>
          </td>
        </tr>
      </tbody>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
export default Manage;
