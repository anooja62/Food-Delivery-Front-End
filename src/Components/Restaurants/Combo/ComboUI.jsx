import React, { useState, useEffect, useRef } from "react";
import { getCombos } from "../../../store/shopping-cart/comboSlice";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios"

import Combo from './Combo'
import { Row, Col } from "react-bootstrap";
import { storage } from "../../../Pages/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
const ComboUI = () => {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState("");
    const imageListRef = ref(storage, "comboimages/");
  
    const comboLIst = useSelector((state) => state.combo.list);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getCombos());
    }, []);
  
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
                        <label>Food Items</label>
                        <input
                          type="text"
                          name="Items"
                          ref={menuFoodNameRef}
                          placeholder=""
                          required
                        />
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
            
         

          {comboLIst.length !== 0 && (
            <>
              <div className="row d-flex justify-content-between align-items-center mt-5">
                {comboLIst.map((u) => (
                  <Combo key={u.id} combo={u} />
                ))}
              </div>
            </>
          )}
   
    </>
  )
}

export default ComboUI