import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Account = () => {
    const [user, setUser] = useState(null);
    const userId = useSelector(state => state.status.userId);
    const token = useSelector(state => state.status.token);
    useEffect(() => {
        fetch('http://localhost:8080/users/'+ userId, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      if (!response.ok){
        throw new Error("response not ok");
      }
      return response.json()
    }).then(result => {
      console.log(result)  
      setUser(result.user)
    }).catch(err => {
      console.log(err)
    })
    }, [token]);
    return <div>
        <h1>Account Page</h1>
        {user && <h2>{user.name}</h2>}
    </div>
};

export default Account;