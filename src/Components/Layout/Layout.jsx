import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routes from '../../routes/Routers'
import Carts from '../UI/cart/Carts'

import {useSelector} from 'react-redux'


function Layout() {

  const showCart = useSelector(state=>state.cartUi.cartIsVisible)
  return (
    <div role="parent">
  {!window.location.href.includes('admin' ) &&
   <Header/>
  }
       
        {
          showCart &&  <Carts/>
        }
        
        <div>
            <Routes/>

            
        </div>
        {!window.location.href.includes('admin'  ) &&
   <Footer/>
  }
  

    </div>
   
  )
}

export default Layout