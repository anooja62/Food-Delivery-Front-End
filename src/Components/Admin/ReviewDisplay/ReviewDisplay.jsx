import React,{useEffect} from "react";



const Review = ({ foodreview }) => {
  

  return (
    <>
      <tbody>
        <tr>
          <td className="text-center">{foodreview.name}</td>
          <td className="text-center">{foodreview.description}</td>

        </tr>
      </tbody>
    </>
  );
};
export default Review;
