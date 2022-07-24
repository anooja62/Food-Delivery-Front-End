import React,{useRef} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import CommonSection from '../Components/UI/common-section/CommonSection'
import Helmet from '../Components/Helmet/Helmet'
import {useNavigate} from 'react-router-dom'
import axios from ".././axios"
import {useCookies} from 'react-cookie'


import {Link} from 'react-router-dom'

const Login = ()=> {
  const [cookies, setCookie, removeCookie] = useCookies(null)

  const loginNameRef = useRef()
  const loginPasswordRef = useRef()
  const navigate = useNavigate()

  const handleClick = async (e) => {
    console.log("i am inside handle click")
    e.preventDefault()
        const user = {
         
            email:loginNameRef.current.value,
            password: loginPasswordRef.current.value,
            
        }

        try{
           const response = await axios.post("/auth/login", user)
           const success = response.status === 200
           if(success) {
            setCookie('userId', response.data._id)
            setCookie('username',response.data.name)
            
            navigate('/home')
           }
            
        }catch(err){
            console.log(err);
            
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
                <input type='text' placeholder='email' required ref={loginNameRef}/>
              </div>
             
              <div className="form__group">
                <input type='password' placeholder='Password' required ref={loginPasswordRef}/>
              </div>

              
              <button type='submit' className='addToCart__btn'>Login</button>
            </form>
           <Link to='/register'>New to Deliorder ? Create an account</Link>
          
          </Col>
          <Col lg='4' md='4'>
           
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
)}

export default Login