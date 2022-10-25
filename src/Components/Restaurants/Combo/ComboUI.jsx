import React, { useState, useEffect, useRef } from "react";
import Combo from './Combo'
import { getCombos } from "../../../store/shopping-cart/comboSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [cookies, setCookie] = useCookies(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState("");
  const imageListRef = ref(storage, "comboimages/");
  const restaurantId = cookies.restaurantId;
  const menuLIst = useSelector((state) => state.menu.list);
  const comboList = useSelector((state) => state.combo.list);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMenus(restaurantId));
    dispatch(getCombos(restaurantId));
  }, []);

  const handleChange = (event) => {};
 
  const menuFoodPriceRef = useRef();
  const menuCategoryRef = useRef();

  const addComboData = async (e) => {
    e.preventDefault();

    const combo = {
      foodname: checked,
      price: menuFoodPriceRef.current.value,
      category: menuCategoryRef.current.value,
      restaurantId: restaurantId,
    };

    if (imageUpload === null) return;
    const imageRef = ref(storage, `comboimages/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then(async (imgUrl) => {
        setImageList(imgUrl);
        await axios.post("/comb/add-combo", { ...combo, imgUrl })
        .then(() => {
          dispatch(getCombos());
        });
        toast.success("Item Added to Combo List", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setChecked([])
        setTotalPrice('')
      });

     
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
        console.log(values)
        const CheckedItemList = menuLIst.filter(
          (item) => {
            console.log(item)
           return item.foodname+item._id === values}
        );

        checkedFinalItems.push(...CheckedItemList);
        return CheckedItemList;
      });
    };
    checkedListArr(checked);
  }, [checked]);

  useEffect(() => {
    const sum = checkedFinalItems.reduce((accumulator, object) => {
      
      return Number(accumulator) + Number(object.price);
    }, 0);
    setTotalPrice(sum);
    
  }, [checked]);
  const handleImageUpload = (event) => {
    console.log(event.target.files[0].name.includes("png"))
    if( event.target.files[0].name.includes("png") || event.target.files[0].name.includes("jpg")){
      setImageUpload(event.target.files[0]);
      setError("")
    }else{
      setError("you can upload only images")
   
    }
  }
   
  return (
    <>
      <h1 className="text-center">Add Combo Items</h1>
      <Paper elevation={3}>
        <form className="mt-3" onSubmit={addComboData}>
          <div className="new__register">
            <label> Select Combo</label>
          </div>{" "}
          <div style={{ paddingLeft: 50 }}>
            {menuLIst.map((item, index) => {
              return (
                <div key={index}>
                  <input
                    value={item.foodname+item._id}
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
                  onChange={
                 handleImageUpload
                  }
                  name="photo"
                  placeholder=""
                  required
                  accept="image/*"
                />
                <p style={{color:"red",fontWeight:600}}>{error}</p>
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
          <br></br>
        </form>
        
      </Paper>
      <br/>
      {comboList.length !== 0 && (
        <>
          <div className="row d-flex justify-content-between ">
            {comboList.map((u) => (
              <Combo key={u.id} combo={u} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ComboUI;