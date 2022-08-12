import React, { useState, useRef } from 'react'
import Helmet from '../Components/Helmet/Helmet'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../Components/SideNav/Sidebar'
import CommonSection from '../Components/UI/common-section/CommonSection'
import ProfileCard from '../Components/Profile/ProfileCard'
import axios from "../axios"
import Modal from 'react-bootstrap/Modal';
import { useCookies } from 'react-cookie'

import { useFormik } from 'formik'
import { signupSchema } from '../schemas'

const initialValues = {
  name: '',
  phone: '',
  pincode: '',
  address: '',
 

};
const Profile = () => {

  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  })

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
      address: signupAddressRef.current.value
    }
    try {
      await axios.post("addr/address", shipping)
      
    } catch (err) {
      console.log(err)
    }

  }
  const [cookies, setCookie] = useCookies(null)
  const user = cookies.name
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          <Col md={{ span: 3, offset: 3 }}>
            <div className='profilecard'>
              <h6> No Address Found</h6>
            </div>
          </Col>
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