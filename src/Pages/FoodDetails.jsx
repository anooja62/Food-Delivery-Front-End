import React, { useState, useEffect, useRef } from 'react'
import products from '../assets/data/product'
import { useParams } from 'react-router-dom';
import Helmet from '../Components/Helmet/Helmet'
import CommonSection from '../Components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'react-bootstrap'
import ProductCard from '../Components/UI/product-card/ProductCard'
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/shopping-cart/cartSlice';
import '../styles/product-details.css'
import axios from "../axios"





const FoodDetails = () => {


  const signupNameRef = useRef()
  const signupDescriptionRef = useRef()

  const handleClick = async (e) => {

    e.preventDefault()
    const foodreview = {
      name: signupNameRef.current.value,
      description: signupDescriptionRef.current.value
    }
    try {
      await axios.post("revi/review", foodreview)
      

    } catch (err) {
      console.log(err)
    }

  }

  const [tab, setTab] = useState('desc');

  const { id } = useParams();
  const dispatch = useDispatch()

  const product = products.find(product => product.id === id)
  const [previewImg, setPreviewImg] = useState(product.image01)
  const { title, price, category, desc, image01 } = product

  const relatedProduct = products.filter(item => category === item.category)
  const addItem = () => {
    dispatch(cartActions.addItem({
      id,
      title,
      price,
      image01
    }))
  }



  useEffect(() => {
    setPreviewImg(product.image01)
  }, [product])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])


  return <Helmet title='product-details'>
    <CommonSection title={title} />
    <section>
      <Container>
        <Row>
          <Col lg='2' md='2'>
            <div className="product__images">
              <div className="img__item mb-3" onClick={() => setPreviewImg(product.image01)}>
                <img src={product.image01} alt='productimage' className='w-50' />
              </div>
              <div className="img__item mb-3" onClick={() => setPreviewImg(product.image02)}>
                <img src={product.image02} alt='productimage' className='w-50' />
              </div>
              <div className="img__item mb-3" onClick={() => setPreviewImg(product.image03)}>
                <img src={product.image03} alt='productimage' className='w-50' />
              </div>
            </div>
          </Col>
          <Col lg='4' md='4'>
            <div className="product__main-img">
              <img src={previewImg} alt='' className='w-100' />
            </div>
          </Col>
          <Col lg='6' md='6'>
            <div className="single__product-content">
              <h2 className='product__title mb-3'>{title}</h2>
              <p className='product__price'>Price : <span>₹{price}</span></p>
              <p className='category mb-5'>Category: <span>{category}</span></p>
              <button onClick={addItem} className="addToCart__btn">Add to Cart</button>
            </div>
          </Col>
          <Col>
            <div className="tabs d-flex align-items-center gap-5 py-3">
              <h6 className={`${tab === 'desc' ? 'tab__active' : ''}`} onClick={() => setTab('desc')}>Description</h6>
              <h6 className={`${tab === 'rev' ? 'tab__active' : ''}`} onClick={() => setTab('rev')}>Review</h6>
            </div>
            {
              tab === 'desc' ? <div className="tab__content"> <p>{desc}</p></div> : <div className="tab__form mb-3">
                <div className="review pt-5">
                  <p className="user__name mb-0">
                    John Doe
                  </p>
                  <p className='user__email'>john@gmail.com</p>
                  <p className='feedback__text'>
                    Great Product
                  </p>
                </div>

                <div className="review">
                  <p className="user__name mb-0">
                    John Doe
                  </p>
                  <p className='user__email'>john@gmail.com</p>
                  <p className='feedback__text'>
                    Great Product
                  </p>
                </div>
                <form className="form" onSubmit={handleClick}>
                  <div className='form__group'>
                    <input type='text' placeholder='Enter your name' name="name" required ref={signupNameRef} />
                  </div>

                  <div className='form__group'>
                    <textarea
                      rows={5}
                      type='text' placeholder='Write your review' name="description" required ref={signupDescriptionRef}></textarea>
                  </div>
                  <button type="submit" className='addToCart__btn'>Submit</button>
                 

                </form>

              </div>
            }
          </Col>
          <Col lg='12' className='mb-5 mt-4'>
            <h2 className='related__Product-title'>You might also like</h2>
          </Col>
          {
            relatedProduct.map(item => (
              <Col lg='3' md='4' sm='6' xs='6' className='mb-4' key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))
          }
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default FoodDetails