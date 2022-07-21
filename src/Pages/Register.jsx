import React,{useRef} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import CommonSection from '../Components/UI/common-section/CommonSection'
import Helmet from '../Components/Helmet/Helmet'
import {Link} from 'react-router-dom'

const Register = ()=> {

  const signupNameRef = useRef()
  const signupPasswordRef = useRef()
  const signupPhoneRef = useRef()
  const signupUsernameRef = useRef()
  const signupConfirmPasswordRef = useRef()
  const signupEmailRef = useRef()

  return <Helmet title='Register'>
    <CommonSection title='Welcome to Deliorder'/>
    <section>
      <Container>
        <Row>
          <Col lg='6' md='6' sm='12' className='m-auto text-center'>
            
            <form className="form mb-5">
              <div className="form__group">
                <input type='text' placeholder='Name' required ref={signupNameRef}/>
              </div>
              <div className="form__group">
                <input type='number' placeholder='Phone' required ref={signupPhoneRef}/>
              </div>
              <div className="form__group">
                <input type='email' placeholder='Email' required ref={signupEmailRef}/>
              </div>
              <div className="form__group">
                <input type='text' placeholder='Username' required ref={signupUsernameRef}/>
              </div>
              <div className="form__group">
                <input type='password' placeholder='Password' required ref={signupPasswordRef}/>
              </div>
              <div className="form__group">
                <input type='password' placeholder='Confirm Password' required ref={signupConfirmPasswordRef}/>
              </div>
             
              <button className='addToCart__btn'>Register</button>
              
            </form>
            <Link to='/login'>Already have an account ? Login here</Link>
           
          </Col>
          <Col lg='4' md='6'>
            
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Register