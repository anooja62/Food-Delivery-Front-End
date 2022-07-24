import React,{useRef} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import CommonSection from '../Components/UI/common-section/CommonSection'
import Helmet from '../Components/Helmet/Helmet'
import {Link,useNavigate} from 'react-router-dom'
import axios from ".././axios"
import '../styles/formerror.css'

import {useFormik} from 'formik'
import { signupSchema } from '../schemas'

const initialValues ={
     name:'',
     phone:'',
     email:'',
     password:'',
     cpassword:'',
    
};

const Register = ()=> {

  const {values,handleBlur,handleChange,errors,touched} = useFormik({
       initialValues,
       validationSchema:signupSchema,
       onSubmit:(values) =>{
        console.log(values);
       }
  })
  console.log(touched);

  //console.log(formik);

  const signupNameRef = useRef()
  const signupPhoneRef = useRef()
  
  const signupEmailRef = useRef()
  const signupPasswordRef = useRef()
  const signupConfirmPasswordRef = useRef()
  
  const navigate = useNavigate()
  console.log(signupNameRef)
  const handleClick = async (e) => {
    
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
                <input type='text' placeholder='Name' name="name" required ref={signupNameRef} value={values.name} onBlur={handleBlur} onChange={handleChange}/>
              </div>
              <div className='error_container'>
                            {errors.name && touched.name && (
                                <p className='form_error'>{errors.name}</p>
                            )}
                        </div>
                        <div className="form__group">
                <input type='tel' placeholder='phone' name="phone" required ref={signupPhoneRef} value={values.phone} onBlur={handleBlur} onChange={handleChange}/>
              </div>
              <div className='error_container'>
                            {errors.phone && touched.phone && (
                                <p className='form_error'>{errors.phone}</p>
                            )}
                        </div>
             
              <div className="form__group">
                <input type='email' placeholder='Email' name="email"  required ref={signupEmailRef} value={values.email} onBlur={handleBlur} onChange={handleChange}/>
              </div>
              <div className='error_container'>
                            {errors.email && touched.email && (
                                <p className='form_error'>{errors.email}</p>
                            )}
                        </div>
             
              <div className="form__group">
                <input type='password' placeholder='Password' name="password" required ref={signupPasswordRef} value={values.password} onBlur={handleBlur} onChange={handleChange}/>
              </div>
              <div className='error_container'>
                            {errors.password && touched.password && (
                                <p className='form_error'>{errors.password}</p>
                            )}
                        </div>
              <div className="form__group">
                <input type='password' placeholder='Confirm Password' name="cpassword" required ref={signupConfirmPasswordRef} value={values.cpassword} onBlur={handleBlur} onChange={handleChange}/>
              </div>
              <div className='error_container'>
                            {errors.cpassword && touched.cpassword && (
                                <p className='form_error'>{errors.cpassword}</p>
                            )}
                        </div>
                        
              <button type="submit" className='addToCart__btn' >Register</button>
              
            </form>
            <Link to='/login'>Already have an account ? Login here</Link>
           
          </Col>
          
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Register