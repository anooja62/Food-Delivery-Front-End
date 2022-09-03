import React, { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Checkbox from '@mui/material/Checkbox';
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios"
import { getMenus } from "../../../store/shopping-cart/menuSlice";
import { useCookies } from "react-cookie";
import { Row, Col } from "react-bootstrap";
import { storage } from "../../../Pages/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";


const ComboUI = () => {
  const [cookies, setCookie] = useCookies(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState("");
    const imageListRef = ref(storage, "comboimages/");
    const restaurantId = cookies.restaurantId;
    const menuLIst = useSelector((state) => state.menu.list);

    console.log(menuLIst)
    const dispatch = useDispatch();
    useEffect(() => {
      
      dispatch(getMenus(restaurantId));
    }, []);
    
  
    const handleChange = (event) => {
     
    };
    const menuFoodNameRef = useRef();
    const menuFoodPriceRef = useRef();
    const menuCategoryRef = useRef();

    const addMenuData = async (e) => {
        e.preventDefault();
       
        const combo = {
          Items: menuFoodNameRef.current.value,
          price:menuFoodPriceRef.current.value,
          category:menuCategoryRef.current.value,
          
        };
        
        if (imageUpload === null) return;
        const imageRef = ref(storage, `comboimages/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snaphsot) => {
          getDownloadURL(snaphsot.ref).then(async (imgUrl) => {
            setImageList(imgUrl);
            await axios.post("/comb/add-combo", { ...combo, imgUrl });
          });
    
          alert(" successful");
        });
      };
     

  return (
    <>
<h1 className="text-center">Add Combo Items</h1>
              <Paper elevation={3}>
                <form className="mt-3" onSubmit={addMenuData}>
                  <Row>
                    <Col>
                      <div className="new__register">
                      <FormLabel component="legend">Select Combo</FormLabel>
                     {   menuLIst.map((item)=>{
                      return (<Box sx={{ display: 'flex' }}>
                      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                      
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox checked={false} onChange={handleChange} name="gilad" />

                            }
                            label={item.foodname}
                          />
                         
                         
                        </FormGroup>
                       
                      </FormControl>
                      <FormControl
                        required
                 
                        component="fieldset"
                        sx={{ m: 3 }}
                        variant="standard"
                      >
                     
                      
                      </FormControl>
                    </Box>)
                     })
                      
                     }
                      
            
                     
         
                      </div>
                    </Col>
                    <Col>
                      <div className="new__register">
                        <label>Price</label>
                        <input type="number" name="price" ref={menuFoodPriceRef} placeholder="Price" required />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="new__register">
                        <label>Select Your Image</label>
                        <input
                          type="file"
                          onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                          }}
                          name="photo"
                          placeholder=""
                          required
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="new__register mt-5">
                        <label for="category">Category : </label>
                        <select ref={menuCategoryRef} >
                          <option value="Non-Veg"> Non-Veg</option>
                          <option value="Veg">Veg</option>
                        </select>
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-4 text-center">
                    <button className="addToCart__btn" type="submit">
                      Submit
                    </button>
                  </div>
                  <br></br>
                </form>
              </Paper>
            
         

    </>
  )
}

export default ComboUI