import React from 'react'
import userpic from '../../assets/images/userpic.png'
import useredit from '../../assets/images/useredit.png'
import logout from '../../assets/images/logout.png'
import bag from '../../assets/images/bag.png'
import {Link,useNavigate } from 'react-router-dom'
import '../../styles/sidenav.css'
import { useCookies } from 'react-cookie'


const Sidebar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const navigate = useNavigate()
 const clearCookies = ()=> {
  removeCookie("name")
  removeCookie("email")  
  removeCookie("phone")
  navigate('/home')
 }
  return (
    
  <div>
      <div className='sidenav'>
        <ul>
         <Link to='./'> <li><img src={userpic} alt=''></img>Profile</li></Link><hr/>
         <Link to='./myorder'> <li><img src={bag} alt=''></img>Orders</li></Link><hr/>
         <Link to='/update'> <li><img src={useredit} alt=''></img>Edit Profile</li></Link><hr/>
          <li  onClick={()=>clearCookies()}><img src={logout} alt=''></img>Logout</li>
          
        </ul>
        </div>
    <section>

    </section>
    </div>
  
  )
}

export default Sidebar