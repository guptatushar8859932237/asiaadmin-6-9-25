import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/users/userSlice";
export default function UserList () {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);
  
    useEffect(() => {
      dispatch(fetchUsers());  // Fetch users on component mount
    }, [dispatch]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
  return (
    <div>
       <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
    </div>
  )
}
