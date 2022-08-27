import React, { useEffect, useState } from 'react'
import Fooddata from '../../assets/data/FoodData'
import "../../styles/restaurantui.css"
import Form from 'react-bootstrap/Form'
import Cards from './Cards'
import Set from './Set'

const Search = () => {

    const [fdata, setFdata] = useState(Fooddata);
    

    const [copydata, setCopyData] = useState([]);

    


    const chanegData = (e) => {
        let getchangedata = e.toLowerCase();

        if (getchangedata === "") {
            setCopyData(fdata);
        } else {
            let storedata = copydata.filter((ele, k) => {
                return ele.rname.toLowerCase().match(getchangedata);
            });

            setCopyData(storedata)
        }
    }


   


    useEffect(() => {

        setTimeout(() => {
            setCopyData(Fooddata);
        }, 3000);

    }, [])

    return (
        <>
           


            <Form className='d-flex justify-content-center align-items-center mt-3'>
                <Form.Group className=" mx-2 col-lg-4" controlId="formBasicEmail">

                    <Form.Control type="text"
                        onChange={(e) => chanegData(e.target.value)}
                        placeholder="Search Restaurant" />
                </Form.Group>
                <button className='addToCart__btn' >Submit</button>
            </Form>


            <section className='iteam_section mt-4 container'>
                <h2 className='px-4' style={{ fontWeight: 400 }}>Order food online</h2>

                <div className="row mt-2 d-flex justify-content-around align-items-center">
                    {copydata && copydata.length ? <Cards data={copydata} /> : <Set  sdata={fdata}/>}
                </div>
            </section>
            
        </>
    )
}

export default Search