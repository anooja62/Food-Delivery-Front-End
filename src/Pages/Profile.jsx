import React,{useState} from 'react'
import Helmet from '../Components/Helmet/Helmet'
import {Container,Row,Col} from 'react-bootstrap'
import Sidebar from '../Components/SideNav/Sidebar'
import CommonSection from '../Components/UI/common-section/CommonSection'
import ProfileCard from '../Components/Profile/ProfileCard'
import InputGroup from 'react-bootstrap/InputGroup';



import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';





 const Profile = () => {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return <Helmet title='Profile'>
        <CommonSection title='My Profile'/>
        
        <section>
        <Container>
            <Row>
               
               <Col md={4}> <Sidebar/>
               </Col>

               <Col xs={6}>
               <ProfileCard/>
                </Col>
            
               </Row>
               </Container>
               </section>
               <br></br>
               <br></br>
               <section>
                <Container>
             <Row>
                <Col  md={{ span: 3, offset: 3 }}>
                    <div className='profilecard'>
                        <h6> No Address Found</h6>
                    </div>
                </Col>
             <Col md={{ span: 3, offset: 3 }}>
             <button className='addToCart__btn' onClick={handleShow}><span><i class="ri-edit-box-line"></i> Add New Address</span>
        
      </button>

     
        <form>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <div className="form__group">
              <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Select disabled>
          <option>India</option>
        </Form.Select>
      </Form.Group>
               
              </div>
             
              <div className="form__group">
                <label>Name</label>
              <input type='text' placeholder='Ex. John Doe' required />
              </div>
              <div className="form__group">
              <label>Mobile Number</label>
              <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
        <Form.Control
         
          aria-label="phonenumber"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      </div>
      <div className="form__group">
      <label>Pincode</label>
      <input type='text' required/>
      </div>
      <div className="form__group">
      <label>Address</label>
      <textarea rows='3'></textarea>
      </div>
              
              <Row >
              <Col  sm={8}> <button type='submit' className='addToCart__btn' onClick={handleClose}>Save My Address</button></Col>
             <Col sm={4}> <Button variant="outline-success" onClick={handleClose}>Close</Button></Col>
              </Row>
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