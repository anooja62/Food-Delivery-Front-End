import React,{useRef,useEffect} from 'react'
import {Container} from 'react-bootstrap'
import logo from '../../assets/images/deliorderlogo.png'
import {NavLink,Link} from 'react-router-dom'
import '../../styles/header.css'
import {useSelector,useDispatch} from 'react-redux'
import { cartUiActions } from '../../store/shopping-cart/cartUiSlice'

const nav__links =[
    {
       display:'Home',
       path:'/home'
    },
    {
        display:'Add restaurant',
        path:'/restaurant'
     },
     {
        display:'Login',
        path:'/login'
     },
     {
        display:'Sign Up',
        path:'/register'
     },
]
const Header =()=>  {
    const menuRef =useRef(null)
    const headerRef = useRef(null)
    const totalQuantity = useSelector(state=>state.cart.totalQuantity)
    const dispatch = useDispatch()
    const toggleMenu=()=>menuRef.current.classList.toggle('show__menu')
    
    const toggleCart = ()=>{
        dispatch(cartUiActions.toggle())
    }
   useEffect(() => {
    window.addEventListener('scroll',()=>{
        if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
            headerRef.current.classList.add('header__shrink')
        }
        else{
            headerRef.current.classList.remove('header__shrink')
        }
    })
    return ()=> window.removeEventListener('scroll',null)
   }, [])

  return <header className='header' ref={headerRef}>
    <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo ">
                <img src={logo} alt="logo"/>
            </div>
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                <div className="menu d-flex align-items-center gap-5">
                  {
                    nav__links.map((item,index)=>
                    <NavLink 
                    to={item.path} key={index}
                        className={navClass=>navClass.isActive ?'active__menu' :""}
                        >
                        {item.display}

                    </NavLink>)
                  }
                </div>
            </div>
            <div className="navbar__right d-flex align-items-center gap-4">
                <span className='cart_icon' onClick={toggleCart}>
                <i class="ri-shopping-basket-line"></i>
                <span className='cart__badge'>{totalQuantity}</span>
                </span>
                <span className="user">
                    <Link to='/login'><i class="ri-user-line"></i></Link>
                </span>
                <span className="mobile_menu" onClick={toggleMenu}>
                <i class="ri-menu-line"></i>
                </span>
            </div>
        </div>
    </Container>
  </header>
  
}

export default Header
