import React from 'react'

import '../../styles/profilecard.css'
import profileuser from '../../assets/images/profileuser.png'



const Sidebar = () => {
   

  return (
    
  <div>
      <div className='profilecard'>
        <ul>
       <li> <img src={profileuser} alt=''/></li>
       <li>Anooja M</li>
       <li>anooja@gmail.com</li>
       <li>9526761567</li>
       </ul>
        </div>
    
    </div>
  
  )
}

export default Sidebar