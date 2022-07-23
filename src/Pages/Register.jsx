import React,{useRef} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import CommonSection from '../Components/UI/common-section/CommonSection'
import Helmet from '../Components/Helmet/Helmet'
import {Link,useNavigate} from 'react-router-dom'
import axios from ".././axios"
import {useHistory} from 'react-router-dom'

const Register = ()=> {

  const signupNameRef = useRef()
  
  const signupPhoneRef = useRef()
  const signupEmailRef = useRef()
  const signupPasswordRef = useRef()
  const signupConfirmPasswordRef = useRef()
  
  const navigate = useNavigate()
  console.log(signupNameRef)
  const handleClick = async (e) => {
    console.log("i am inside handle click")
    e.preventDefault()
    if(signupConfirmPasswordRef.current.value !== signupPasswordRef.current.value){
        // passwordAgain.current.setCustomValidity("passwords don't match")
        console.log("pw did not match")
    } else {
        const user = {
            name:signupNameRef.current.value,
            phone:signupPhoneRef.current.value,
            email: signupEmailRef.current.value,
            password: signupPasswordRef.current.value
           
            

        }

        try{
            await axios.post("/auth/register", user)
            navigate('/login')
        }catch(err){
            console.log(err)
        }
    }
    
}

  return <Helmet title='Register'>
    <CommonSection title='Welcome to Deliorder'/>
    <section>
      <Container>
        <Row>
          <Col lg='6' md='6' sm='12' className='m-auto text-center'>
            
            <form className="form mb-5" onSubmit={handleClick}>
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
                <input type='password' placeholder='Password' required ref={signupPasswordRef}/>
              </div>
              <div className="form__group">
                <input type='password' placeholder='Confirm Password' required ref={signupConfirmPasswordRef}/>
              </div>
             
              <button type="submit" className='addToCart__btn'  >Register</button>
              
            </form>
            <Link to='/login'>Already have an account ? Login here</Link>
           
          </Col>
          
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Register