import React,{useState,useRef} from "react";
import emailjs from "@emailjs/browser";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Icon from "@mui/material/Icon";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { rejectDeliveryboy } from "../../../store/shopping-cart/deliverySlice";
import axios from "../../../axios";
const Deliveryboy = ({ deliveryboy }) => {
  const dispatch = useDispatch();
  const handleReject = async (id) => {
    dispatch(rejectDeliveryboy(id));
  };
  const deliveryboyPasswordRef = useRef();
  const deliveryboyEmailRef = useRef();
  const [modalShow, setModalShow] = useState(false);
  
    const handleClick = async (e) => {
      e.preventDefault();
      const deliveryboy = {
      email:deliveryboyEmailRef.current.value,
      password:deliveryboyPasswordRef.current.value,
      };
      try{

        const res = await axios
        .put("deli/deliveryboy-pw-update", deliveryboy)
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
        <td className="text-center" style={{ paddingTop: "2%" }}>
          {deliveryboy.name}
        </td>
        <td className="text-center" style={{ paddingTop: "2%" }}>
          {deliveryboy.email}
        </td>
        <td className="text-center" style={{ paddingTop: "2%" }}>
          {deliveryboy.phone}
        </td>
        <td className="text-center" style={{ paddingTop: "2%" }}>
          {deliveryboy.city}
        </td>
        <td className="text-center" style={{ paddingTop: "2%" }}><a href={deliveryboy.imgUrl}>view License</a></td>
        <td className="text-center" style={{ paddingTop: "2%" }}>
          <Icon color="primary" onClick={() => setModalShow(true)}>
            add_circle
          </Icon>
        </td>
        <td className="text-center">
          <IconButton aria-label="delete" size="large">
            <DeleteIcon
              fontSize="inherit"
              onClick={() => handleReject(deliveryboy._id)}
            />
          </IconButton>
        </td>
      </tr>
    </tbody>
    {modalShow && (
      <Modal
        show={modalShow}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
     
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h1>Add Delivery Staff</h1>
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
                defaultValue={deliveryboy.email}
                ref={deliveryboyEmailRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                defaultValue={Math.random().toString(36).slice(-8)}
                ref={deliveryboyPasswordRef}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
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
export default Deliveryboy;
