import React,{useRef,useEffect} from 'react'
import {Container} from 'react-bootstrap'
import logo from '../../assets/images/deliorderlogo.png'
import {NavLink,Link} from 'react-router-dom'
import '../../styles/header.css'

const nav__links =[
    {
       display:'Home',
       path:'/home'
    },
    {
        display:'Foods',
        path:'/foods'
     },
     {
        display:'Cart',
        path:'/cart'
     },
     {
        display:'Login',
        path:'/login'
     },
]
const Header =()=>  {
    const menuRef =useRef(null)
    const headerRef = useRef(null)
    const toggleMenu=()=>menuRef.current.classList.toggle('show__menu')

   useEffect(() => {
    window.addEventListener('scroll',()=>{
        if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
            headerRef.current.classList.add('header__shrink')
        }
        else{
            headerRef.current.classList.remove('header__shrink')
        }
    })
    return ()=> window.removeEventListener('scroll')
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
                <span className='cart_icon'>
                <i class="ri-shopping-cart-line"></i>
                <span className='cart__badge'> 2</span>
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
