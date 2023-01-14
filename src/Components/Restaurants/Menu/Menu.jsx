/** @format */

import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";
import "../../../styles/product-card.css";
import {
  deleteMenu,
  getMenus,
  availableMenu,
} from "../../../store/shopping-cart/menuSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import axios from "../../../axios";
import { storage } from "../../../Pages/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Menu = ({ menu, url }) => {
  const [available, setAvailable] = useState(true);

  const [cookies, setCookie] = useCookies(null);
  const restaurantId = cookies.restaurantId;
  const [show, setShow] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const handleClose = () => setShow(false);

  const [imageList, setImageList] = useState("");
  const imageListRef = ref(storage, "foodimages/");
  const navigate = useNavigate();

  const userId = cookies.userId;
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const cartDbUpdated = useSelector((state) => state.cart.dbUpdated);
  const menuFoodNameRef = useRef();
  const menuFoodPriceRef = useRef();
  const menuCategoryRef = useRef();
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    dispatch(deleteMenu(id));
  };

  const handleAvailability = async (id) => {
    setAvailable(false)
    dispatch(availableMenu(id));
  };

  const handleShow = () => {
    setShow(true);
  };

  const menuId = menu._id;

  let arr = [
    {
      userId: userId,
      products: [],
    },
  ];

  const handleAddItem = (menu, arr, cartProducts) => {
    dispatch(cartActions.addItem(menu));
    toast.success("Item Added to cart", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  //update menu
  const updateMenuData = async (e) => {
    e.preventDefault();
    const menu = {
      foodname: menuFoodNameRef.current.value,
      price: menuFoodPriceRef.current.value,
      category: menuCategoryRef.current.value,
      restaurantId: restaurantId,
    };

    console.log(imageUpload);
    if (imageUpload) {
      const imageRef = ref(storage, `foodimages/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((snaphsot) => {
        getDownloadURL(snaphsot.ref).then(async (imgUrl) => {
          setImageList(imgUrl);
          const res = await axios.put(`/food/update/${menuId}`, {
            ...menu,
            imgUrl,
          });
          setShow(false);
          dispatch(getMenus(restaurantId));
          toast.success("Menu Item updated successfully", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      });
    } else {
      const res = await axios.put(`/food/update/${menuId}`, { ...menu });
      setShow(false);
      dispatch(getMenus(restaurantId));
      toast.success("Menu Item updated successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 340 }} className='mt-5'>
        <CardMedia
          component='img'
          height='180'
          src={menu.imgUrl}
          alt='product'
        />
        <CardContent>
          <Typography gutterBottom variant='h6' component='div'>
            {menu.foodname}
          </Typography>
        </CardContent>

        <p>{menu.category}</p>

        <Row>
          <Col>
            <span className='product__price'>₹{menu.price}</span>
          </Col>
          <Col>
            {window.location.href.includes("admin-res") ? (
              <>
                {" "}
                <Stack direction='row' spacing={2}>
                  <Switch
                    checked={available}
                    onChange={() => handleAvailability(menu._id)}
                    name='loading'
                    color='primary'
                  />
                  <Button
                    variant='outlined'
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(menu._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant='contained'
                    endIcon={<EditIcon />}
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </Stack>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update Menu</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form className='mt-3' onSubmit={updateMenuData}>
                      <div className='new__register'>
                        <label>Food Name</label>
                        <input
                          type='text'
                          name='foodname'
                          ref={menuFoodNameRef}
                          placeholder=''
                          required
                          defaultValue={menu.foodname}
                        />
                      </div>

                      <div className='new__register'>
                        <label>Price</label>
                        <input
                          type='number'
                          name='price'
                          ref={menuFoodPriceRef}
                          placeholder='Price'
                          required
                          defaultValue={menu.price}
                        />
                      </div>

                      <div className='new__register'>
                        <label>Select Your Image</label>
                        <input
                          type='file'
                          onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                          }}
                          name='photo'
                          placeholder=''
                          accept='image/*'
                        />
                      </div>

                      <div className='new__register mt-2'>
                        <label for='category'>Category : </label>
                        <select ref={menuCategoryRef}>
                          <option value='Non-Veg'> Non-Veg</option>
                          <option value='Veg'>Veg</option>
                        </select>
                      </div>

                      <div className='mt-4 text-center'>
                        <button className='addToCart__btn' type='submit'>
                          Update Menu Item
                          <ToastContainer
                            position='top-center'
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
                  </Modal.Body>
                </Modal>
              </>
            ) : (
              <>
                {menu.isAvailable === 0 ? (
                  <button
                    className='addToCart__btn'
                    onClick={() => handleAddItem(menu, arr, cartProducts)}
                  >
                    Add to Cart
                    <ToastContainer
                      position='bottom-center'
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
                ) : (
                  <p style={{ color: "red", fontWeight: 600 }}>
                    Item Not Available
                  </p>
                )}
              </>
            )}
          </Col>
        </Row>
        <br></br>
      </Card>
      <br></br>
    </>
  );
};
export default Menu;
