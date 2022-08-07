import React,{useRef} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import CommonSection from '../Components/UI/common-section/CommonSection'
import Helmet from '../Components/Helmet/Helmet'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import { signupSchema } from '../schemas'
import '../styles/formerror.css'
import {useNavigate} from 'react-router-dom'
import axios from ".././axios"
const initialValues ={
  name:'',
  phone:'',
  email:'',
  
 
};

const RestaurantRegister = ()=> {

  const {values,handleBlur,handleChange,errors,touched} = useFormik({
    initialValues,
    validationSchema:signupSchema,
    onSubmit:(values) =>{
     console.log(values);
    }
})

const navigate = useNavigate()
  const signupNameRef = useRef()
  
  const signupPhoneRef = useRef()
  
  const signupEmailRef = useRef()
  const signupAddressRef = useRef()
 

  const handleClick = async (e) => {
    
    e.preventDefault()
   
    
        const restaurant = {
            name:signupNameRef.current.value,
           phone:signupPhoneRef.current.value,
            email:signupEmailRef.current.value,
            address: signupAddressRef.current.value
        }

        try{
            await axios.post("/rest/add-restaurent",restaurant)
            navigate('/home')
        }catch(err){
            console.log(err)
        }
    }
    
  

  return <Helmet title='Restaurant-Register'>
    <CommonSection title='Register your resturant on Deliorder'/>
    <section>
      <Container>
        <Row>
          <Col xs='6' className='m-auto text-center'>
            <h4>Restaurant Details</h4><br></br>
            
            <form className="form mb-5" onSubmit={handleClick}>
              <div className="form__group">
                <input type='text' placeholder='Restaurant name' name='name' required ref={signupNameRef} value={values.name} onBlur={handleBlur} onChange={handleChange}/>
              </div>
              <div className='error_container'>
                            {errors.name && touched.name && (
                                <p className='form_error'>{errors.name}</p>
                            )}
                        </div>
              <div className="form__group">
                <input type='tel' placeholder='Phone' required ref={signupPhoneRef} name='phone' value={values.phone} onBlur={handleBlur} onChange={handleChange}/>
              </div>
              <div className='error_container'>
                            {errors.phone && touched.phone && (
                                <p className='form_error'>{errors.phone}</p>
                            )}
                        </div>
              <div className="form__group">
                <input type='email' placeholder='Email' name='email' required ref={signupEmailRef} value={values.email} onBlur={handleBlur} onChange={handleChange}/>
              </div>
              <div className='error_container'>
                            {errors.email && touched.email && (
                                <p className='form_error'>{errors.email}</p>
                            )}
                        </div>
              <div className="form__group">
                <textarea rows='5' placeholder='Address' required ref={signupAddressRef}></textarea>
              </div>
            
             
              <button className='addToCart__btn' disabled={errors.name || errors.phone || errors.email ? true : false}>Register</button>
              
            </form>
            <Link to='/login'>Already registered on Deliorder ? Login here</Link>
           
          </Col>
      
          
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default RestaurantRegister