import React, { useEffect } from 'react'
import CommonSection from '../Components/UI/common-section/CommonSection'
import Helmet from '../Components/Helmet/Helmet'
import { Container,Row,Col } from 'react-bootstrap'
import { userOrder } from '../store/shopping-cart/ordersSlice'
import {useDispatch,useSelector} from 'react-redux'
import { useCookies } from "react-cookie";
const Orders = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(null);
  const userId = cookies.userId;
  const orderList = useSelector((state) => state.order.orderItems);

  useEffect(() => {
 dispatch(userOrder(userId))
  }, [])

  
  
  return <Helmet title='Orders'>
  <CommonSection title='Your Orders'/>
  <section>
    <Container>
      <Row>
        <Col lg='12'>
       
       {
       
       orderList.map((order)=>{
        console.log(order)
       return(
 <table className='table table-bordered'>
 <thead>
              <tr>
                <th>Image</th>
                <th>Product Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
           {   order.map((item)=>{
                return (<tr>
                  <td className='text-center cart__img-box'><img src={item.image} /></td>
                  <td>{item.foodname}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>Status</td>
                </tr>)
              })
              }
            </thead>
            
            </table>
    )   })    }

            </Col>
            </Row>
            

            </Container>
            </section>
            </Helmet>
}

export default Orders
