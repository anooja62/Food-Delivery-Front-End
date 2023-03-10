/** @format */

import React, { useEffect, useState } from "react";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Row, Col } from "react-bootstrap";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import Menu from "./Menu/Menu";
import Combo from "./Combo/Combo";
import ReactPaginate from "react-paginate";
import "../../styles/all-foods.css";
import "../../styles/pagination.css";
import "../../styles/restaurantui.css";
import { getMenus } from "../../store/shopping-cart/menuSlice";
import { getCombos } from "../../store/shopping-cart/comboSlice";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useParams, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import About from "./About/About";
import Details from "./Details/Details";
import { Container } from "react-bootstrap";
import AddReview from "./Review/AddReview";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SearchIcon from "@mui/icons-material/Search";
const RestaurantUI = () => {
  const [cookies, setCookie] = useCookies(null);
  const userId = cookies.userId;
  const navigate = useNavigate();
  if (!userId) {
    navigate("/login");
  }
  let { id } = useParams();

  const menuList = useSelector((state) => state.menu.list);
  const comboList = useSelector((state) => state.combo.list);

  const cartProducts = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenus(id));
    dispatch(getCombos(id));
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [voiceSearch, setVoiceSearch] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition({
    onResult: (result) => {
      setSearchTerm(result);
    },
  });

  const searchInput = voiceSearch ? transcript : searchTerm;
  const searchedProduct = menuList.filter((item) => {
    if (searchInput === "") return true; 

    return item.foodname.toLowerCase().includes(searchInput.toLowerCase());
  });

  const productPerPage = 8;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage > searchedProduct.length
      ? searchedProduct.length
      : visitedPage + productPerPage
  );

  const pageCount = Math.ceil(menuList.length / productPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setVoiceSearch(false);
  };

  return (
    <section>
   <Container>
      <div >
        <Details />
      </div>

      <div className='emenu mt-5'>
        <Tabs>
          <TabList>
            <Tab>
              <p>
                <LocalDiningOutlinedIcon /> E Menu Card
              </p>
            </Tab>
            <Tab>
              <p>
                <FastfoodIcon /> Combos
              </p>
            </Tab>
            <Tab>
              <p>
                <StarHalfIcon /> Reviews
              </p>
            </Tab>
            <Tab>
              <p>
                <FoodBankIcon /> About Us
              </p>
            </Tab>
          </TabList>

          <TabPanel>
            <div className='panel-content'>
              <h4>Order Now !</h4>
              <Row>
                <Col lg='6' md='6' sm='6' xs='12'>
                  <div className='search__widget d-flex align-items-center justify-content-between'>
                    <input
                      type='text'
                      placeholder="I'm looking for....."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <span>
                      <SearchIcon onClick={() => setVoiceSearch(false)} />
                    </span>
                  </div>
                </Col>
                <Col>
                  <KeyboardVoiceIcon
                    onClick={() => {
                      setVoiceSearch(true);
                      resetTranscript();
                      SpeechRecognition.startListening();
                    }}
                    style={{ color: voiceSearch ? "red" : "inherit" }}
                  />
                </Col>
              </Row>

              <div className='row d-flex justify-content-between '>
                {displayPage.map((item) => {
                  return <Menu key={item.id} menu={item} />;
                })}
              </div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                containerClassName='paginationBttns'
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panel-content '>
              <div className='row d-flex justify-content-between '>
                {comboList.map((u) => {
                  return <Combo key={u.id} combo={u} />;
                })}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panel-content'>
              <div style={{ marginLeft: 150, marginRight: 200 }}>
                <AddReview />
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='panel-content'>
              <About />
            </div>
          </TabPanel>
        </Tabs>
      </div>
      </Container>
    </section>
  );
};

export default RestaurantUI;
