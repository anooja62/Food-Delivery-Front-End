import React,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { getSingleMessage } from '../../../store/shopping-cart/messageSlice';
const MessageReply = () => {
  const dispatch = useDispatch();

  
  
  return (
    <div >
      <Paper elevation={3}>
        <form className="mt-3">
          <div className="new__register">
            <label>Restaurant Name</label>
            <input type="text" name="foodname" placeholder="" ></input>
           
          </div>
          <div className="new__register">
          <label>Query</label>
                        <input type='text' ></input>
                      </div>
          <div className="new__register">
            <label>Message</label>
           
          </div>
          <div className="new__register">
          <textarea rows={3} placeholder="Your Message"  ></textarea>
          </div>
          <div className="new__register">
            <label>Reply</label>
           
          </div>
          <div className="new__register">
          <textarea rows={3} placeholder="Reply" required ></textarea>
          </div>

          <div className="mt-4 text-center">
            <button className="addToCart__btn" type="submit">
             <ReplyOutlinedIcon/> Send Reply 
            </button>
          </div>
          <br></br>
        </form>
      </Paper>
    </div>
  )
}

export default MessageReply