import React,{useRef} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import CommonSection from '../Components/UI/common-section/CommonSection'
import Helmet from '../Components/Helmet/Helmet'
import {Link} from 'react-router-dom'

const RestaurantRegister = ()=> {

  const signupNameRef = useRef()
  
  const signupPhoneRef = useRef()
  
  const signupEmailRef = useRef()
  const signupAddressRef = useRef()

  return <Helmet title='Restaurant-Register'>
    <CommonSection title='Register your resturant on Deliorder'/>
    <section>
      <Container>
        <Row>
          <Col lg='6' md='6' sm='12' className='m-auto text-center'>
            
            <form className="form mb-5">
              <div className="form__group">
                <input type='text' placeholder='Restaurant name' required ref={signupNameRef}/>
              </div>
              <div className="form__group">
                <input type='number' placeholder='Phone' required ref={signupPhoneRef}/>
              </div>
              <div className="form__group">
                <input type='email' placeholder='Email' required ref={signupEmailRef}/>
              </div>
              <div className="form__group">
                <textarea rows='5' placeholder='Address' required ref={signupAddressRef}></textarea>
              </div>
            
             
              <button className='addToCart__btn'>Register</button>
              
            </form>
            <Link to='/login'>Already registered on Deliorder ? Login here</Link>
           
          </Col>
          
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default RestaurantRegister