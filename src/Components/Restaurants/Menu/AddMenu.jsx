import React,{useRef,useEffect, useState} from 'react'
import { getMenus } from '../../../store/shopping-cart/menuSlice';
import axios from "../../../axios";
import { storage } from "../../../Pages/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Row, Col } from "react-bootstrap";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import Menu from './Menu';


const AddMenu = () => {
  
    const [cookies, setCookie] = useCookies(null);
  const restaurantId = cookies.restaurantId;
    const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState("");
  const imageListRef = ref(storage, "foodimages/");
  const menuLIst = useSelector((state) => state.menu.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMenus(restaurantId));
  }, []);
  const menuFoodNameRef = useRef();
  const menuFoodPriceRef = useRef();
  const menuCategoryRef = useRef();

  // add menu data

  const addMenuData = async (e) => {
    e.preventDefault();
    const menu = {
      foodname: menuFoodNameRef.current.value,
      price: menuFoodPriceRef.current.value,
      category: menuCategoryRef.current.value,
      restaurantId: restaurantId,
    };

    if (imageUpload === null) return;
    const imageRef = ref(storage, `foodimages/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then(async (imgUrl) => {
        setImageList(imgUrl);
        const res = await axios
          .post("/food/add-menu", { ...menu, imgUrl })
          .then(() => {
            dispatch(getMenus());
          });
      });

      alert(" successful");
     
    });
  };
  return (
    <div>
 <Paper elevation={3}>
                <form className="mt-3" onSubmit={addMenuData}>
                  <Row>
                    <Col>
                      <div className="new__register">
                        <label>Food Name</label>
                        <input
                          type="text"
                          name="foodname"
                          ref={menuFoodNameRef}
                          placeholder=""
                          required
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="new__register">
                        <label>Price</label>
                        <input
                          type="number"
                          name="price"
                          ref={menuFoodPriceRef}
                          placeholder="Price"
                          required
                        />
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
                        <select ref={menuCategoryRef}>
                          <option value="Non-Veg"> Non-Veg</option>
                          <option value="Veg">Veg</option>
                        </select>
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-4 text-center">
                    <button className="addToCart__btn" type="submit">
                      Create Menu Item
                    </button>
                  </div>
                  <br></br>
                </form>
              </Paper>
  
     {menuLIst.length !== 0 && (
        <>
          <div className="row d-flex justify-content-between ">
            {menuLIst.map((u) => (
              <Menu key={u.id} menu={u} />
            ))}
          </div>
        </>
      )}
      
        </div>
  )
}

export default AddMenu