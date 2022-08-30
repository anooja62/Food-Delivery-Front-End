import React from 'react'
import '../../../styles/product-card.css'
import {Link, useNavigate} from 'react-router-dom'

import {useDispatch} from 'react-redux';
import { cartActions } from '../../../store/shopping-cart/cartSlice';
import {useCookies} from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const ProductCard = (props) => {

  const [cookies, setCookie] = useCookies(null)
  const user = cookies.name
  const {id,title,image01,price} =props.item
  const dispatch = useDispatch()
  const navigate =useNavigate() 
  const addToCart = ()=>{
    if(user){
      dispatch(cartActions.addItem({
        id,
        title,
        image01,
        price
      }))
      toast.success(' Item added to cart', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
        });
    }else{
      navigate('/login')
    }
    
  }
  return (
    <div className='product__item'>
<div className="product__img">
    <img src={image01} alt='products' className='w-50'/>
</div>
<div className="product__content">
<h5><Link to={`/foods/${id}`}>{title}</Link></h5>
<div className='d-flex align-items-center justify-content-between'>
    <span className='product__price'>₹{price}</span>
    <button className="addToCart__btn"  onClick={()=>addToCart()}>Add to Cart</button>
    <ToastContainer
position="bottom-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
</div>
</div>
    </div>
  )
}

export default ProductCard