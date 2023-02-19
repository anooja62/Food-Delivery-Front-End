import React, { useRef, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { addReview, getFoodreviews } from "../../../store/shopping-cart/reviewSlice";
import { useCookies } from "react-cookie";
import Review from "./Review";
import { Row,Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddReview = () => {
 
  const [cookies, setCookie] = useCookies(null);
  const user = cookies.name;
  let { id } = useParams();
  
  const reviewList = useSelector((state) => state.foodreview.list);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFoodreviews(id));
  }, []);
  const reviewNameRef = useRef();
  const reviewDescriptionRef = useRef();
  const handleReview = async (e) => {
    e.preventDefault();

    const foodreview = {
      name: reviewNameRef.current.value,
      description: reviewDescriptionRef.current.value,
      restaurantId: id,
    };

    try {
      dispatch(addReview(foodreview));
      toast.success("Thanks for the Review", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      reviewDescriptionRef.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage, setReviewsPerPage] = useState(5);

  const getCurrentReviews = () => {
    const lastIndex = currentPage * reviewsPerPage;
    const firstIndex = lastIndex - reviewsPerPage;
    return reviewList.slice(firstIndex, lastIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(reviewList.length / reviewsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="paginationBttns">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={currentPage === number ? "active" : ""}
            onClick={() => handlePageChange(number)}
            style={{
              backgroundColor: "#212245",
              border: "1px solid black",
              color: "white",
              cursor: "pointer",
             
              padding: "5px 13px",
              marginRight: "5px",
            }}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };
  
  return (
    <div>
     <Row>
      <Col>{reviewList.length !== 0 && (
        <>
          {getCurrentReviews().map((u) => (
            <Review key={u.id} foodreview={u} />
          ))}
          {renderPaginationButtons()}
        </>
      )}</Col>
     <Col>
     <h5 className="text-center ">Add review</h5>
       <Paper elevation={3}>
        <form className="mt-3" onSubmit={handleReview}>
          <div className="new__register">
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user}
              readOnly
              ref={reviewNameRef}
            ></input>
          </div>
          <div className="new__register">
            <label>Review</label>
            <div className="new__register">
              <textarea
                rows={5}
                placeholder="Review...."
                ref={reviewDescriptionRef}
              ></textarea>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button className="addToCart__btn" type="submit">
              Submit Review
              <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </button>
          </div>
        </form>
        <br></br>
      </Paper>
     </Col>
     
     </Row>
     
    </div>
  );
};

export default AddReview;