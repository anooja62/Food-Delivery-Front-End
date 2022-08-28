import React from "react";

import { Card, Button,Row,Col } from "react-bootstrap";
import { useDispatch } from "react-redux";


import { deleteCombo } from "../../../store/shopping-cart/comboSlice";

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Combo = ({ combo, url }) => {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    dispatch(deleteCombo(id));
  };

  return (
    <>
      <Card style={{ maxWidth: "18rem", height:"20rem"}} className="mb-3">
        <Card.Img
          variant="top"
          
          src={combo.imgUrl}
          
        />
        <Card.Body className="text-center">
          <Card.Title> {combo.Items}</Card.Title>
          <p>{combo.category}</p>
         <Row>
            <Col><p style={{fontWeight:600}}><CurrencyRupeeIcon/> {combo.price}</p></Col>
            <Col>
          <Button variant="danger" className=" text-center"  onClick={() => handleDelete(combo._id)}>
            Delete
          </Button>
          </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
export default Combo;