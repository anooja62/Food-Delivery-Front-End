import React, { useRef, useEffect, useState } from "react";
import axios from "../../../axios";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { addReview, getFoodreviews } from "../../../store/shopping-cart/reviewSlice";
import { useCookies } from "react-cookie";
import Review from "./Review";
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
     
      {reviewList.length !== 0 && (
        <>
          {reviewList.map((u) => (
            <Review key={u.id} foodreview={u} />
          ))}
        </>
      )}
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
    </div>
  );
};

export default AddReview;