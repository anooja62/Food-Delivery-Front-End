import React,{useRef} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import CommonSection from '../Components/UI/common-section/CommonSection'
import Helmet from '../Components/Helmet/Helmet'
import {useNavigate} from 'react-router-dom'
import '../styles/formerror.css'
import { useCookies } from 'react-cookie'
import axios from ".././axios"
const UpdateProfile = ()=> {

  const [cookies, setCookie] = useCookies(null)

  const user = cookies.name
  const phone = cookies.phone
  const email = cookies.email
  const userId = cookies.userId
  const signupNameRef = useRef()
  const signupPhoneRef = useRef()
  
  const signupEmailRef = useRef()
  const signupPasswordRef = useRef()
  const signupConfirmPasswordRef = useRef()
  
  const navigate = useNavigate()

  const handleClick = async (e) => {

    e.preventDefault()

   
      const user = {
        name: signupNameRef.current.value,
        phone: signupPhoneRef.current.value,
        email: signupEmailRef.current.value,
        password: signupPasswordRef.current.value



      }

      try {
        await axios.put(`/auth/update/${userId}`, user)
        navigate('/login')
      } catch (err) {
        console.log(err)
      }
    }

  

  return <Helmet title='Update'>
    <CommonSection title='Edit Your Details'/>
    <section>
      <Container>
        <Row>
          <Col lg='6' md='6' sm='12' className='m-auto text-center'>
            
            <form className="form mb-5" onSubmit={handleClick}>
              <div className="form__group">
                <input type='text' name="name" placeholder='Name   (Eg. John Doe)'  ref={signupNameRef} defaultValue={user} />
              </div>
             
                        <div className="form__group">
                <input type='tel' placeholder='Mobile Number' name="phone"  ref={signupPhoneRef} defaultValue={phone} />
              </div>
              
             
              <div className="form__group">
                <input type='email' placeholder='Email' name="email"   ref={signupEmailRef} defaultValue={email}/>
              </div>
           
             
              <div className="form__group">
                <input type='password' placeholder='Password' name="password"  ref={signupPasswordRef} />
              </div>
              
              <div className="form__group">
                <input type='password' placeholder='Confirm Password' name="cpassword"  ref={signupConfirmPasswordRef}   />
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