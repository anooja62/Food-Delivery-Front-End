import React,{useEffect}from 'react'
import { getRestaurantdetails } from '../../store/shopping-cart/restaurantSlice';
import RestaurantCard from './RestaurantCard/RestaurantCard'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Restaurantspage = () => {
  const [cookies, setCookie] = useCookies(null);
  const userId = cookies.userId;
  const navigate = useNavigate()
  if(!userId){
    navigate('/login')
   }
  const restaurantList = useSelector((state) => state.restaurant.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRestaurantdetails());
  },[]);
  return (
    <>
    <div style={{marginLeft:80,marginRight:80}}>
      <h3 className="mt-2">Order food from your favourite restaurants</h3>
     
    {restaurantList.length !== 0 && (
        <>
          <div className="row d-flex justify-content-between ">
            {restaurantList.map((u) => (
              <RestaurantCard key={u._id} restaurant={u} />
            ))}
          </div>
          
        </>
      )}
      </div>
    </>
  )
}

export default Restaurantspage
