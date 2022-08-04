import React, { useState } from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import Home from '../Pages/Home'
import AllFoods from '../Pages/AllFoods'
import FoodDetails from '../Pages/FoodDetails'
import Cart from '../Pages/Cart'
import Checkout from '../Pages/Checkout'
import RestaurantRegister from '../Pages/RestaurantRegister'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Profile from '../Pages/Profile'
import UpdateProfile from '../Pages/UpdateProfile'
import Orders from '../Pages/Orders'
import Admin from '../Pages/Admin'
import {useCookies} from 'react-cookie'

function Routers() {
//   const [cookies, setCookie, removeCookie] = useCookies(null)
//   const [admin, setAdmin] = useState(cookies.isAdmin)
// console.log(admin)
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/home'/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/foods' element={<AllFoods/>}/>
        <Route path='/foods/:id' element={<FoodDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/login' element={<Login/>}/>
       <Route path='/profile' element={<Profile/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/restaurant' element={<RestaurantRegister/>}/>
        <Route path='/update' element={<UpdateProfile/>}/>
        <Route path='/orders' element={<Orders/>}/>
     <Route path='/admin' element={<Admin/>}/>
        

        
    </Routes>
  )
}

export default Routers