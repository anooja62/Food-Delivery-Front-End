import React from 'react'
import CommonSection from '../Components/UI/common-section/CommonSection'
import Helmet from '../Components/Helmet/Helmet'
import {useSelector,useDispatch} from 'react-redux'
import {Container,Row,Col} from 'react-bootstrap'
import '../styles/cart-page.css';
import {cartActions} from '../store/shopping-cart/cartSlice'
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'

const Cart=()=> {
   

  const [cookies, setCookie] = useCookies(null);
  const userId = cookies.userId;
  const navigate = useNavigate()
  if(!userId){
    navigate('/login')
   }
  const cartItems = useSelector((state)=>state.cart.cartItems)
  const totalAmount = useSelector((state)=>state.cart.totalAmount)
  return <Helmet title='Cart'>
    <Header/>
    <CommonSection title='Your Cart'/>
    <section>
      <Container>
        <Row>
          <Col lg='12'>
           {
            cartItems.length === 0 ? <h5 className='text-center'>Your cart is empty </h5> :  <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                cartItems.map((item)=>(
                <Tr item={item} key={item.id}/>
                ))
              }
              
            </tbody>
          </table>
           }
           <div className='mt-4'>
             <h6>Subtotal: ₹<span className='cart__subtotal'>{totalAmount}</span></h6>
             <p>Taxes and delivery charge will calculate at checkout</p>
             <div className='cart__page-btn'>
              <button className="addToCart__btn me-4"><Link to='/ordernow'>Continue Shopping</Link></button>
             
              <button className="addToCart__btn">
                
                <Link to='/checkout'>Proceed to checkout</Link>
                       
                </button>
               

             </div>
           </div>
          </Col>
        </Row>
      </Container>
    </section>
    <Footer/>
  </Helmet>
}


const Tr = props=>{
  const {_id,image,foodname,price,quantity} = props.item
  const dispatch = useDispatch()
  const deleteItem = (_id)=>{
    dispatch(cartActions.deleteItem(_id))
  }
  return <tr>
    <td className='text-center cart__img-box'><img src={image} alt=""/></td>
    <td className='text-center'>{foodname}</td>
    <td className='text-center'>₹{price}</td>
    <td className='text-center'>{quantity}px</td>
    <td className='text-center cart__item-del'><i class="ri-delete-bin-line" onClick={()=>deleteItem(_id)}></i></td>
  </tr>
}

export default Cart