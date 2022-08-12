import React, { useState, useRef } from 'react'
import Helmet from '../Components/Helmet/Helmet'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../Components/SideNav/Sidebar'
import CommonSection from '../Components/UI/common-section/CommonSection'
import ProfileCard from '../Components/Profile/ProfileCard'
import axios from "../axios"
import Modal from 'react-bootstrap/Modal';
import { useCookies } from 'react-cookie'
const Profile = () => {

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
                    <input type='text' name='name' placeholder='Ex. John Doe' required ref={signupNameRef} />
                  </div>
                  <div className="form__group">
                    <label>Mobile Number</label>
                    <input type="tel" name='phone' required ref={signupPhoneRef} />
                  </div>
                  <div className="form__group">
                    <label>Pincode</label>
                    <input type='text' name='pincode' required ref={signupPincodeRef} />
                  </div>
                  <div className="form__group">
                    <label>Address</label>
                    <textarea rows='3' name='address' required ref={signupAddressRef}></textarea>
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