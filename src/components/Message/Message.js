import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './Message.css';

const Message = (props) => {
  const token = useSelector(state => state.status.token);
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('http://localhost:8080/users/'+props.message.sender, {
      headers: {
        Authorization: "Bearer " + token,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok){
        throw new Error("response not ok");
      }
      return response.json();
    })
    .then(result => {
      console.log(result)
      setUser(result.user);
    });
  }, []);
    return <article className="user">
    <header className="user__header">
     
     {user && <h1 className="user__title">From {user.name}</h1>} 
    </header>
    
    <div className="user__content">{props.message.content}</div>
 
    </article>
};

export default Message;