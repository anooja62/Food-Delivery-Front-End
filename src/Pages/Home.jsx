import React,{useState,useEffect} from 'react'
import Helmet from '../Components/Helmet/Helmet.js'
import {Container,Row,Col,ListGroup,ListGroupItem} from 'react-bootstrap'
import deliverman from '../assets/images/deliverman.png'
import whyimg from '../assets/images/whyimg.png'
import '../styles/maincontent.css'
import {Link} from 'react-router-dom'
import Category from '../Components/UI/category/Category.jsx'
import '../styles/home.css'
import featureImg01 from '../assets/images/service-01.png'
import featureImg02 from '../assets/images/service-02.png'
import featureImg03 from '../assets/images/service-03.png'

import products from '../assets/data/product.js'
import foodCategoryImg01 from '../assets/images/hamburger.png'
import foodCategoryImg02 from '../assets/images/pizza.png'
import foodCategoryImg03 from '../assets/images/bread.png'

import ProductCard from '../Components/UI/product-card/ProductCard.jsx'



import review from '../assets/images/review.jpg'

import TestimonialSlider from '../Components/UI/slider/TestimonialSlider.jsx'

const featureData = [
  {
    title:'Quick Delivery',
    imgUrl:featureImg01,
    desc:"Experience superfast delivery for food delivered fresh & on time "
  },
  {
    title:'Super Dine In',
    imgUrl:featureImg02,
    desc:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly "
  },
  {
    title:'No Minimum Order',
    imgUrl:featureImg03,
    desc:"Order in for yourself or for the group, with no restrictions on order value "
  },
]
const Home=()=> {
  const [category,setCategory]=useState('ALL')
  const [allProducts,setAllProducts]=useState(products)

  const [hotPizza,setHotPizza] = useState([])

  useEffect(()=>{
    const filteredPizza = products.filter(item=>item.category ==='Pizza')
    const slicePizza = filteredPizza.slice(0,4)
    setHotPizza(slicePizza)
  },[])

  useEffect(() => {
   if (category==='ALL'){
   setAllProducts(products)
  }
  if (category==='BURGER'){
  
  const filteredProducts = products.filter(item=>item.category==='Burger')
  setAllProducts(filteredProducts)
 }
 if (category==='PIZZA'){
  
  const filteredProducts = products.filter(item=>item.category==='Pizza')
  setAllProducts(filteredProducts)
 }
 if (category==='BREAD'){
  
  const filteredProducts = products.filter(item=>item.category==='Bread')
  setAllProducts(filteredProducts)
 }
  }, [category])



  return <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero__content">
<h5 className='mb-3'>Deliorder</h5>
<h1 className='mb-4 hero__title' ><span>Hungry ? </span>just wait <br/>food at <span> your door</span></h1>
<p>Order food from your favourite restaurants.</p>
<div className="hero__btns d-flex align-items-center gap-5 mt-4">
  <button className='order__btn d-flex align-items-center justify-content-between'>Order now<i class="ri-arrow-right-s-line"></i></button>
  <button className='all__foods-btn'><Link to='/foods'>See all food menu</Link></button>
</div>
<div className='hero__service d-flex align-items-center gap-5 mt-5'>
  <p className='d-flex align-items-center gap-2'><span className='delivery__icon'><i class="ri-car-line"></i></span>No delivery charge</p>
  <p className='d-flex align-items-center gap-2'><span className='delivery__icon'><i class="ri-shield-check-line"></i></span>100 % Secure checkout</p>
</div>
              </div>

            </Col>
            <Col lg='6' md='6'>
              <div className="hero__img">
                <img src={deliverman} alt='mainpic' className='w-100'/>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    
        <section className='pt-0'>
        <Category/>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h5 className='feature__subtitle mb-4'>What we serve</h5>
              <h2 className='feature__title'>just sit back at home</h2>
              <h2 className='feature__title'>we will <span>take care</span></h2>
              <p className='mb-1 mt-4 feature__text'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the</p>
              <p className='feature__text'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the.{""}</p>
            </Col>
           
            {
              featureData.map((item,index)=>(
                <Col lg='4' md='6' sm='6' key={index} className='mt-5'>
                <div className="feature__item text-center px-5 py-3">
                   <img src={item.imgUrl} alt='features' className='w-25 mb-3'/>
                   <h5 className='fw-bold mb-3'>{item.title}</h5>
                   <p>{item.desc}</p>
                </div>
              </Col>
              ))
            }
            <Col lg='4' md='4'></Col>
            <Col lg='4' md='4'></Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2>Popular Foods</h2>
            </Col>
            <Col lg='12'>
              <div className="food__category d-flex align-items-center justify-content-center gap-4">
                <button 
                className={`all__btn ${category === 'ALL' ? 'foodBtnActive' : ''}`}
                 onClick={()=>setCategory('ALL')}>
                  All</button>
                <button className={`d-flex align-items-center gap-2 ${category === 'BURGER' ? 'foodBtnActive' : ''}`}
                 onClick={()=>setCategory('BURGER')}>
                  <img src={foodCategoryImg01} alt='product'/>Burger</button>
                <button className={`d-flex align-items-center gap-2 ${category === 'PIZZA' ? 'foodBtnActive' : ''}`}
                onClick={()=>setCategory('PIZZA')}>
                  <img src={foodCategoryImg02} alt='product'/>Pizza</button>
                <button className={`d-flex align-items-center gap-2 ${category === 'BREAD' ? 'foodBtnActive' : ''}`} 
                onClick={()=>setCategory('BREAD')}>
                  <img src={foodCategoryImg03} alt='product'/>Bread</button>
              </div>
            </Col>
            
              {
              allProducts.map((item) => (
                <Col lg='3' md='4' sm='6' xs='6' key={item.id} className='mt-5'>
                <ProductCard item={item}/>
              </Col>
              ))}
            
           
          </Row>
        </Container>
      </section>
      <section className='why__choose-us'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
<img src={whyimg} alt='deliorder' className='whyimg'/>
            </Col>
            <Col lg='6' md='6'>
<div className="why__deliorder">
  <h2 className='deliorder__title mb-4'>Why <span> Deliorder ?</span></h2>
  <p className='deliorder__desc'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used 
    to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
    <ListGroup className='mt-4'>
      <ListGroupItem className='border-0 ps-0'>
      <p className='choose_us-title d-flex align-items-center gap-2'><i class="ri-checkbox-circle-line"></i>Fresh and tasty foods</p>
      <p className='choose_us-desc'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used 
    </p>
      </ListGroupItem>
      <ListGroupItem className='border-0 ps-0'>
      <p className='choose_us-title d-flex align-items-center gap-2'><i class="ri-checkbox-circle-line"></i>Quality support</p>
      <p className='choose_us-desc'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used 
    </p>
      </ListGroupItem>
      <ListGroupItem className='border-0 ps-0'>
      <p className='choose_us-title d-flex align-items-center gap-2'><i class="ri-checkbox-circle-line"></i>Order from any location</p>
      <p className='choose_us-desc'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used 
    </p>
      </ListGroupItem>
      <ListGroupItem className='border-0 ps-0'>
      <p className='choose_us-title d-flex align-items-center gap-2'><i class="ri-checkbox-circle-line"></i>Order from any location</p>
      <p className='choose_us-desc'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used 
    </p>
      </ListGroupItem>
    </ListGroup>
</div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2>Hot Pizza</h2>
            </Col>
            {
              hotPizza.map(item=>(
                <Col lg='3' md='4' key={item.id}>
                  <ProductCard item={item}/>
                </Col>
              ))
            }
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
           
            <Col lg='6' md='6'>
              <div className='testimonial'>
              <h5 className='testimonial__subtitle mb-4'>Testimonial</h5>
              <h2 className='testimonial__title mb-4'> What our <span>customers </span>are saying
              </h2>
              <p className='testimonial__desc'>In publishing and graphic design, Lorem ipsum is a placeholder text commonl
              the visual form of a document or a typeface</p>
              <TestimonialSlider/>
              </div>
            </Col>
            <Col lg='6' md='6'>
              
              <img src={review} alt='testimonial-img' className='review'/>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>;
  
};

export default Home