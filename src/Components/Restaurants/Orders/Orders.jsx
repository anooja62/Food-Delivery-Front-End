import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from '@mui/material/Button'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const Orders = () => {
  return (
   <>
    <Card style={{ width: '18rem' }}>
      <Card.Header>Order id : 87765tdfhgfdc</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>item 1</ListGroup.Item>
        <ListGroup.Item>item 2</ListGroup.Item>
        <ListGroup.Item><Button variant="contained"><ThumbUpAltIcon/>&nbsp; FOOD READY</Button></ListGroup.Item>
      </ListGroup>
    </Card>
   </>
  )
}

export default Orders