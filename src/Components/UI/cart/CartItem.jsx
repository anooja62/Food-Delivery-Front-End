import React from 'react'
import { ListGroupItem } from 'react-bootstrap'


import '../../../styles/cart-item.css'
import {useDispatch} from 'react-redux'
import { cartActions } from '../../../store/shopping-cart/cartSlice'

const CartItem = ({item}) => {
  const {id,title,price,image01,quantity,totalPrice} = item
  const dispatch = useDispatch()
  const incrementItem = ()=>{
    dispatch(cartActions.addItem({
      id,
      title,
      price,
      image01
    })
    );
  };

  const decrementItem = ()=>{
    dispatch(cartActions.removeItem(id)
   )
  };

  const deleteItem = ()=>{
    dispatch(cartActions.deleteItem(id)
   )
  };

  

  return( <ListGroupItem className='border-0 cart__item'>
<div className="cart__item-info d-flex gap-2">
  <img src={image01} alt='product'/>
  <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
    <div>
      <h6 className='product__product-title'>{title}</h6>
      <p className='d-flex align-items-center gap-5 cart__product-price'>{quantity}x <span>₹{totalPrice}</span></p>
      <div className='d-flex align-items-center justify-content-between increase__decrease-btn'>
        <span className='increase__btn' onClick={incrementItem}><i class="ri-add-line"></i></span>
        <span className='quantity'>{quantity}</span>
        <span className='decrease__btn' onClick={decrementItem}><i class="ri-subtract-line"></i></span>
      </div>
    </div>
    <span className='delete__btn' onClick={deleteItem}><i class="ri-delete-bin-5-line"></i></span>
  </div>
</div>
  </ListGroupItem>
  )
}

export default CartItem