import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import {Container,Row,Col} from 'react-bootstrap'
import CommonSection from '../Components/UI/common-section/CommonSection'
import Helmet from '../Components/Helmet/Helmet'
import '../styles/checkout.css'
//import Countrystatecity from '../Components/Countrystatecity/Countrystatecity'



const Checkout = ()=> {

  const [enterName,setEnterName] = useState('')
  
  const [enterHouseName,setEnterHouseName] = useState('')
  
  const [enterPincode,setEnterPincode] = useState('')
  const [enterPhone,setEnterPhone] = useState('')

  const deliveryInfo = []

  const cartTotalAmount = useSelector(state=>state.cart.totalAmount)
  const deliveryCharge = 30
  const totalAmount = cartTotalAmount + Number(deliveryCharge)

  const submitHandler = e=> {
    e.preventDefault()
    const userDeliveryAddress = {
      name:enterName,
      phone:enterPhone,
      
      housename:enterHouseName,
      pincode:enterPincode,
     
    }
    deliveryInfo.push(userDeliveryAddress)
    console.log(deliveryInfo);
  };



  return <Helmet title='Checkout'>
    <CommonSection title='Checkout'/>
    <section>
      <Container>
        <Row>
          <Col lg='8' md='6'>
            <h6 className='mb-4'>Delivery Address</h6>
            <form className=" checkout__form" onSubmit={submitHandler}>
              <div className="form__group">
                <input type='text' placeholder='Name' required onChange={e=> setEnterName(e.target.value)}/>
              </div>
              <div className="form__group">
                <input type='number' placeholder='Phone number' required onChange={e=> setEnterPhone(e.target.value)}/>
              </div>
              
              <div className="form__group">
                <input type='text' placeholder='House name' required onChange={e=> setEnterHouseName(e.target.value)}/>
              </div>
              <div className="form__group">
                <input type='number' placeholder='Pincode' required onChange={e=> setEnterPincode(e.target.value)}/>
              </div>
                        
            
             <button className="addToCart__btn"> Payment</button>
            </form>
           
          </Col>
          <Col lg='4' md='6'>
            <div className='checkout__bill'>
              <h6 className='d-flex align-items-center justify-content-between mb-3'>Subtotal : <span>₹{cartTotalAmount}</span></h6>
              <h6 className='d-flex align-items-center justify-content-between mb-3'>Delivery Charge : <span>₹{deliveryCharge}</span></h6>
              <div className='checkout__total'>
                <h5 className='d-flex align-items-center justify-content-between'>
                  Total : <span>₹{totalAmount}</span>
                </h5>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Checkout