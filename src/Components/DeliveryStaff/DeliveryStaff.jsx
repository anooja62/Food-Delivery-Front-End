import React, { useRef,useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Row, Col } from "react-bootstrap";
import Paper from "@mui/material/Paper";
import { useCookies } from "react-cookie";
import { storage } from "../../Pages/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from "../../axios";

import { useNavigate } from "react-router-dom";
import DeliveryTopbar from "./DeliveryTopBar/DeliveryTopBar";
const DeliveryStaff = () => {
  const deliveryboyPasswordRef = useRef();
  const deliveryboyEmailRef = useRef();
  const deliveryboyNameRef = useRef();
  const deliveryboyPhoneRef = useRef();
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState("");
  const imageListRef = ref(storage, "deliveryboyimages/");


  const [cookies, removeCookie] = useCookies(null);
  const deliveryboyId = cookies.deliveryboyId;
  const deliveryboyName = cookies.deliveryboyName;
  const deliveryboyPhone = cookies.deliveryboyPhone;
  const deliveryboyEmail = cookies.deliveryboyEmail;


  const handleClick = async (e) => {
   
    e.preventDefault();

    const deliveryboy = {
      name: deliveryboyNameRef.current.value,
      phone: deliveryboyPhoneRef.current.value,
      email: deliveryboyEmailRef.current.value,
      password: deliveryboyPasswordRef.current.value,
      
    };
    if (imageUpload === null) return;
    const imageRef = ref(storage, `deliveryboyimages/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then(async (profileImg) => {
        setImageList(profileImg);
        const deliveryboys = await axios
        .put(`/deli/update-delivery/${deliveryboyId}`,
        {...deliveryboy,profileImg})
        
    });

    alert(" successful");
   
  });
};

  const navigate = useNavigate();
  const clearCookies = () => {
    removeCookie("deliveryboyId");
    removeCookie("deliveryboyName");
    removeCookie("deliveryboyPhone");
    
    navigate("/delivery-login");
  };
  return (
    <div>
      <DeliveryTopbar/>
      <Tabs>
        <TabList>
          <Tab>
            <p>
              <DeliveryDiningOutlinedIcon /> Orders
            </p>
          </Tab>

          <Tab>
            <p>
              <CurrencyRupeeOutlinedIcon /> Salary
            </p>
          </Tab>
          <Tab>
            <p>
              <ManageAccountsOutlinedIcon /> Profile
            </p>
          </Tab>
          <Tab>
          <p onClick={() => clearCookies()}>
              <LockOutlinedIcon /> Log Out
            </p>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="panel-content">
            <h2>Any content 1</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 2</h2>
          </div>
        </TabPanel>
        <TabPanel>
        <div className="panel-content">
          <div style={{ marginLeft: 150, marginRight: 200 }}>
            <h3 className="text-center">Profile Details</h3>
            <Paper elevation={3}>
              <form className="mt-3" onSubmit={handleClick}>
                <Row>
                  <Col>
                    <div className="new__register ">
                      <label for="ownername"> Name</label>
                      <input
                        type="text"
                        name="ownername"
                        placeholder="owner name"
                        ref={deliveryboyNameRef}
                        defaultValue={deliveryboyName}
                      ></input>
                    </div>
                  </Col>
                  <Col>
                    <div className="new__register">
                      <label> Phone Number </label>
                      <input
                        type="tel"
                        placeholder=" Phone Number"
                        name="number"
                        ref={deliveryboyPhoneRef}
                        defaultValue={deliveryboyPhone}
                      ></input>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <div className="new__register mt-5">
                      <label> Profile Picture </label>
                <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                          }}/>
        <PhotoCamera />
      </IconButton>
      </div>
      </Col>
      <Col>
      </Col>
                </Row>

                <br></br>

                <h3 className="text-center mt-4">Account Settings </h3>

                <Row>
                  <Col>
                    <div className="new__register ">
                      <label for="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        ref={deliveryboyEmailRef}
                        defaultValue={deliveryboyEmail}
                      ></input>
                    </div>
                  </Col>
                  <Col>
                    <div className="new__register">
                      <label>Change Password </label>
                      <input
                        type="password"
                        placeholder="Change Password"
                        name="password"
                        ref={deliveryboyPasswordRef}
                      ></input>
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

export default DeliveryStaff;
