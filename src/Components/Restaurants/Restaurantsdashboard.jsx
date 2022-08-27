import React, { useState, useEffect, useRef } from "react";
import Topbar from "../Admin/Topbar/Topbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import WhereToVoteOutlinedIcon from "@mui/icons-material/WhereToVoteOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import { getMenus } from "../../store/shopping-cart/menuSlice";
import axios from "../../axios";
import Menu from "./Menu/Menu";
import ComboUI from "./Combo/ComboUI";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Row, Col } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { storage } from "../../Pages/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Restaurantsdashboard = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState("");
  const imageListRef = ref(storage, "foodimages/");

  const menuLIst = useSelector((state) => state.menu.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMenus());
  }, []);

  const menuFoodNameRef = useRef();
  const menuFoodPriceRef = useRef();
  const menuCategoryRef = useRef();
  // add menu data

  const addMenuData = async (e) => {
    e.preventDefault();
    const menu = {
      foodname: menuFoodNameRef.current.value,
      price:menuFoodPriceRef.current.value,
      category:menuCategoryRef.current.value,
    };
    
    if (imageUpload === null) return;
    const imageRef = ref(storage, `foodimages/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then(async (imgUrl) => {
        setImageList(imgUrl);
        await axios.post("/food/add-menu", { ...menu, imgUrl });
      });

      alert(" successful");
    });
  };

  return (
    <div>
      <Topbar />
      <Tabs>
        <TabList>
          <Tab>
            <p>
              <DashboardOutlinedIcon /> Dashboard
            </p>
          </Tab>
          <Tab>
            <p>
              <LocalDiningOutlinedIcon /> Menu Card
            </p>
          </Tab>
          <Tab>
            <p>
              <FastfoodIcon /> Combos
            </p>
          </Tab>
          <Tab>
            <p>
              <LocalGroceryStoreOutlinedIcon /> Orders
            </p>
          </Tab>
          <Tab>
            <p>
              <CurrencyRupeeOutlinedIcon /> Payments
            </p>
          </Tab>
          <Tab>
            <p>
              <StarHalfOutlinedIcon /> Reviews
            </p>
          </Tab>
          <Tab>
            <p>
              <ManageAccountsIcon /> Manage
            </p>
          </Tab>
          <Tab>
            <p>
              <LockOutlinedIcon /> Log Out
            </p>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="panel-content">
            <div className="row mb-3">
              <div className="col-xl-3 col-sm-6 py-2">
                <div className="card bg-success text-white h-100">
                  <div className="card-body bg-success">
                    <div className="rotate">
                      <WhereToVoteOutlinedIcon fontSize="large" />
                    </div>
                    <h6 className="text-uppercase mt-3">Orders Completed</h6>
                    <h1 className="display-4" style={{ color: "#fff" }}>
                      8
                    </h1>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-danger h-100">
                  <div className="card-body bg-danger">
                    <div className="rotate">
                      <PendingActionsOutlinedIcon fontSize="large" />
                    </div>
                    <h6 className="text-uppercase mt-3">Orders Pending</h6>
                    <h1 className="display-4" style={{ color: "#fff" }}>
                      6
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <Col>
            <div style={{ marginLeft: 150, marginRight: 200 }}>
              <h1 className="text-center">Add Menu Item</h1>
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
            </div>
          </Col>

          {menuLIst.length !== 0 && (
            <>
              <div className="row d-flex justify-content-between align-items-center mt-5">
                {menuLIst.map((u) => (
                  <Menu key={u.id} menu={u} />
                ))}
              </div>
            </>
          )}
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
          <Col>
            <div style={{ marginLeft: 150, marginRight: 200 }}>
             <ComboUI/>
                  </div>
                  </Col>
                  </div>  
                 
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 4</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 5</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 6</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
           
            <div style={{ marginLeft: 150, marginRight: 200 }}>
              <h3 className="text-center">Restaurant Details</h3>
              <Paper elevation={3}>
                <form className="mt-3" onSubmit={addMenuData}>
                  <Row>
                    <Col>
                      <div className="new__register">
                        <label>Restaurant Name</label>
                        <input
                          type="text"
                          name="foodname"
                          ref={menuFoodNameRef}
                          placeholder="First Letter should be captial"
                          
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="new__register">
                        <label>LIC.NO</label>
                        <input type="number" name="license" ref={menuFoodPriceRef} placeholder="License Number"  />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="new__register">
                        <label>Upload Image of Restaurant</label>
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
                      <div className="new__register">
                      <label>Restaurant Phone Number</label>
                        <input type="tel" name="phone" ref={menuFoodPriceRef} placeholder="Phone Number" />

                      </div>
                    </Col>
                  </Row>
                  <div className="new__register">
                      <label>About Restaurant</label>
                        <textarea rows={4} name="about" ref={menuFoodPriceRef} placeholder="What Special about Restaurant..."></textarea>

                      </div>

                  <div className="mt-4 text-center">
                    <button className="addToCart__btn" type="submit">
                      Submit
                    </button>
                  </div>
                  <br></br>
                </form>
              </Paper>
              <h3 className="text-center mt-4">FSSAI Details</h3>
              <Paper elevation={3}>
                <form className="mt-3" onSubmit={addMenuData}>
                  <Row>
                    
                    <Col>
                      <div className="new__register">
                        <label>Issued On: </label>
                      <input type='date'></input>
      
                      </div>
                    </Col>
                    <Col>
                    <div className="new__register">
                        <label>Expire On: </label>
                      <input type='date'></input>
      
                      </div>
                    </Col>
                  </Row>
                  <Row>
                  <Col>
                    
                    <div className="new__register mt-5">
                      <label for="licensetype">License Type : </label>
                      <select ref={menuCategoryRef} >
                        <option value=" Central license">  Central license</option>
                        <option value="State license"> State license</option>
                        <option value="Basic registration license"> Basic registration license</option>
                      </select>
                    </div>
                 
                  </Col>
                    <Col>
                    <div className="new__register mt-5">
                    <label>For Renewal :</label>
                    <a href="https://www.foodlicenseportal.org/?gclid=EAIaIQobChMI_53L85jn-QIVA5hmAh2tzwWLEAAYASAAEgLCWfD_BwE">Go to FSSAI Offical Site</a>
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

              <h3 className="text-center mt-4">Owner Details</h3>
              <Paper elevation={3}>
                <form className="mt-3" onSubmit={addMenuData}>
                  <Row>
                    <Col>
                    
                      <div className="new__register ">
                        <label for="ownername">Owner Name</label>
                        <input type='text' name="ownername" placeholder="owner name"></input>
                      </div>
                   
                    </Col>
                    <Col>
                      <div className="new__register">
                        <label>Owner Phone Number </label>
                      <input type='tel' placeholder="Owner's Phone Number" name="ownernumber"></input>
      
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
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Restaurantsdashboard;
