import React,{useRef, useState} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import CommonSection from '../Components/UI/common-section/CommonSection'
import Helmet from '../Components/Helmet/Helmet'
import {useNavigate} from 'react-router-dom'
import axios from "../axios"
import {useCookies} from 'react-cookie'

import {Link} from 'react-router-dom'

import '../styles/login.css'
const RestaurantLogin = ()=> {
  const [cookies, setCookie, removeCookie] = useCookies(null)
 const [error, setError] = useState("")
  const loginEmailRef = useRef()
  const loginPasswordRef = useRef()
  const navigate = useNavigate()
 
  
  const handleClick = async (e) => {
  
    e.preventDefault()
        const restaurant = {
         
            email:loginEmailRef.current.value,
            password: loginPasswordRef.current.value,
            
        }

        try{
            await axios.post("/rest/res-login", restaurant)
         
                   
        }catch(err){
            console.log(err)
            setError(err.response.data,"user response")
           
        }

    
}



  return (<Helmet title='Login'>
    <CommonSection title='Welcome back!'/>
  
    <section>
      <Container>
       
   
              <Row>
          <Col lg='6' md='6' sm='12' className='m-auto text-center'>
         
            
            <form className="form mb-5" onSubmit={handleClick}>
              <div className="form__group">
                <input type='email' placeholder='Email' required ref={loginEmailRef}/>
              </div>
             
              <div className="form__group">
              <input type='password' placeholder='Password' required ref={loginPasswordRef}/>
              </div>
              <p className='error__txt'>{error}</p>
              <div> <button type='submit' className='addToCart__btn'>Login</button></div>
             
             
            </form>
          
           <Link to='/restaurant'>New to Deliorder ? Create an account</Link>
           
          </Col>
         
              
            
        </Row>
      </Container>

    </section>
   
  </Helmet>
)}

export default RestaurantLogin