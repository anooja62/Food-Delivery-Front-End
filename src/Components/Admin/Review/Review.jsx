import React from 'react'

import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";

import {
    approveFoodreview,
} from "../../../store/shopping-cart/reviewSlice";


const Review = ({ foodreview }) => {
    const dispatch = useDispatch();
    const handleApprove = async (id) => {
        dispatch(approveFoodreview(id));
    };





    return (<>


        <tbody>
            <tr>

                <td className='text-center'>{foodreview.name}</td>
                <td className='text-center'>{foodreview.description}</td>
                
                <td className='text-center'>
                    <Button variant="success" onClick={() => handleApprove(foodreview._id)}>Accept</Button>


                </td>
            </tr>
        </tbody>
    </>

    )

}
export default Review
