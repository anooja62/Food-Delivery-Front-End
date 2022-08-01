import React from 'react'
import userpic from '../../assets/images/userpic.png'
import useredit from '../../assets/images/useredit.png'
import logout from '../../assets/images/logout.png'
import bag from '../../assets/images/bag.png'
import {Link} from 'react-router-dom'
import '../../styles/sidenav.css'


const Sidebar = () => {
   

  return (
    
  <div>
      <div className='sidenav'>
        <ul>
         <Link to='./'> <li><img src={userpic} alt=''></img>Profile</li></Link><hr/>
         <Link to='./myorder'> <li><img src={bag} alt=''></img>Orders</li></Link><hr/>
         <Link to='./updateprofile'> <li><img src={useredit} alt=''></img>Edit Profile</li></Link><hr/>
         <Link to='/home'> <li><img src={logout} alt=''></img>Logout</li></Link>
          
        </ul>
        </div>
    <section>

    </section>
    </div>
  
  )
}

export default Sidebar