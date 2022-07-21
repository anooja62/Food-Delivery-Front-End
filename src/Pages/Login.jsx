import React,{useRef} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import CommonSection from '../Components/UI/common-section/CommonSection'
import Helmet from '../Components/Helmet/Helmet'

import {Link} from 'react-router-dom'

const Login = ()=> {

  const loginNameRef = useRef()
  const loginPasswordRef = useRef()

  const submitHandler = e=>{
    e.preventDefault();
  }
  return (<Helmet title='Login'>
    <CommonSection title='Welcome back!'/>
    <section>
      <Container>
        <Row>
          <Col lg='6' md='6' sm='12' className='m-auto text-center'>
           
            
            <form className="form mb-5" onSubmit={submitHandler}>
              <div className="form__group">
                <input type='text' placeholder='username' required ref={loginNameRef}/>
              </div>
             
              <div className="form__group">
                <input type='password' placeholder='Password' required ref={loginPasswordRef}/>
              </div>
              <button type='submit' className='addToCart__btn'>Login</button>
            </form>
           <Link to='/register'>New to Deliorder ? Create an account</Link>
          
          </Col>
          <Col lg='4' md='6'>
            
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
)}

export default Login