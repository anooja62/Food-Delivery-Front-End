/** @format */

import React from "react";

const Review = ({ foodreview,index }) => {
  return (
    <>
      <tbody>
        <tr>
        <td className='text-center'>{index}</td>
          <td className='text-center'>{foodreview.name}</td>
          <td className='text-center'>{foodreview.description}</td>
        </tr>
      </tbody>
    </>
  );
};
export default Review;
