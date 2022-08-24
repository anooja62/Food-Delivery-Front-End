import React, { useState, useRef,useEffect } from 'react'
import Helmet from '../Components/Helmet/Helmet'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../Components/SideNav/Sidebar'
import CommonSection from '../Components/UI/common-section/CommonSection'
import ProfileCard from '../Components/Profile/ProfileCard'
import axios from "../axios"
import Modal from 'react-bootstrap/Modal';
import { useCookies } from 'react-cookie'
import Address from '../Components/UI/Address/Address'
import { getShippings,addShippingAddress } from "../store/shopping-cart/addressSlice";
import { useFormik } from 'formik'
import { signupSchema } from '../schemas'
import { useDispatch, useSelector } from "react-redux";

const initialValues = {
  name: '',
  phone: '',
  pincode: '',
  address: '',
 

};
const Profile = () => {

  const [cookies, setCookie] = useCookies(null)
  const userId = cookies.userId
  const user = cookies.user
// let data = []
  // const [data,setData] =useState([])
  const [show, setShow] = useState(false);
  const data = useSelector((state) => state.shipping.list);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  })
 
  // setData(shippingLIst)
  console.log(data.length)
  
  // data.push(shippingLIst)
// setData(tempArr)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getShippings(userId));
   
  }, []);
  const signupNameRef = useRef()
  const signupPhoneRef = useRef()
  const signupPincodeRef = useRef()
  const signupAddressRef = useRef()

  const handleClick = async (e) => {
  

    e.preventDefault()
    const shipping = {
      name: signupNameRef.current.value,
      phone: signupPhoneRef.current.value,
      pincode: signupPincodeRef.current.value,
      address: signupAddressRef.current.value,
      userId:userId,
     
    }
    
    try {
      dispatch(addShippingAddress(shipping))
      setShow(false)
      
      
      
    } catch (err) {
      console.log(err)
    }

  }
  

  return <Helmet title='Profile'>
    <CommonSection title={user} />

    <section>
      <Container>
        <Row>

          <Col md={4}> <Sidebar />
          </Col>

          <Col xs={6}>
            <ProfileCard />
          </Col>

        </Row>
      </Container>
    </section>
    <br></br>
    <br></br>
    <section>
      <Container>
        <Row>
         { data.length === 0 && 
         <>
          <Col md={{ span: 3, offset: 3 }}>
            <div className='profilecard'>
              <h6> No Address Found</h6>
            
            </div>
          </Col>
          </>}
         { data.length !== 0 && 
         <>
          <Col md={{ span: 3, offset: 3 }}>
            <div className='profilecard'>
           

            {data.map((u) => (
                    <Address key={u.id} shipping={u} />
                  ))}
        
                 
                  
            </div>
          
          </Col>
            </>}

          
         

          
          <Col md={{ span: 3, offset: 3 }}>
            <button className='addToCart__btn' onClick={handleShow}><span><i class="ri-edit-box-line"></i> Add New Address</span>

            </button>


           
             
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Enter Your Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleClick}>
                  <div className="form__group">
                    <label>Name</label>
                    <div className="form__group">
                <input type='text' placeholder='(Eg. John Doe)' name="name" required ref={signupNameRef} value={values.name} onBlur={handleBlur} onChange={handleChange} />
              </div>
              <div className='error_container'>
                {errors.name && touched.name && (
                  <p className='form_error'>{errors.name}</p>
                )}
              </div>
                  </div>
                  <div className="form__group">
                <input type='tel' placeholder='Mobile Number' name="phone" required ref={signupPhoneRef} value={values.phone} onBlur={handleBlur} onChange={handleChange} />
              </div>
              <div className='error_container'>
                {errors.phone && touched.phone && (
                  <p className='form_error'>{errors.phone}</p>
                )}
              </div>
              <div className="form__group">
                <input type='text' placeholder='Pincode' name="pincode" required ref={signupPincodeRef} value={values.pincode} onBlur={handleBlur} onChange={handleChange} />
              </div>
              <div className='error_container'>
                {errors.pincode && touched.pincode && (
                  <p className='form_error'>{errors.pincode}</p>
                )}
              </div>
              <div className="form__group">
                <textarea placeholder='House name and address' name="address" required ref={signupAddressRef} value={values.address} onBlur={handleBlur} onChange={handleChange} />
              </div>
              <div className='error_container'>
                {errors.address && touched.address && (
                  <p className='form_error'>{errors.address}</p>
                )}
              </div>
                  <button type="submit" className='addToCart__btn' >Save My Address</button>
                  </form>
                </Modal.Body>

              </Modal>

           

          </Col>
        </Row>
      </Container>
    </section>
    <section>

    </section>
  </Helmet>

}

export default Profile