import React from 'react'

import '../../styles/profilecard.css'
import profileuser from '../../assets/images/profileuser.png'
import { useCookies } from 'react-cookie'


const Sidebar = () => { 
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const user = cookies.name
  const email = cookies.email
  const phone = cookies.phone
  return (
    
  <div>
      <div className='profilecard'>
        <ul>
       <li> <img src={profileuser} alt=''/></li>
       <li>{user}</li>
       <li>{email}</li>
       <li>{phone}</li>
       </ul>
        </div>
    
    </div>
  
  )
}

export default Sidebar