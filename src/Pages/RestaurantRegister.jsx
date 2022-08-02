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
          <Col xs='6' className='m-auto text-center'>
            <h4>Restaurant Details</h4><br></br>
            
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
          <Col xs='6' className='m-auto text-center'>
          <h4>Owner Details</h4><br></br>
            
            <form className="form mb-5">
              <div className="form__group">
                <input type='text' placeholder='Owner Name' required ref={signupNameRef}/>
              </div>
              <div className="form__group">
                <input type='number' placeholder='Phone' required ref={signupPhoneRef}/>
              </div>
              <div className="form__group">
                <input type='email' placeholder='Email' required ref={signupEmailRef}/>
              </div>
             
             
              <button className='addToCart__btn'>Register</button>
              
            </form>
          </Col>
          
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default RestaurantRegister