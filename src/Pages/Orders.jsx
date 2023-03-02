/** @format */

import React, { useEffect, useState } from "react";
import CommonSection from "../Components/UI/common-section/CommonSection";
import Helmet from "../Components/Helmet/Helmet";
import { Container, Row, Col } from "react-bootstrap";
import { userOrder } from "../store/shopping-cart/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import SearchIcon from '@mui/icons-material/Search';
import { Modal } from "react-bootstrap";
import FilterListIcon from '@mui/icons-material/FilterList';
import OnlineDeliveryExperienceForm from "../Components/OnlineDeliveryExperienceForm/OnlineDeliveryExperienceForm";
const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [cookies, setCookie] = useCookies(null);
  const userId = cookies.userId;
  const handleButtonClick = () => {
    setShowModal(true);
  };
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.order.orderItems);
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(userOrder(userId));
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const filteredOrders = orderList.filter((order) =>
    order.some(
      (item) =>
        item.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedStatus === "" || item.status.toString() === selectedStatus)
    )
  );

  const pageCount = Math.ceil(orderList.length / itemsPerPage);
  const currentItems = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Helmet title='Orders'>
      <CommonSection title='Your Orders' />
      <section>
        <Container>
          <Row>
            <Col>
              <div className='mb-3'>
                <label htmlFor='search' style={{ fontWeight: 600 }}>
                  Search by restaurant name 
                </label> <SearchIcon/>
                <input
                  type='text'
                  className='form-control '
                  id='search'
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search by restaurant name'
                />
              </div>
            </Col>
            <Col>
            <label style={{ fontWeight: 600 }}>Filter by Order Status </label>  <FilterListIcon/> 
              <select
                className='form-select'
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value=''>All</option>
                <option value='0'>Order Confirmed</option>
                <option value='1'>Out for Delivery</option>
                <option value='2'>Delivered</option>
              </select>
            </Col>
            <Col></Col>
          </Row>

          <Row>
            <Col lg='12'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Food Items</th>
                    <th>Restaurant Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Feedback</th>
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {currentItems.map((order) =>
                    order.map((item) => (
                      <tr key={item.id}>
                        <td className='text-center cart__img-box'>
                          <img src={item.image} alt={item.foodname} />
                        </td>
                        <td>{item.foodname}</td>
                        <td>{item.restaurantName}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td style={{ fontWeight: 600 }}>
                          {item.status === 0 && "Order Confirmed"}
                          {item.status === 1 && "Out for delivery"}
                          {item.status === 2 && "Delivered"}
                        </td>
                        <td>
                          {item.status === 2 && (
                            <button
                              style={{
                                backgroundColor: "#212245",
                                border: "none",
                                color: "white",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                margin: "0 auto",
                                display: "block",
                              }}
                              onClick={handleButtonClick}
                            >
                              Leave feedback
                            </button>
                          )}

                          {showModal && (
                            <Modal
                              show={showModal}
                              onHide={() => setShowModal(false)}
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>Feedback Form</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <OnlineDeliveryExperienceForm
                                  restaurantId={item.restaurantId}
                                />
                              </Modal.Body>
                            </Modal>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {pageCount > 1 && (
                <nav>
                  <ul className='pagination'>
                    {Array.from({ length: pageCount }, (_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className='page-link'
                          style={{
                            backgroundColor: "#212245",
                            border: "1px solid black",
                            color: "white",
                            cursor: "pointer",

                            padding: "5px 13px",
                            marginRight: "5px",
                          }}
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Orders;
