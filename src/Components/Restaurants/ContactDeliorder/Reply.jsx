import React,{useEffect} from 'react'
import { useCookies } from "react-cookie";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from "react-redux";
import { getMessages, getSingleReply } from '../../../store/shopping-cart/messageSlice';
const Reply = ({message}) => {

  return (
    <div>
        <Card style={{ width: '18rem' }}>
      <Card.Header>{message.requestFor}</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>{message.reply}</ListGroup.Item>
       
      </ListGroup>
    </Card>
    </div>
  )
}

export default Reply