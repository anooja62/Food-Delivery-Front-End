/** @format */

import React from "react";

import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";

import { blockUser } from "../../../store/shopping-cart/userSlice";

const User = ({ user }) => {
  const dispatch = useDispatch();
  const handleReject = async (id) => {
    dispatch(blockUser(id));
  };

  return (
    <>
      <tbody>
        <tr>
          <td className='text-center'>{user.name}</td>
          <td className='text-center'>{user.email}</td>
          <td className='text-center'>{user.phone}</td>

          <td className='text-center'>
            <Button variant='danger' onClick={() => handleReject(user._id)}>
              Block
            </Button>
          </td>
        </tr>
      </tbody>
    </>
  );
};
export default User;
