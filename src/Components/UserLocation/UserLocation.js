

import React from 'react'
import { Button } from 'react-bootstrap'

const UserLocation = () => {
    const getlocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition,showError); 
        }
        else{
            alert("Geolocation is not supported by this browser");
        }
    };

    const showPosition = (position) => {
        let lat = position.coords.latitude
        let long = position.coords.longitude
        
        console.log(lat,long);
    }
    const showError = (error)=>{
         switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied location permisssion");
                
                break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information unavailable");
                    
                    break;
                    case error.TIMEOUT:
                        alert("Locatiion access request timeout");
                        
                        break;
                        case error.UNKNOWN_ERROR:
                            alert("Unknown error occurred");
                            
                            break;
             
            default:
                alert("Unknown error occurred")
               
         }
    }
  return (
    <div>
        <Button onClick={getlocation()}>Get Location</Button>
        <h1>user location</h1>
        
    </div>
  )
}

export default UserLocation