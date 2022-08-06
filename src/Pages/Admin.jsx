import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Admin/Sidebar/Sidebar'
import Topbar from '../Components/Admin/Topbar/Topbar'
import { Container, Row, Col } from 'react-bootstrap'
import Adminhome from '../Components/Admin/Adminhome/Adminhome'
import Manage from '../Components/Admin/Manage/Manage'
import axios from ".././axios"

const Admin = () => {
  const [restaurant, setRestaurant] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/rest/all-restaurent`)
      setRestaurant(res.data)

    }
    fetchUser()
  }, [])

  console.log(restaurant)
  return (
    <div>

      <Container fluid>
        <Row>
          <Row>
            <Col> <Topbar /></Col>
          </Row>
          <Row>
            <Col xs lg="2"> <Sidebar /></Col>

            <Col>
              <div>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Restaurant Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  {restaurant.map((u) => (
                    <Manage key={u.id} restaurant={u} />

                  ))}


                </table>
              </div>
            </Col>

          </Row>
        </Row>
      </Container>



    </div>

  )

}
export default Admin
