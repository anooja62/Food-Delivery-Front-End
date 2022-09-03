import React,{useRef} from "react";

import Paper from "@mui/material/Paper";
import { useCookies } from "react-cookie";
import axios from '../../../axios';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';

const ContactDeliorder = () => {
    const [cookies, setCookie] = useCookies(null);
  const restaurantId = cookies.restaurantId;
  const restaurantName = cookies.restaurantName;
  const restaurantNameRef = useRef();
  const restaurantMessageRef = useRef();
  const restaurantQueryRef = useRef();
  const handleClick = async (e) => {
    e.preventDefault();

    
   
      const message= {
        restaurantname: restaurantNameRef.current.value,
        requestFor:  restaurantQueryRef.current.value,
        msg:restaurantMessageRef.current.value,
       
      };

      try {
        await axios.post("/msg/add-message", message);
        alert(" successful");
      } catch (err) {
        console.log(err);
      }
    };
 
  return (
    <div style={{ marginLeft: 150, marginRight: 200 }}>
      <Paper elevation={3}>
        <form className="mt-3" onSubmit={handleClick}>
          <div className="new__register">
            <label>Restaurant Name</label>
            <input type="text" name="" placeholder="" readOnly
            defaultValue={restaurantName}
            ref={restaurantNameRef} />
          </div>
          <div className="new__register mt-2">
                        <label for="category">Your Problem / Need : </label>
                        </div>
                        <div className="new__register mt-2" style={{marginLeft:40}}>
                        <select ref={restaurantQueryRef} >
                          <option disabled selected>Select Your Query</option>
                          
                          <option value="My Restaurant is not shown in Deliorder List, Why ?"> My Restaurant is not shown in Deliorder List, Why ?  </option>
                          <option value="Delete My Restaurant From Deliorder List"> Delete My Restaurant From Deliorder List  </option>
                          <option value="Temporarily Disable My Restaurant From Deliorder List">Temporarily Disable My Restaurant From Deliorder List  </option>
                        </select>
                      </div>
          <div className="new__register">
            <label>Your Message</label>
           
          </div>
          <div className="new__register">
          <textarea rows={3} placeholder="Your Message" required ref={restaurantMessageRef} name='msg'></textarea>
          </div>

          <div className="mt-4 text-center">
            <button className="addToCart__btn" type="submit">
              Send Message <MarkunreadOutlinedIcon/>
            </button>
          </div>
          <br></br>
        </form>
      </Paper>
    </div>
  );
};

export default ContactDeliorder;
