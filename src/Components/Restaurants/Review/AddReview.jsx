import React, { useRef, useEffect, useState } from "react";
import axios from "../../../axios";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { getFoodreviews } from "../../../store/shopping-cart/reviewSlice";
import { useCookies } from "react-cookie";
import Review from "./Review";
const AddReview = () => {
  const [cookies, setCookie] = useCookies(null);
  const user = cookies.name;
  let { id } = useParams();
  console.log(id);
  const reviewList = useSelector((state) => state.review.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFoodreviews(id));
  }, [reviewList]);
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
      await axios.post("/revi/review", foodreview);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
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
            </button>
          </div>
        </form>
        <br></br>
      </Paper>
      {reviewList.length !== 0 && (
        <>
          {reviewList.map((u) => (
            <Review key={u.id} review={u} />
          ))}
        </>
      )}
    </div>
  );
};

export default AddReview;
