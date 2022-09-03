import React from 'react'
import { ListGroupItem } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import '../../../styles/cart-item.css'
import {useDispatch} from 'react-redux'
import { cartActions } from '../../../store/shopping-cart/cartSlice'

const CartItem = ({item}) => {

  // const cartItems = useSelector((state) => state.cart.cartItems);
  console.log({item})
  const {_id,foodname,price,image,quantity,totalPrice} = item
  const dispatch = useDispatch()
  const incrementItem = (_id)=>{
    dispatch(cartActions.incrementItem(_id)
    );
  };

  const decrementItem = (_id)=>{
    dispatch(cartActions.removeItem(_id)
   )
  };

  const deleteItem = (_id)=>{
    console.log(_id)
    dispatch(cartActions.deleteItem(_id)
   )
  };

  

  return( <ListGroupItem className='border-0 cart__item'>
<div className="cart__item-info d-flex gap-2">
  <img src={image} alt='product'/>
  <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
    <div>
      <h6 className='product__product-title'>{foodname}</h6>
      <p className='d-flex align-items-center gap-5 cart__product-price'>{quantity}x <span>₹{price}</span></p>
      <div className='d-flex align-items-center justify-content-between increase__decrease-btn'>
        <span className='increase__btn' onClick={()=>incrementItem(_id)}><i class="ri-add-line"></i></span>
        <span className='quantity'>{quantity}</span>
        <span className='decrease__btn' onClick={()=>decrementItem(_id)}><i class="ri-subtract-line"></i></span>
      </div>
    </div>
    <span className='delete__btn' onClick={()=>deleteItem(_id)}><i class="ri-delete-bin-5-line"></i></span>
  </div>
</div>
  </ListGroupItem>
  )
}

export default CartItem