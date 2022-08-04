import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routes from '../../routes/Routers'
import Carts from '../UI/cart/Carts'
import Admin from '../../Pages/Admin'
import {useSelector} from 'react-redux'
import {Route} from 'react-router-dom'
function Layout() {

  const showCart = useSelector(state=>state.cartUi.cartIsVisible)
  return (
    <div>
  {!window.location.href.includes('admin') &&
   <Header/>
  }
       
        {
          showCart &&  <Carts/>
        }
        
        <div>
            <Routes/>

            
        </div>
        {!window.location.href.includes('admin') &&
   <Footer/>
  }

    </div>
  )
}

export default Layout