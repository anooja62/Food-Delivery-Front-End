import React, { useEffect, useState } from "react";
import CommonSection from "../Components/UI/common-section/CommonSection";
import Helmet from "../Components/Helmet/Helmet";
import { Container, Row, Col } from "react-bootstrap";
import { userOrder } from "../store/shopping-cart/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

const Orders = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(null);
  const userId = cookies.userId;
  const orderList = useSelector((state) => state.order.orderItems);
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(userOrder(userId));
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageCount = Math.ceil(orderList.length / itemsPerPage);
  const currentItems = orderList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Helmet title="Orders">
      <CommonSection title="Your Orders" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {currentItems.map((order) => {
                
                return (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Product Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                      </tr>
                      {order.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className="text-center cart__img-box">
                              <img src={item.image} alt={item.foodname} />
                            </td>
                            <td>{item.foodname}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td style={{ fontWeight: 600 }}>
                              {item.status === 0 && "Order Confirmed"}
                              {item.status === 1 && "Out for delivery"}
                              {item.status === 2 && "Delivered"}
                            </td>
                          </tr>
                        );
                      })}
                    </thead>
                  </table>
                );
              })}
              {pageCount > 1 && (
                <nav>
                  <ul className="pagination">
                    {Array.from({ length: pageCount }, (_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
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
