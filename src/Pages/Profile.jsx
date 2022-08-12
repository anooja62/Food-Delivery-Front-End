import React, { useState, useRef } from 'react'
import Helmet from '../Components/Helmet/Helmet'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../Components/SideNav/Sidebar'
import CommonSection from '../Components/UI/common-section/CommonSection'
import ProfileCard from '../Components/Profile/ProfileCard'
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios'


import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


import { useCookies } from 'react-cookie'





const Profile = () => {

  const addressNameRef = useRef()
  const addressPhoneRef = useRef()

  const addressPincodeRef = useRef()
  const addressAddressRef = useRef()

  const handleClick = async (e) => {
console.log("hellllllllooooooooooooo")
    e.preventDefault()

    const customeraddress = {
      name: addressNameRef.current.value,
      phone: addressPhoneRef.current.value,
      pincode: addressPincodeRef.current.value,
      address: addressAddressRef.current.value,
    }
    try {
      await axios.post("add/useraddress", customeraddress)

    } catch (err) {
      console.log(err)
    }

  }


  const [cookies, setCookie, removeCookie] = useCookies(null)
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


            <form onSubmit={handleClick}>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Enter Your Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="form__group">
                    <Form.Group className="mb-3" >
                      <Form.Label>Country</Form.Label>
                      <Form.Select disabled>
                        <option>India</option>
                      </Form.Select>
                    </Form.Group>

                  </div>

                  <div className="form__group">
                    <label>Name</label>
                    <input type='text' placeholder='Ex. John Doe' required ref={addressNameRef} />
                  </div>
                  <div className="form__group">
                    <label>Mobile Number</label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                      <Form.Control

                        aria-label="phonenumber"
                        aria-describedby="basic-addon1"
                        ref={addressPhoneRef}
                        required
                      />
                    </InputGroup>
                  </div>
                  <div className="form__group">
                    <label>Pincode</label>
                    <input type='text' required ref={addressPincodeRef} />
                  </div>
                  <div className="form__group">
                    <label>Address</label>
                    <textarea rows='3' required ref={addressAddressRef}></textarea>
                  </div>
                  <button type='submit' className='addToCart__btn' >Save My Address</button>
                 
                </Modal.Body>

              </Modal>
             
            </form>

          </Col>
        </Row>
      </Container>
    </section>
    <section>

    </section>
  </Helmet>

}

export default Profile