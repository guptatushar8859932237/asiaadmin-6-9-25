import React from 'react'
import { useLocation } from 'react-router-dom';
import UserPermission from './Userpermission';

export default function StaffDetails() {
    const location = useLocation();
    const data = location.state.data;
    console.log(data);
  return (
    <div>
    {/* <h4>Staff Name:{data.full_name}</h4>
    <h4>Staff email:{data.email}</h4> */}
        <UserPermission staffId={data} />
    </div>
  )
}
