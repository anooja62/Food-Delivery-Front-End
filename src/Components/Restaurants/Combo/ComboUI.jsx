import React, { useState, useEffect, useRef } from "react";



import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import { getMenus } from "../../../store/shopping-cart/menuSlice";
import { useCookies } from "react-cookie";
import { Row, Col } from "react-bootstrap";
import { storage } from "../../../Pages/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const ComboUI = () => {
  const [checked, setChecked] = useState([]);
  let checkedFinalItems = [{}];
  var theRemovedElement = checkedFinalItems.shift();

  const [totalPrice, setTotalPrice] = useState(0);
  const [cookies, setCookie] = useCookies(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState("");
  const imageListRef = ref(storage, "comboimages/");
  const restaurantId = cookies.restaurantId;
  const menuLIst = useSelector((state) => state.menu.list);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMenus(restaurantId));
  }, []);

  const handleChange = (event) => {};
  const menuFoodNameRef = useRef();
  const menuFoodPriceRef = useRef();
  const menuCategoryRef = useRef();

  const addMenuData = async (e) => {
    e.preventDefault();

    const combo = {
      Items: menuFoodNameRef.current.value,
      price: menuFoodPriceRef.current.value,
      category: menuCategoryRef.current.value,
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

  const handleCheck = (event) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  useEffect(() => {
    const checkedListArr = (list) => {
      list.forEach((values) => {
        const CheckedItemList = menuLIst.filter(
          (item) => item.foodname === values
        );

        checkedFinalItems.push(...CheckedItemList);
        return CheckedItemList;
      });
    };
    checkedListArr(checked);
  }, [checked]);

  useEffect(() => {
    const sum = checkedFinalItems.reduce((accumulator, object) => {
      console.log(object);
      return Number(accumulator) + Number(object.price);
    }, 0);
    setTotalPrice(sum);
  }, [checked]);

  return (
    <>
      <h1 className="text-center">Add Combo Items</h1>
      <Paper elevation={3}>
        <form className="mt-3" onSubmit={addMenuData}>
          <div className="new__register">
            <label> Select Combo</label>
          </div>{" "}
          <div style={{ paddingLeft: 50 }}>
            {menuLIst.map((item, index) => {
              return (
                <div key={index}>
                  <input
                    value={item.foodname}
                    type="checkbox"
                    onChange={handleCheck}
                  />

                  <span> {item.foodname}</span>
                </div>
              );
            })}
          </div>
          <Row>
            <Col>
              <div className="new__register">
                <label>Original Price</label>
                <input
                  type="number"
                  name="price"
                  value={totalPrice}
                  // ref={menuFoodPriceRef}
                  placeholder="Price"
                  required
                />
              </div>
            </Col>
            <Col>
              <div className="new__register">
                <label>Combo Price</label>
                <input
                  type="number"
                  name="comboprice"
                  // ref={menuFoodPriceRef}
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
              Submit
            </button>
          </div>
          <br></br>
        </form>
      </Paper>
    </>
  );
};

export default ComboUI;
