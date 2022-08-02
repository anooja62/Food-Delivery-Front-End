import React,{useRef} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import CommonSection from '../Components/UI/common-section/CommonSection'
import Helmet from '../Components/Helmet/Helmet'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import { signupSchema } from '../schemas'
import '../styles/formerror.css'

const initialValues ={
  resname:'',
  resphone:'',
  resemail:'',
  
 
};

const RestaurantRegister = ()=> {

  const {values,handleBlur,handleChange,errors,touched} = useFormik({
    initialValues,
    validationSchema:signupSchema,
    onSubmit:(values) =>{
     console.log(values);
    }
})
console.log(touched);

  const signupResNameRef = useRef()
  
  const signupResPhoneRef = useRef()
  
  const signupResEmailRef = useRef()
  const signupResAddressRef = useRef()
  const signupOwnerNameRef = useRef()
  const signupOwnerEmailRef = useRef()
  const signupOwnerPhoneRef = useRef()

  const handleClick = async (e) => {
    
    e.preventDefault()
  }

  return <Helmet title='Restaurant-Register'>
    <CommonSection title='Register your resturant on Deliorder'/>
    <section>
      <Container>
        <Row>
          <Col xs='6' className='m-auto text-center'>
            <h4>Restaurant Details</h4><br></br>
            
            <form className="form mb-5" onClick={handleClick}>
              <div className="form__group">
                <input type='text' placeholder='Restaurant name' required ref={signupResNameRef} value={values.name} onBlur={handleBlur} onChange={handleChange}/>
              </div>
              <div className='error_container'>
                            {errors.name && touched.resname && (
                                <p className='form_error'>{errors.name}</p>
                            )}
                        </div>
              <div className="form__group">
                <input type='tel' placeholder='Phone' required ref={signupResPhoneRef} value={values.phone} onBlur={handleBlur} onChange={handleChange}/>
              </div>
              <div className='error_container'>
                            {errors.phone && touched.resphone && (
                                <p className='form_error'>{errors.phone}</p>
                            )}
                        </div>
              <div className="form__group">
                <input type='email' placeholder='Email' required ref={signupResEmailRef} value={values.email} onBlur={handleBlur} onChange={handleChange}/>
              </div>
              <div className='error_container'>
                            {errors.email && touched.resemail && (
                                <p className='form_error'>{errors.email}</p>
                            )}
                        </div>
              <div className="form__group">
                <textarea rows='5' placeholder='Address' required ref={signupResAddressRef}></textarea>
              </div>
            
             
              <button className='addToCart__btn'>Register</button>
              
            </form>
            <Link to='/login'>Already registered on Deliorder ? Login here</Link>
           
          </Col>
          <Col xs='6' className='m-auto text-center'>
          <h4>Owner Details</h4><br></br>
            
            <form className="form mb-5">
              <div className="form__group">
                <input type='text' placeholder='Owner Name' required ref={signupOwnerNameRef}/>
              </div>
              <div className='error_container'>
                            {errors.name && touched.name && (
                                <p className='form_error'>{errors.name}</p>
                            )}
                        </div>
              <div className="form__group">
                <input type='number' placeholder='Phone' required ref={signupOwnerPhoneRef}/>
              </div>
              <div className="form__group">
                <input type='email' placeholder='Email' required ref={signupOwnerEmailRef}/>
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