import React from 'react'
import '../../../styles/product-card.css'
import {Link, useNavigate} from 'react-router-dom'

import {useDispatch} from 'react-redux';

import {useCookies} from 'react-cookie'

import 'react-toastify/dist/ReactToastify.css';


import { getRestaurantdetails } from "../../../store/shopping-cart/restaurantSlice";


const RestaurantCard = ({ restaurant }) => {

    const dispatch = useDispatch();
  dispatch(getRestaurantdetails());

  const [cookies, setCookie] = useCookies(null)
  const user = cookies.name
  
 
  const navigate =useNavigate() 
  
  return (
    <div className='product__item'>
<div className="product__img">
    <img src={image01} alt='products' className='w-50'/>
</div>
<div className="product__content">
<h5><Link to={`/ui/${id}`}>{restaurant.name}</Link></h5>
<div className='d-flex align-items-center justify-content-between'>
  
   
    </div>
    </div>
    </div>
   )
}

export default RestaurantCard