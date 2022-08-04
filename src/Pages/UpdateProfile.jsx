import React,{useRef,useState} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import CommonSection from '../Components/UI/common-section/CommonSection'
import Helmet from '../Components/Helmet/Helmet'
import {useNavigate} from 'react-router-dom'
//import axios from ".././axios"
import '../styles/formerror.css'
//import { useCookies } from 'react-cookie'

const UpdateProfile = ()=> {


  //const user = cookies.name
  //const phone = cookies.phone
  //const email = cookies.email
  const signupNameRef = useRef()
  const signupPhoneRef = useRef()
  
  const signupEmailRef = useRef()
  const signupPasswordRef = useRef()
  const signupConfirmPasswordRef = useRef()
  
 
  const handleClick = async (e) => {
  
    
    e.preventDefault()
  }
   
      
    
    
   
            

  


  return <Helmet title='Update'>
    <CommonSection title='Edit Your Details'/>
    <section>
      <Container>
        <Row>
          <Col lg='6' md='6' sm='12' className='m-auto text-center'>
            
            <form className="form mb-5" onSubmit={handleClick}>
              <div className="form__group">
                <input type='text' name="name"  required ref={signupNameRef} />
              </div>
             
                        <div className="form__group">
                <input type='tel' placeholder='Mobile Number' name="phone" required ref={signupPhoneRef}  />
              </div>
              
             
              <div className="form__group">
                <input type='email' placeholder='Email' name="email"  required ref={signupEmailRef} />
              </div>
           
             
              <div className="form__group">
                <input type='password' placeholder='Password' name="password" required ref={signupPasswordRef} />
              </div>
              
              <div className="form__group">
                <input type='password' placeholder='Confirm Password' name="cpassword" required ref={signupConfirmPasswordRef}   />
              </div>
             
                        
              <button type="submit" className='addToCart__btn'>UPDATE CHANGES</button>
              
            </form>
           
           
          </Col>
          
        </Row>
      </Container>
    </section>
  </Helmet>
}


export default UpdateProfile