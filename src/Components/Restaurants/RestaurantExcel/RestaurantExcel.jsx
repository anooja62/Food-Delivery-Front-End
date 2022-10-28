import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { CSVLink} from 'react-csv';

const RestaurantExcel = () => {
    const [userdata, setUserdata]= useState([]); 
    useEffect( ()=>{
       const getuserdata= async ()=>{
         const userreq= await fetch("http://localhost/devopsdeveloper/users");
         const userres= await userreq.json();
         console.log(userres);
         setUserdata(userres);
       }
   getuserdata();
    },[]);
  return (
    <div>
       <Container>
        <div className="row">
          <div className="col-sm-8">
            <h4 className="mt-3 mb-3">Customer Order Details </h4>

          <CSVLink  data={ userdata} filename="RegisterUserData"  className="btn btn-success mb-3">Export Order Data</CSVLink>

            <table className="table table-bordered ">
              <thead>
                <tr>
                <th scope="col"> No.</th>
                  <th scope="col">Customer Name</th>
                  
                  <th scope="col">Email</th>
                  <th scope="col">Food Name</th>
                  <th scope="col">Total Amount</th>
                </tr>
              </thead>
              <tbody>
            
               {
                 userdata.map( (getuser, index)=>(
                <tr key={index}>
                  <td > {index+1} </td>
                  <td >{getuser.first_name} </td>
                  <td >{getuser.last_name} </td>
                  <td >{getuser.email} </td>
                  <td >{getuser.gender} </td>             
                  </tr>
                  ) )
                   }
                    
          
              </tbody>
            </table>
          </div>

        

        </div>
      </Container>
    </div>
  )
}

export default RestaurantExcel
